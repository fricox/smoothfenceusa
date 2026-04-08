import { NextResponse } from 'next/server';
import { runChatTurn } from '@/lib/chatbot/core/engine';
import { detectLanguage } from '@/lib/chatbot/core/language';
import type { Language } from '@/lib/chatbot/prompts/system';

export const runtime = 'nodejs';

const DEFAULT_LANG: Language = 'en';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, message, language } = body as {
      sessionId?: string;
      message?: string;
      language?: Language;
    };

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'sessionId and message are required' }, { status: 400 });
    }

    const detected: Language = language ?? detectLanguage(message, DEFAULT_LANG);

    const result = await runChatTurn({
      sessionId,
      userMessage: message,
      language: detected,
      userAgent: req.headers.get('user-agent') ?? undefined,
      referrer: req.headers.get('referer') ?? undefined,
    });

    return NextResponse.json(result, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err: any) {
    console.error('[/api/chat] error:', err);
    return NextResponse.json(
      { error: 'Internal error', detail: err?.message },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
