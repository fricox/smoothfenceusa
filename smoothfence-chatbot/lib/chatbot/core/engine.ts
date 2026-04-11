import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, type Language } from '../prompts/system';
import { loadKnowledgeBase } from '../knowledge/loader';
import { saveLead, saveLeadTool } from '../modules/lead';
import { createServiceClient } from '../db/server';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 800;
const HISTORY_LIMIT = 30; // últimos N mensajes que mandamos a Claude

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY?.trim(),
});

export interface ChatTurnInput {
  sessionId: string;
  userMessage: string;
  language: Language;
  userAgent?: string;
  referrer?: string;
}

export interface ChatTurnResult {
  reply: string;
  language: Language;
  leadCaptured: boolean;
}

/**
 * Procesa un turno del chat:
 * 1. Asegura sesión en DB
 * 2. Persiste mensaje del usuario
 * 3. Carga historial + KB
 * 4. Llama a Claude (con tool use loop)
 * 5. Persiste respuesta del asistente
 */
export async function runChatTurn(input: ChatTurnInput): Promise<ChatTurnResult> {
  const supabase = createServiceClient();

  // 1. upsert sesión
  await supabase.from('chat_sessions').upsert(
    {
      session_id: input.sessionId,
      language: input.language,
      user_agent: input.userAgent ?? null,
      referrer: input.referrer ?? null,
      last_active_at: new Date().toISOString(),
    },
    { onConflict: 'session_id' }
  );

  // 2. guardar mensaje del usuario
  await supabase.from('chat_messages').insert({
    session_id: input.sessionId,
    role: 'user',
    content: input.userMessage,
  });

  // 3. cargar historial reciente
  const { data: history } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', input.sessionId)
    .in('role', ['user', 'assistant'])
    .order('created_at', { ascending: true })
    .limit(HISTORY_LIMIT);

  const knowledge = await loadKnowledgeBase();
  const system = buildSystemPrompt({
    language: input.language,
    knowledge,
    estimatorUrl: process.env.NEXT_PUBLIC_ESTIMATOR_URL ?? '',
    whatsappNumber: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP ?? '',
    phoneNumber: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '',
  });

  const messages: Anthropic.MessageParam[] = (history ?? []).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  // 4. tool use loop (máx 3 vueltas)
  let leadCaptured = false;
  let finalText = '';

  console.log('[engine] calling Anthropic model:', MODEL, 'session:', input.sessionId);
  for (let i = 0; i < 3; i++) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      tools: [saveLeadTool],
      messages,
    });

    // procesar contenido
    const toolUses = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use');
    const textBlocks = response.content.filter((b): b is Anthropic.TextBlock => b.type === 'text');
    finalText = textBlocks.map((b) => b.text).join('\n').trim();

    if (response.stop_reason === 'tool_use' && toolUses.length > 0) {
      // ejecutar herramientas
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const tu of toolUses) {
        if (tu.name === 'save_lead') {
          const args = tu.input as Record<string, string>;
          const result = await saveLead({
            session_id: input.sessionId,
            language: input.language,
            name: args.name,
            phone: args.phone,
            email: args.email,
            zip: args.zip,
            notes: args.notes,
          });
          if (result.ok) leadCaptured = true;
          toolResults.push({
            type: 'tool_result',
            tool_use_id: tu.id,
            content: JSON.stringify(result),
          });
        }
      }
      messages.push({ role: 'assistant', content: response.content });
      messages.push({ role: 'user', content: toolResults });
      continue; // otra vuelta para que Claude responda con el resultado
    }
    break;
  }

  // 5. guardar respuesta
  if (finalText) {
    await supabase.from('chat_messages').insert({
      session_id: input.sessionId,
      role: 'assistant',
      content: finalText,
      metadata: leadCaptured ? { lead_captured: true } : null,
    });
  }

  return {
    reply: finalText || (input.language === 'es'
      ? 'Disculpá, tuve un problema. ¿Podés intentar de nuevo?'
      : "Sorry, I had a problem. Could you try again?"),
    language: input.language,
    leadCaptured,
  };
}

/**
 * Devuelve el historial completo de una sesión (para que el widget retome).
 */
export async function getSessionHistory(sessionId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from('chat_messages')
    .select('role, content, created_at')
    .eq('session_id', sessionId)
    .in('role', ['user', 'assistant'])
    .order('created_at', { ascending: true });
  return data ?? [];
}
