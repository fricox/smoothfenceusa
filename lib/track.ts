/**
 * Centralized client-side tracking. One module, all conversion events.
 *
 * Every tracked action (lead, contact click, financing apply, purchase,
 * Calendly schedule) fires:
 *   1. A GTM dataLayer event (forwarded to GA4 by the GTM container)
 *   2. A Google Ads conversion (when the matching env var label is set)
 *
 * Adding a new event type? Add a function here and a label env var. Don't
 * push to dataLayer or call gtag directly from components.
 */

import type { Attribution } from "./attribution";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
const LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "";
const PHONE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL ?? "";
const FINANCING_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_FINANCING_LABEL ?? "";
const PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL ?? "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type ContactChannel = "tel" | "sms" | "whatsapp" | "email";
export type FormType = "lp_hero" | "estimator" | "quick_contact" | "quote";

function pushDataLayer(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    ...event,
    page_path: window.location.pathname,
    timestamp: Date.now(),
  });
}

function fireGoogleAdsConversion(
  label: string,
  value?: number,
  currency = "USD",
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!ADS_ID || !label) return;
  const payload: Record<string, unknown> = {
    send_to: `${ADS_ID}/${label}`,
  };
  if (value !== undefined) {
    payload.value = value;
    payload.currency = currency;
  }
  window.gtag("event", "conversion", payload);
}

/**
 * Fire when any lead form is submitted successfully. Replaces the legacy
 * `trackLeadConversion()` and the inline `dataLayer.push({event:"lead_form_submit"})`.
 */
export function trackLead(
  form_type: FormType,
  attribution: Attribution = {},
  value = 50,
  extra: Record<string, unknown> = {},
): void {
  pushDataLayer({
    event: "lead_form_submit",
    form_type,
    ...attribution,
    ...extra,
  });
  fireGoogleAdsConversion(LEAD_LABEL, value);
}

/**
 * Fire when a user taps a tel:, sms:, mailto: or WhatsApp link. tel and sms
 * also fire the Google Ads phone-call conversion (high-intent — most fence
 * leads come by phone, not form).
 */
export function trackContactClick(
  channel: ContactChannel,
  location: string,
): void {
  pushDataLayer({
    event: "contact_click",
    channel,
    location,
  });
  if (channel === "tel" || channel === "sms") {
    fireGoogleAdsConversion(PHONE_LABEL, 50);
  }
}

/**
 * Fire when a user clicks a financing partner link (Hearth, etc.) — outbound
 * to a third-party prequalify flow. High intent.
 */
export function trackFinancingClick(
  provider: string,
  location: string,
): void {
  pushDataLayer({
    event: "financing_click",
    provider,
    location,
  });
  fireGoogleAdsConversion(FINANCING_LABEL, 30);
}

/**
 * Fire on the Stripe success page after a deposit/payment is confirmed.
 * Sends the actual paid value so Google Ads ROAS reports on real revenue.
 */
export function trackPurchase(
  orderId: string,
  value: number,
  currency = "USD",
): void {
  pushDataLayer({
    event: "purchase",
    transaction_id: orderId,
    value,
    currency,
  });
  fireGoogleAdsConversion(PURCHASE_LABEL, value, currency);
}

/**
 * Fire when a user clicks the Calendly button to schedule install. Useful as
 * a soft conversion for funnel analysis (not a paid conversion goal yet).
 */
export function trackCalendlyClick(location: string): void {
  pushDataLayer({
    event: "calendly_click",
    location,
  });
}
