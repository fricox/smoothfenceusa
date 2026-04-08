/**
 * /widget.js  →  el snippet que la web Smooth Fence va a incluir.
 *
 * Uso en la web original (un solo cambio, sin tocar más nada):
 *   <script src="https://TU-DEPLOY.vercel.app/widget.js" defer></script>
 *
 * Esto inyecta un iframe que carga /embed (la página del widget standalone)
 * en la esquina inferior derecha. Así no rompemos estilos ni JS de la web.
 */

export const runtime = 'edge';

export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const js = `
(function () {
  if (window.__smoothFenceChatbotLoaded) return;
  window.__smoothFenceChatbotLoaded = true;

  var iframe = document.createElement('iframe');
  iframe.src = '${origin}/embed';
  iframe.title = 'Smooth Fence Chatbot';
  iframe.allow = 'clipboard-write';
  iframe.style.cssText = [
    'position:fixed',
    'bottom:0',
    'right:0',
    'width:400px',
    'height:640px',
    'max-width:100vw',
    'max-height:100vh',
    'border:0',
    'background:transparent',
    'z-index:2147483647',
    'pointer-events:auto'
  ].join(';');

  function mount() { document.body.appendChild(iframe); }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
`.trim();

  return new Response(js, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
