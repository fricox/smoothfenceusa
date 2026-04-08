import { createServiceClient } from '../db/server';
import { EMPTY_KB, type KnowledgeBase } from './types';

/**
 * Carga la knowledge base desde Supabase.
 * Hay una única fila con id='main' en la tabla `knowledge_base`.
 * Si no existe, devuelve EMPTY_KB.
 */
export async function loadKnowledgeBase(): Promise<KnowledgeBase> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('content, updated_at')
      .eq('id', 'main')
      .maybeSingle();

    if (error || !data) return EMPTY_KB;
    return { ...(data.content as KnowledgeBase), updated_at: data.updated_at };
  } catch {
    return EMPTY_KB;
  }
}

export async function saveKnowledgeBase(kb: KnowledgeBase): Promise<void> {
  const supabase = createServiceClient();
  await supabase
    .from('knowledge_base')
    .upsert({ id: 'main', content: kb, updated_at: new Date().toISOString() });
}
