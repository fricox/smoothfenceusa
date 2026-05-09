// Maps lib/faq-data.ts (source of truth for /faq) into the KnowledgeBase
// shape that Fency's chatbot engine expects. Consumed by app/api/kb/route.ts.
//
// The KnowledgeBase type is duplicated here (not cross-imported from the
// chatbot subfolder) so this package stays self-contained; Fency owns the
// canonical shape in smoothfence-chatbot/lib/chatbot/knowledge/types.ts.

import {
  FAQ_CATEGORIES_EN,
  FAQ_CATEGORIES_ES,
  type FAQCategory,
} from "./faq-data";

export type KbLang = "en" | "es";

export type FenceTypeEntry = {
  name: string;
  description?: string;
  price_range?: string;
};

export type KbFaqItem = {
  question: string;
  answer: string;
};

export type KnowledgeBase = {
  service_areas: string[];
  fence_types: FenceTypeEntry[];
  hours: string;
  warranty: string;
  process: string;
  faq: KbFaqItem[];
  extra_notes: string;
  updated_at: string;
};

/** Look up an item's answer by category slug + question-contains substring. */
function findAnswer(
  categories: FAQCategory[],
  slug: FAQCategory["slug"],
  questionContains: string,
  fallback = ""
): string {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return fallback;
  const needle = questionContains.toLowerCase();
  const match = cat.items.find((i) => i.question.toLowerCase().includes(needle));
  return match?.answer ?? fallback;
}

/** Build service_areas list. Stable list — parsing the Q&A would be brittle. */
function buildServiceAreas(lang: KbLang): string[] {
  const base = [
    "Palm Coast",
    "Flagler County",
    "Volusia County",
    "St. Johns County",
    "Duval County",
    "Putnam County",
  ];
  // County names are proper nouns — same in ES. Lang arg kept for future tweaks.
  void lang;
  return base;
}

/** Build the 4 fence_type entries from the "What types / best material" Q&As. */
function buildFenceTypes(categories: FAQCategory[], lang: KbLang): FenceTypeEntry[] {
  const bestMaterial = findAnswer(categories, "services", MATCH[lang].bestMaterial);
  // Parse the one-liner descriptions out of the "best material" answer.
  // EN source: "Vinyl = low maintenance + privacy. Aluminum = durability + visibility. Chain-link = cost-effective. Wood = classic look."
  // ES source: "Vinyl: bajo mantenimiento y privacidad. Aluminio: durabilidad y visibilidad. Chain-link: accesible. Madera: look clásico."
  const sep = lang === "es" ? ":" : "=";
  const parts = bestMaterial
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  const lookup = new Map<string, string>();
  for (const part of parts) {
    const [rawName, ...rest] = part.split(sep);
    if (!rawName || rest.length === 0) continue;
    lookup.set(rawName.trim().toLowerCase(), rest.join(sep).trim());
  }

  const labels =
    lang === "es"
      ? [
          { key: "vinyl", name: "Vinyl" },
          { key: "aluminio", name: "Aluminio" },
          { key: "chain-link", name: "Chain-Link" },
          { key: "madera", name: "Madera" },
        ]
      : [
          { key: "vinyl", name: "Vinyl" },
          { key: "aluminum", name: "Aluminum" },
          { key: "chain-link", name: "Chain-Link" },
          { key: "wood", name: "Wood" },
        ];

  return labels.map(({ key, name }) => ({
    name,
    description: lookup.get(key) ?? "",
    price_range: "",
  }));
}

/** Per-language question substrings for synthesized fields. */
const MATCH: Record<KbLang, {
  hours: string;
  warranty: string;
  bestMaterial: string;
  duration: string;
  affectsPrice: string;
  prepare: string;
}> = {
  en: {
    hours: "business hours",
    warranty: "offer a warranty",
    bestMaterial: "best material",
    duration: "how long does installation",
    affectsPrice: "affects the price",
    prepare: "prepare before install",
  },
  es: {
    hours: "horario",
    warranty: "ofrecen garantía",
    bestMaterial: "mejor en florida",
    duration: "cuánto tarda",
    affectsPrice: "afecta el precio",
    prepare: "preparar antes",
  },
};

/** Synthesize a short process summary from three service-area Q&As. */
function buildProcess(categories: FAQCategory[], lang: KbLang): string {
  const m = MATCH[lang];
  const duration = findAnswer(categories, "service-area", m.duration);
  const affects = findAnswer(categories, "service-area", m.affectsPrice);
  const prep = findAnswer(categories, "service-area", m.prepare);
  const durationLabel = lang === "es" ? "Duración:" : "Duration:";
  const priceLabel = lang === "es" ? "Factores de precio:" : "Price factors:";
  const prepLabel = lang === "es" ? "Antes del día:" : "Before install day:";
  return [
    duration ? `${durationLabel} ${duration}` : "",
    affects ? `${priceLabel} ${affects}` : "",
    prep ? `${prepLabel} ${prep}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** Flatten the 4 categories into a single faq[] with category prefixes. */
function buildFlatFaq(categories: FAQCategory[]): KbFaqItem[] {
  return categories.flatMap((category) =>
    category.items.map((item) => ({
      question: `[${category.label}] ${item.question}`,
      answer: item.answer,
    }))
  );
}

/**
 * Build a complete KnowledgeBase for the given language.
 * This is pure — deterministic output given the FAQ_CATEGORIES_* input.
 */
export function buildKbFromFaqData(lang: KbLang): KnowledgeBase {
  const categories = lang === "es" ? FAQ_CATEGORIES_ES : FAQ_CATEGORIES_EN;
  return {
    service_areas: buildServiceAreas(lang),
    fence_types: buildFenceTypes(categories, lang),
    hours: findAnswer(categories, "about-us", MATCH[lang].hours),
    warranty: findAnswer(categories, "about-us", MATCH[lang].warranty),
    process: buildProcess(categories, lang),
    faq: buildFlatFaq(categories),
    extra_notes: "Powered by smoothfenceusa.com/faq · Updated via lib/faq-data.ts",
    updated_at: process.env.VERCEL_GIT_COMMIT_SHA ?? new Date().toISOString(),
  };
}
