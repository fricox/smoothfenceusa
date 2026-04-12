/**
 * Módulo "estimador / lead capture".
 * Define la herramienta que Claude puede llamar para guardar un lead.
 */

import { createServiceClient } from '../db/server';
import type Anthropic from '@anthropic-ai/sdk';

export const saveLeadTool: Anthropic.Tool = {
  name: 'save_lead',
  description:
    'Save a customer lead. Ideally collect name, phone, and zip before calling — but if you have name + zip, you may save and continue collecting phone. Email is optional. Call this only once per session.',
  input_schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Full name of the customer' },
      phone: { type: 'string', description: 'Phone number including area code' },
      email: { type: 'string', description: 'Email address (optional)' },
      zip: { type: 'string', description: '5-digit US ZIP code' },
      notes: { type: 'string', description: 'Brief note about what kind of fence they need' },
    },
    required: ['name', 'zip'],
  },
};

interface SaveLeadInput {
  session_id: string;
  language: string;
  name: string;
  phone: string;
  email?: string;
  zip: string;
  notes?: string;
}

export async function saveLead(input: SaveLeadInput) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('leads')
    .insert({
      session_id: input.session_id,
      name: input.name,
      phone: input.phone,
      email: input.email ?? null,
      zip: input.zip,
      language: input.language,
      notes: input.notes ?? null,
    })
    .select()
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, lead_id: data.id };
}
