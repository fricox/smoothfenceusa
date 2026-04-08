import ChatWidget from '@/components/ChatWidget';

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
