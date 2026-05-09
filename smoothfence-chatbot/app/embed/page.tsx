import ChatWidget from '@/components/ChatWidget';

// Prevent static generation — iframe embed needs to load at runtime
export const dynamic = 'force-dynamic';

/**
 * Página standalone del widget para embebido vía iframe.
 * Fondo transparente, solo el widget visible.
 */
export default function EmbedPage() {
  return (
    <div style={{ background: 'transparent', height: '100vh' }}>
      <ChatWidget />
    </div>
  );
}
