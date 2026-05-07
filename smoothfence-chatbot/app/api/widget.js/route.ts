/**
 * GET /api/widget.js
 * Returns a JavaScript snippet that injects the Fency chat widget
 * as a resizable iframe on any page.
 */

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;

  const js = `
(function(){
  if(window.__fencyLoaded) return;
  window.__fencyLoaded = true;

  var ORIGIN = ${JSON.stringify(origin)};
  var BUBBLE_W = 260;
  var BUBBLE_H = 90;
  var OPEN_W   = 380;
  var OPEN_H   = 620;

  var wrap = document.createElement('div');
  wrap.id = 'fency-widget';
  wrap.style.cssText =
    'position:fixed;bottom:20px;right:20px;z-index:99999;' +
    'width:' + BUBBLE_W + 'px;height:' + BUBBLE_H + 'px;' +
    'transition:width .3s ease,height .3s ease;' +
    'border:none;overflow:visible;border-radius:28px;' +
    'background:transparent;';

  var iframe = document.createElement('iframe');
  iframe.src = ORIGIN + '/embed';
  iframe.style.cssText =
    'width:100%;height:100%;border:none;background:transparent;' +
    'color-scheme:normal;';
  iframe.setAttribute('allow', 'clipboard-write');
  iframe.title = 'Fency Chat';

  wrap.appendChild(iframe);
  document.body.appendChild(wrap);

  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'fency-resize') {
      if (e.data.open) {
        wrap.style.width    = OPEN_W + 'px';
        wrap.style.height   = OPEN_H + 'px';
        wrap.style.borderRadius = '16px';
        wrap.style.overflow = 'hidden';
      } else {
        wrap.style.width    = BUBBLE_W + 'px';
        wrap.style.height   = BUBBLE_H + 'px';
        wrap.style.borderRadius = '28px';
        wrap.style.overflow = 'visible';
      }
    }
  });
})();
`;

  return new Response(js, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
