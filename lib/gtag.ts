/**
 * Back-compat shim. Forwards to the unified `lib/track.ts`.
 * New code should import `trackLead` from `@/lib/track` directly — it
 * pushes the GTM dataLayer event AND fires the Google Ads conversion in
 * one call (replacing the legacy `dataLayer.push(...)` + `trackLeadConversion()`).
 */
import { trackLead } from "./track";

/**
 * @deprecated Use `trackLead(form_type, attribution, value)` from `@/lib/track`.
 * This wrapper keeps existing callers working while we migrate.
 */
export function trackLeadConversion(value = 50, _currency = "USD") {
  trackLead("quote", {}, value);
}
