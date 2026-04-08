-- ============================================================
-- Smooth Fence Chatbot — Schema de Supabase
-- Pegá este archivo entero en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- Extensiones
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. SESIONES DE CHAT
-- Una por visitante. La identificamos por session_id (uuid del cliente, vive en localStorage).
-- ============================================================
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  language text not null default 'en',
  user_agent text,
  referrer text,
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

create index if not exists chat_sessions_last_active_idx on chat_sessions (last_active_at desc);

-- ============================================================
-- 2. MENSAJES
-- ============================================================
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null references chat_sessions(session_id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system', 'tool')),
  content text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on chat_messages (session_id, created_at);

-- ============================================================
-- 3. LEADS
-- Capturamos: nombre, teléfono, email, zip
-- ============================================================
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  session_id text references chat_sessions(session_id) on delete set null,
  name text,
  phone text,
  email text,
  zip text,
  language text,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);

-- ============================================================
-- 4. KNOWLEDGE BASE
-- Una sola fila con id='main', content es JSONB editable desde el panel.
-- ============================================================
create table if not exists knowledge_base (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into knowledge_base (id, content) values ('main', '{
  "service_areas": [],
  "fence_types": [],
  "hours": "",
  "warranty": "",
  "process": "",
  "faq": [],
  "extra_notes": ""
}'::jsonb)
on conflict (id) do nothing;

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- El service role bypasea RLS, así que el server (API routes) sigue funcionando.
-- El navegador con anon key NO puede leer nada por defecto.
-- ============================================================
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
alter table leads enable row level security;
alter table knowledge_base enable row level security;

-- Solo usuarios autenticados (admin) pueden leer todo desde el navegador
create policy "admin read sessions" on chat_sessions for select to authenticated using (true);
create policy "admin read messages" on chat_messages for select to authenticated using (true);
create policy "admin read leads" on leads for select to authenticated using (true);
create policy "admin update leads" on leads for update to authenticated using (true);
create policy "admin read kb" on knowledge_base for select to authenticated using (true);
create policy "admin update kb" on knowledge_base for update to authenticated using (true);
create policy "admin insert kb" on knowledge_base for insert to authenticated with check (true);

-- ============================================================
-- LISTO. Después de correr este script:
-- 1. Andá a Authentication → Users → "Add user" y creá tu admin con email/password.
-- 2. Copiá las API keys de Settings → API a tu .env.local
-- ============================================================
