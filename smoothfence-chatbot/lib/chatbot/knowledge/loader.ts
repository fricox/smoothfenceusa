import { createServiceClient } from '../db/server';
import { EMPTY_KB, type KnowledgeBase } from './types';

/**
 * Three-tier KnowledgeBase loader (P0-5 refactor):
 *
 *   1. Primary: fetch the canonical KB from the main site's /api/kb
 *      endpoint — it serialises lib/faq-data.ts (53 bilingual Q&As) into
 *      our shape. Single source of truth in git.
 *   2. Fallback: Supabase `knowledge_base.main` row — manual overrides or
 *      offline cache.
 *   3. Final fallback: EMPTY_KB constant — Fency still responds, just with
 *      less context.
 *
 * Fetch is bounded by a 3s AbortController timeout so a site outage can't
 * block chat responses.
 */

type Lang = 'en' | 'es';

const DEFAULT_SITE_URL = 'https://smoothfenceusa.com';
const FETCH_TIMEOUT_MS = 3000;
const FETCH_REVALIDATE_SECONDS = 300;

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
}

async function loadFromSiteEndpoint(lang: Lang): Promise<KnowledgeBase | null> {
  const url = `${getSiteUrl()}/api/kb?lang=${lang}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: FETCH_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as KnowledgeBase;
    // Basic shape check — reject if faq is missing/empty.
    if (!Array.isArray(json?.faq) || json.faq.length === 0) return null;
    return json;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function loadFromSupabase(): Promise<KnowledgeBase | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('content, updated_at')
      .eq('id', 'main')
      .maybeSingle();
    if (error || !data?.content) return null;
    return { ...(data.content as KnowledgeBase), updated_at: data.updated_at };
  } catch {
    return null;
  }
}

/**
 * Load the KB for the given language. Tries the site endpoint first,
 * falls back to Supabase, then EMPTY_KB. Always resolves — never throws.
 */
export async function loadKnowledgeBase(language: Lang = 'en'): Promise<KnowledgeBase> {
  const fromSite = await loadFromSiteEndpoint(language);
  if (fromSite) return fromSite;

  const fromSupabase = await loadFromSupabase();
  if (fromSupabase) return fromSupabase;

  return EMPTY_KB;
}

export async function saveKnowledgeBase(kb: KnowledgeBase): Promise<void> {
  const supabase = createServiceClient();
  await supabase
    .from('knowledge_base')
    .upsert({ id: 'main', content: kb, updated_at: new Date().toISOString() });
}
