/**
 * Módulo handoff a humano: WhatsApp + Teléfono.
 * Devuelve los enlaces formateados según el idioma.
 */

import type { Language } from '../prompts/system';

export function buildHandoffLinks(lang: Language) {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '';
  const whatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP ?? '';

  const waMessage = lang === 'es'
    ? 'Hola, me gustaría un estimado de cerca'
    : 'Hi, I would like a fence estimate';

  return {
    phone,
    whatsapp,
    phoneHref: `tel:${phone.replace(/[^+\d]/g, '')}`,
    whatsappHref: `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(waMessage)}`,
  };
}
