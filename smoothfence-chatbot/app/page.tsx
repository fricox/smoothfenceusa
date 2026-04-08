import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold text-brand-700">Smooth Fence Chatbot</h1>
        <p className="mt-4 text-lg text-gray-700">
          Demo local del widget de Fency. La burbuja aparece abajo a la derecha y se abre
          automáticamente a los 5 segundos.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Cómo probar</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-6 text-sm text-gray-700">
            <li>Configurá tu <code className="rounded bg-gray-100 px-1">.env.local</code></li>
            <li>Corré el schema SQL en Supabase (<code>lib/chatbot/db/schema.sql</code>)</li>
            <li>
              <code className="rounded bg-gray-100 px-1">npm run dev</code> y abrí esta página
            </li>
            <li>Esperá 5 segundos: se abre Fency</li>
            <li>Probá pedir un estimado de cerca y dejá tus datos</li>
            <li>
              Verificá en <a href="/admin" className="text-brand-600 underline">/admin</a> el lead
              capturado
            </li>
          </ol>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Integración en la web Smooth Fence:</strong> al final, esta app se despliega
          (Vercel/Render) y la web original solo agrega <code>&lt;script src=".../widget.js"&gt;&lt;/script&gt;</code>
          al final del <code>&lt;body&gt;</code>. Sin tocar más nada.
        </div>
      </div>

      <ChatWidget />
    </main>
  );
}
