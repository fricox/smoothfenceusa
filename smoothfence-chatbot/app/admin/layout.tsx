import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/admin" className="text-lg font-semibold text-brand-700">
            Smooth Fence · Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/chats" className="text-gray-700 hover:text-brand-600">
              Chats
            </Link>
            <Link href="/admin/leads" className="text-gray-700 hover:text-brand-600">
              Leads
            </Link>
            <Link href="/admin/knowledge" className="text-gray-700 hover:text-brand-600">
              Knowledge base
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
