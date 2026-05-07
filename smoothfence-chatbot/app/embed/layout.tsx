/**
 * Layout del embed: fuerza el body a transparente para que el iframe
 * no muestre el fondo grisáceo de globals.css detrás del widget.
 */
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { background: transparent !important; }`}</style>
      {children}
    </>
  );
}
