'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/chatbot/db/browser';
import type { KnowledgeBase } from '@/lib/chatbot/knowledge/types';
import { EMPTY_KB } from '@/lib/chatbot/knowledge/types';

export default function KnowledgePage() {
  const supabase = createBrowserSupabase();
  const [kb, setKb] = useState<KnowledgeBase>(EMPTY_KB);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase
      .from('knowledge_base')
      .select('content')
      .eq('id', 'main')
      .maybeSingle()
      .then(({ data }) => {
        const c = (data?.content as KnowledgeBase) ?? EMPTY_KB;
        setKb(c);
        setText(JSON.stringify(c, null, 2));
      });
  }, [supabase]);

  async function save() {
    setSaving(true);
    setMsg('');
    try {
      const parsed = JSON.parse(text);
      const { error } = await supabase
        .from('knowledge_base')
        .upsert({ id: 'main', content: parsed, updated_at: new Date().toISOString() });
      if (error) throw error;
      setKb(parsed);
      setMsg('Guardado ✓');
    } catch (e: unknown) {
      setMsg('Error: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-gray-900">Knowledge base</h1>
      <p className="mb-4 text-sm text-gray-600">
        Editá el JSON con la información que Fency usará para responder. Los campos disponibles son:
        <code className="ml-1">service_areas, fence_types, hours, warranty, process, faq, extra_notes</code>.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={24}
        className="w-full rounded-xl border border-gray-300 bg-white p-4 font-mono text-xs outline-none focus:border-brand-500"
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        {msg && <span className="text-sm text-gray-600">{msg}</span>}
      </div>

      <details className="mt-6 rounded-lg border border-gray-200 bg-white p-3 text-sm">
        <summary className="cursor-pointer font-medium text-gray-700">Ejemplo de estructura</summary>
        <pre className="mt-2 overflow-auto text-xs text-gray-700">{`{
  "service_areas": ["Miami-Dade", "Broward", "Palm Beach"],
  "fence_types": [
    { "name": "Vinyl", "price_range": "$25-$40 per ft", "description": "Low maintenance, long-lasting" },
    { "name": "Aluminum", "price_range": "$30-$50 per ft" },
    { "name": "Wood", "price_range": "$18-$35 per ft" },
    { "name": "Chain link", "price_range": "$10-$20 per ft" }
  ],
  "hours": "Mon-Sat 8am-6pm",
  "warranty": "5-year warranty on installation",
  "process": "Free estimate → contract → installation in 1-3 weeks",
  "faq": [
    { "question": "Do you need a permit?", "answer": "Yes, we handle the permit for you in most counties." }
  ],
  "extra_notes": "Licensed and insured in Florida."
}`}</pre>
      </details>
    </div>
  );
}
