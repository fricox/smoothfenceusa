/**
 * Google Ads conversion tracking utility.
 *
 * Fires a gtag conversion event when a lead form is submitted.
 * The Google Ads tag (AW-*) must be loaded via layout.tsx for this to work.
 *
 * Environment variable: NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
const CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "";

/**
 * Fire a Google Ads "Request quote" conversion event.
 * Safe to call even if gtag is not loaded — silently no-ops.
 */
export function trackLeadConversion(value = 50.0, currency = "USD") {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!ADS_ID || !CONVERSION_LABEL) return;

  window.gtag("event", "conversion", {
    send_to: `${ADS_ID}/${CONVERSION_LABEL}`,
    value,
    currency,
  });
}
