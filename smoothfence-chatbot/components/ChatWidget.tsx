'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Msg = { role: 'user' | 'assistant'; content: string };

const SESSION_KEY = 'sf_chat_session_id';
const AUTO_OPEN_MS = 5000;
const CALENDLY_URL = 'https://calendly.com/federico-smoothfenceusa/30min';

interface ChatWidgetProps {
  apiBase?: string; // para uso embebido en otro dominio
  whatsapp?: string;
  phone?: string;
}

export default function ChatWidget({
  apiBase = '',
  whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP,
  phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('en');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sesión persistente + auto-abre 5s + carga historial
  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = uuidv4();
      localStorage.setItem(SESSION_KEY, id);
    }
    setSessionId(id);

    // detectar idioma del navegador como fallback
    const nav = (navigator.language || 'en').toLowerCase();
    setLanguage(nav.startsWith('es') ? 'es' : 'en');

    // cargar historial previo si existe
    fetch(`${apiBase}/api/history?sessionId=${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.messages?.length) {
          setMessages(d.messages.map((m: any) => ({ role: m.role, content: m.content })));
        }
      })
      .catch(() => {});

    // auto-abre a los 5 segundos (solo la primera vez por sesión de página)
    const timer = setTimeout(() => setOpen(true), AUTO_OPEN_MS);
    return () => clearTimeout(timer);
  }, [apiBase]);

  // Cargar el script de Calendly popup widget (Forma A)
  useEffect(() => {
    if (document.getElementById('calendly-widget-script')) return;
    const script = document.createElement('script');
    script.id = 'calendly-widget-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // auto-scroll al fondo
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // mensaje de bienvenida si no hay historial
  useEffect(() => {
    if (open && messages.length === 0 && !loading) {
      const welcome =
        language === 'es'
          ? '¡Hola! Soy Fency, el asistente de Smooth Fence USA 🪵 ¿Estás pensando en una cerca nueva? Puedo ayudarte a obtener un estimado gratis en menos de un minuto.'
          : "Hi! I'm Fency, the Smooth Fence USA assistant 🪵 Thinking about a new fence? I can help you get a free estimate in under a minute.";
      setMessages([{ role: 'assistant', content: welcome }]);
    }
  }, [open, messages.length, loading, language]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const r = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text, language }),
      });
      const data = await r.json();
      if (!r.ok || !data.reply) {
        throw new Error(data.detail || data.error || 'API error');
      }
      if (data.language && data.language !== language) setLanguage(data.language);
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: language === 'es' ? 'Hubo un error de conexión.' : 'Connection error.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const waNumber = whatsapp ? whatsapp.replace(/[^\d]/g, '') : '';
  const telHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '';

  function openWhatsApp() {
    if (!waNumber) return;
    const text = buildWhatsAppMessage(messages, language);
    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noreferrer'
    );
  }

  /**
   * Forma A: abre el popup widget de Calendly si el script está cargado y no
   * estamos dentro de un iframe (el popup se ve bien en página completa).
   * Forma B: fallback — abre Calendly en nueva pestaña (siempre funciona).
   */
  function openCalendly() {
    const cal = (window as any).Calendly;
    // Forma A: popup inline — solo fuera de iframe para que ocupe toda la viewport
    if (cal && window === window.top) {
      cal.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Forma B: nueva pestaña (dentro del iframe o si el script aún no cargó)
      window.open(CALENDLY_URL, '_blank', 'noreferrer');
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      {/* Burbuja flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="group flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-white shadow-xl transition hover:bg-brand-700 animate-bounce-soft"
        >
          <FenceIcon className="h-6 w-6" />
          <span className="text-sm font-medium">
            {language === 'es' ? 'Chatear con Fency' : 'Chat with Fency'}
          </span>
        </button>
      )}

      {/* Ventana del chat */}
      {open && (
        <div className="flex h-[560px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <FenceIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">Fency</div>
                <div className="text-xs text-white/80">
                  {language === 'es' ? 'Smooth Fence USA' : 'Smooth Fence USA'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-snug ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-brand-600 text-white'
                      : 'rounded-bl-sm bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
                  <span className="inline-block animate-pulse">●●●</span>
                </div>
              </div>
            )}
          </div>

          {/* Botón Agendar cita */}
          <div className="border-t border-gray-100 bg-brand-50 px-3 py-2">
            <button
              onClick={openCalendly}
              className="w-full rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.98]"
            >
              📅 {language === 'es' ? 'Agendar visita gratuita' : 'Schedule free visit'}
            </button>
          </div>

          {/* Handoff bar */}
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 bg-white px-3 py-1.5 text-xs">
            <span className="text-gray-500">
              {language === 'es' ? 'Hablar con humano:' : 'Talk to a human:'}
            </span>
            {waNumber && (
              <button
                onClick={openWhatsApp}
                className="font-medium text-brand-600 hover:underline"
              >
                WhatsApp
              </button>
            )}
            {telHref && (
              <>
                <span className="text-gray-300">·</span>
                <a href={telHref} className="font-medium text-brand-600 hover:underline">
                  {language === 'es' ? 'Llamar' : 'Call'}
                </a>
              </>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-100 bg-white p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={
                language === 'es' ? 'Escribí tu mensaje…' : 'Type your message…'
              }
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-brand-500 focus:bg-white"
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
            >
              {language === 'es' ? 'Enviar' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Builds a WhatsApp message with the full conversation transcript.
 * Skips the auto welcome message (first bot message), takes last 8 exchanges,
 * truncates bot replies to keep URLs under ~1500 chars total.
 */
function buildWhatsAppMessage(msgs: Msg[], language: 'es' | 'en'): string {
  // Skip the initial welcome message (index 0, role assistant)
  const conversation = msgs.slice(msgs[0]?.role === 'assistant' ? 1 : 0);

  if (conversation.length === 0) {
    return language === 'es'
      ? 'Hola, me gustaría un estimado de cerca'
      : 'Hi, I would like a fence estimate';
  }

  const header = language === 'es'
    ? 'Hola, estuve chateando con Fency en el sitio de Smooth Fence USA. Acá va el resumen:\n\n'
    : 'Hi, I was chatting with Fency on the Smooth Fence USA website. Here\'s the summary:\n\n';

  // Take last 8 messages, format as transcript
  const recent = conversation.slice(-8);
  const lines = recent.map((m) => {
    const prefix = m.role === 'user' ? '👤' : '🤖';
    // Truncate long bot replies to 100 chars to keep URL short
    const content = m.role === 'assistant' && m.content.length > 100
      ? m.content.slice(0, 97) + '…'
      : m.content;
    return `${prefix}: ${content}`;
  });

  const transcript = lines.join('\n');
  const full = header + transcript;

  // WhatsApp URL has a practical ~1500 char limit on the text param
  if (full.length > 1400) {
    return full.slice(0, 1397) + '…';
  }
  return full;
}

/** Ícono de cerca personalizado, SVG inline. */
function FenceIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 21V9l2-3 2 3v12" />
      <path d="M10 21V9l2-3 2 3v12" />
      <path d="M16 21V9l2-3 2 3v12" />
      <path d="M2 12h20" />
      <path d="M2 17h20" />
    </svg>
  );
}
