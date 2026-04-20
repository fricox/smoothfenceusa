// Client-side event tracking for contact-channel clicks (tel/sms/WhatsApp).
// Pushes a `contact_click` event to the GTM dataLayer; GTM forwards to GA4.
// See docs/SETUP_GTM_GA4.md for the GTM trigger + GA4 event-tag config.

export type ContactChannel = "tel" | "sms" | "whatsapp";

interface DataLayerWindow {
  dataLayer?: Array<Record<string, unknown>>;
}

/**
 * Fire a contact_click dataLayer event. SSR-safe (no-op on the server).
 * Does NOT preventDefault — callers keep the native tel:/sms:/wa.me behavior.
 */
export function trackClickToContact(channel: ContactChannel, location: string): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "contact_click",
    channel,
    location,
    page_path: window.location.pathname,
    timestamp: Date.now(),
  });
}
