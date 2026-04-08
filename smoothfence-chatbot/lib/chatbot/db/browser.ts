'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Cliente de Supabase para el navegador.
 * Usa la ANON KEY (segura para exponer).
 * Se usa en el panel admin para auth (login con email/password).
 */
export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
