'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/chatbot/db/browser';

interface Session {
  session_id: string;
  language: string;
  created_at: string;
  last_active_at: string;
}
interface Message {
  role: string;
  content: string;
  created_at: string;
}

export default function ChatsPage() {
  const supabase = createBrowserSupabase();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState('');
  const [active, setActive] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    supabase
      .from('chat_sessions')
      .select('session_id, language, created_at, last_active_at')
      .order('last_active_at', { ascending: false })
      .limit(100)
      .then(({ data }) => setSessions(data ?? []));
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
          {filtered.length === 0 && (
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
              <div className="font-mono text-xs text-gray-700">{s.session_id.slice(0, 12)}…</div>
              <div className="text-xs text-gray-500">
                {s.language.toUpperCase()} ·{' '}
                {new Date(s.last_active_at).toLocaleString()}
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
