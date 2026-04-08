'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/chatbot/db/browser';

export default function AdminHome() {
  const router = useRouter();
  const supabase = createBrowserSupabase();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setLoading(false);
    });
  }, [supabase]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    setAuthed(true);
    router.refresh();
  }

  async function logout() {
    await supabase.auth.signOut();
    setAuthed(false);
  }

  if (loading) return <div>Cargando…</div>;

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Login admin</h1>
        <p className="mt-1 text-sm text-gray-500">
          Usá el email y contraseña que creaste en Supabase Auth.
        </p>
        <form onSubmit={login} className="mt-4 space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Bienvenido</h1>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
          Cerrar sesión
        </button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/chats" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-brand-500">
          <div className="text-lg font-semibold text-brand-700">Chats</div>
          <p className="mt-1 text-sm text-gray-600">Conversaciones recientes con visitantes.</p>
        </Link>
        <Link href="/admin/leads" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-brand-500">
          <div className="text-lg font-semibold text-brand-700">Leads</div>
          <p className="mt-1 text-sm text-gray-600">Datos capturados por Fency.</p>
        </Link>
        <Link href="/admin/knowledge" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-brand-500">
          <div className="text-lg font-semibold text-brand-700">Knowledge base</div>
          <p className="mt-1 text-sm text-gray-600">Editá lo que sabe el bot sin tocar código.</p>
        </Link>
      </div>
    </div>
  );
}
