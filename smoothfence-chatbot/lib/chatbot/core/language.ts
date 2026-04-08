import type { Language } from '../prompts/system';

/**
 * Detección de idioma simple, sin dependencias externas.
 * Si no puede decidir, devuelve el default (inglés).
 */
const SPANISH_HINTS = [
  ' el ', ' la ', ' los ', ' las ', ' que ', ' por ', ' para ', ' con ',
  ' una ', ' uno ', ' del ', ' es ', ' son ', ' qué ', ' cómo ', ' cuánto ',
  ' precio ', ' cerca ', ' gracias ', ' hola ', ' buenas ', ' necesito ',
  ' quiero ', ' puedo ', 'á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡',
];
const ENGLISH_HINTS = [
  ' the ', ' is ', ' are ', ' you ', ' your ', ' for ', ' with ', ' how ',
  ' what ', ' price ', ' fence ', ' thanks ', ' hello ', ' need ', ' want ',
  ' can ', ' please ', ' my ', ' i ',
];

export function detectLanguage(text: string, fallback: Language = 'en'): Language {
  if (!text) return fallback;
  const t = ` ${text.toLowerCase()} `;
  let es = 0;
  let en = 0;
  for (const h of SPANISH_HINTS) if (t.includes(h)) es++;
  for (const h of ENGLISH_HINTS) if (t.includes(h)) en++;
  if (es === en) return fallback;
  return es > en ? 'es' : 'en';
}
