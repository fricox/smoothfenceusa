/**
 * Unified Google Sheets "CRM" helper.
 *
 * Every lead-related event (contact form, estimator, Stripe payment, Calendly
 * booking, etc.) flows through `pushLeadEvent` so that the Google Sheet stays
 * in a consistent shape. The Apps Script on the other end maps these fields
 * to columns — see SETUP_CRM.md for the exact Apps Script code to paste.
 *
 * Design choice: append-only. We do NOT try to mutate existing rows. Each
 * event is its own row, identified by `leadId` (= customer email, lowercased)
 * so you can group events for the same customer with a simple pivot table or
 * filter in Google Sheets. When we migrate to HubSpot later, a proper CRM
 * will merge these into a single contact.
 */

export type LeadStatus =
  | "new"
  | "visit_scheduled"
  | "visit_done"
  | "deposit_paid"
  | "install_scheduled"
  | "install_done"
  | "completed"
  | "canceled";

export type LeadSource =
  | "contact"
  | "estimator"
  | "stripe"
  | "calendly"
  | "phone"
  | "other";

export type LeadEventType =
  | "lead_created"
  | "estimate_sent"
  | "visit_booked"
  | "visit_canceled"
  | "deposit_paid"
  | "install_booked"
  | "install_canceled"
  | "note";

export interface LeadEvent {
  /* Required routing fields */
  type: LeadEventType;
  source: LeadSource;
  status: LeadStatus;

  /* Contact */
  fullName?: string;
  email?: string;
  phone?: string;

  /* Project */
  address?: string;
  zip?: string;
  material?: string;        // aka fenceType
  height?: string;
  linearFeet?: string | number;
  gates?: string | number;
  removal?: boolean;
  premium?: boolean;
  hoa?: string;
  estimateLow?: number;
  estimateHigh?: number;

  /* Payment */
  depositAmount?: number;
  stripeSessionId?: string;

  /* Scheduling */
  visitDate?: string;
  installDate?: string;
  earliestInstallDate?: string;
  preferredDate?: string;

  /* Freeform */
  notes?: string;
  message?: string;

  /* Attribution (Track A) */
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Pushes a normalized event to the Google Sheet.
 * Fire-and-forget: never throws, never blocks the caller.
 */
export async function pushLeadEvent(event: LeadEvent): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  const email = (event.email || "").toLowerCase().trim();
  const leadId = email || `anon-${Date.now()}`;

  const payload = {
    // System
    submittedAt: new Date().toISOString(),
    leadId,
    type: event.type,
    source: event.source,
    status: event.status,

    // Contact
    fullName: event.fullName || "",
    email,
    phone: event.phone || "",

    // Project
    address: event.address || "",
    zip: event.zip || "",
    fenceType: event.material || "",
    height: event.height || "",
    linearFeet: String(event.linearFeet ?? ""),
    gates: String(event.gates ?? ""),
    removal: event.removal ? "yes" : "",
    premium: event.premium ? "yes" : "",
    hoa: event.hoa || "",
    estimateLow: event.estimateLow ?? "",
    estimateHigh: event.estimateHigh ?? "",

    // Payment
    depositAmount: event.depositAmount ?? "",
    stripeSessionId: event.stripeSessionId || "",

    // Scheduling
    visitDate: event.visitDate || "",
    installDate: event.installDate || "",
    earliestInstallDate: event.earliestInstallDate || "",
    preferredDate: event.preferredDate || "",

    // Freeform
    notes: event.notes || "",
    message: event.message || "",

    // Attribution (Track A)
    gclid: event.gclid || "",
    utm_source: event.utm_source || "",
    utm_medium: event.utm_medium || "",
    utm_campaign: event.utm_campaign || "",
    utm_term: event.utm_term || "",
    utm_content: event.utm_content || "",
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[sheets] pushLeadEvent failed:", err);
  }
}
