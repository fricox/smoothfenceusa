/**
 * Tipos de la knowledge base de Smooth Fence.
 * Editable desde el panel admin sin tocar código.
 */

export interface FenceType {
  name: string;
  description?: string;
  price_range?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface KnowledgeBase {
  service_areas?: string[];
  fence_types?: FenceType[];
  hours?: string;
  warranty?: string;
  process?: string;
  faq?: FaqItem[];
  extra_notes?: string;
  // versionado simple para invalidar caché si querés
  updated_at?: string;
}

export const EMPTY_KB: KnowledgeBase = {
  service_areas: [],
  fence_types: [],
  hours: '',
  warranty: '',
  process: '',
  faq: [],
  extra_notes: '',
};
