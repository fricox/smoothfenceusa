'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/chatbot/db/browser';

interface Session {
  session_id: string;
  language: string;
  created_at: string;
  last_active_at: string;
}
interface SessionEnriched extends Session {
  msg_count: number;
  has_lead: boolean;
}
interface Message {
  role: string;
  content: string;
  created_at: string;
}

export default function ChatsPage() {
  const supabase = createBrowserSupabase();
  const [sessions, setSessions] = useState<SessionEnriched[]>([]);
  const [filter, setFilter] = useState('');
  const [active, setActive] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    async function load() {
      setLoadingSessions(true);

      // 1. Cargar sesiones
      const { data: rawSessions } = await supabase
        .from('chat_sessions')
        .select('session_id, language, created_at, last_active_at')
        .order('last_active_at', { ascending: false })
        .limit(100);

      const sessionList = rawSessions ?? [];
      if (sessionList.length === 0) {
        setSessions([]);
        setLoadingSessions(false);
        return;
      }

      const ids = sessionList.map((s) => s.session_id);

      // 2. Contar mensajes por sesión (solo user + assistant)
      const { data: msgRows } = await supabase
        .from('chat_messages')
        .select('session_id')
        .in('session_id', ids)
        .in('role', ['user', 'assistant']);

      const msgCounts: Record<string, number> = {};
      for (const row of msgRows ?? []) {
        msgCounts[row.session_id] = (msgCounts[row.session_id] ?? 0) + 1;
      }

      // 3. Verificar qué sesiones tienen lead capturado
      const { data: leadRows } = await supabase
        .from('leads')
        .select('session_id')
        .in('session_id', ids);

      const leadSessions = new Set((leadRows ?? []).map((r) => r.session_id));

      // 4. Enriquecer
      const enriched: SessionEnriched[] = sessionList.map((s) => ({
        ...s,
        msg_count: msgCounts[s.session_id] ?? 0,
        has_lead: leadSessions.has(s.session_id),
      }));

      setSessions(enriched);
      setLoadingSessions(false);
    }

    load();
  }, [supabase]);

  useEffect(() => {
    if (!active) return;
    supabase
      .from('chat_messages')
      .select('role, content, created_at')
      .eq('session_id', active)
      .order('created_at', { ascending: true })
      .then(({ data }) => setMessages(data ?? []));
  }, [active, supabase]);

  const filtered = sessions.filter((s) =>
    filter ? s.session_id.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Conversaciones</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar por session id…"
        className="mb-4 w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
      />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white">
          {loadingSessions && (
            <div className="p-4 text-sm text-gray-500">Cargando…</div>
          )}
          {!loadingSessions && filtered.length === 0 && (
            <div className="p-4 text-sm text-gray-500">Sin conversaciones todavía.</div>
          )}
          {filtered.map((s) => (
            <button
              key={s.session_id}
              onClick={() => setActive(s.session_id)}
              className={`block w-full border-b border-gray-100 px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                active === s.session_id ? 'bg-brand-50' : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs text-gray-700">
                  {s.session_id.slice(0, 12)}…
                </span>
                {s.has_lead && (
                  <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                    LEAD
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                <span>{s.language.toUpperCase()}</span>
                <span>·</span>
                <span>{s.msg_count} msgs</span>
                <span>·</span>
                <span>{new Date(s.last_active_at).toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4">
          {!active && <div className="text-sm text-gray-500">Elegí una conversación.</div>}
          {active && messages.length === 0 && (
            <div className="text-sm text-gray-500">Sin mensajes.</div>
          )}
          <div className="space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === 'user'
                    ? 'ml-auto bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
