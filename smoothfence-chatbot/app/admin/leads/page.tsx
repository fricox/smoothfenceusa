'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/chatbot/db/browser';

interface Lead {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  zip: string | null;
  language: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];

export default function LeadsPage() {
  const supabase = createBrowserSupabase();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState('');

  async function load() {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    setLeads(data ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from('leads').update({ status }).eq('id', id);
    load();
  }

  const filtered = leads.filter((l) => {
    if (!q) return true;
    const blob = `${l.name} ${l.phone} ${l.email} ${l.zip}`.toLowerCase();
    return blob.includes(q.toLowerCase());
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Leads</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar nombre, teléfono, email o ZIP…"
        className="mb-4 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
      />
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Nombre</th>
              <th className="px-3 py-2">Teléfono</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">ZIP</th>
              <th className="px-3 py-2">Idioma</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-gray-500">
                  Sin leads aún.
                </td>
              </tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-gray-100">
                <td className="px-3 py-2 text-xs text-gray-500">
                  {new Date(l.created_at).toLocaleString()}
                </td>
                <td className="px-3 py-2">{l.name}</td>
                <td className="px-3 py-2">{l.phone}</td>
                <td className="px-3 py-2">{l.email}</td>
                <td className="px-3 py-2">{l.zip}</td>
                <td className="px-3 py-2">{l.language?.toUpperCase()}</td>
                <td className="px-3 py-2">
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                    className="rounded border border-gray-300 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
