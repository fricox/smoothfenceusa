import { NextRequest, NextResponse } from "next/server";

/**
 * QR / offline redirect endpoint.
 *
 * Printed assets (business cards, truck magnets, flyers, yard signs) encode a
 * QR pointing at `/c?v=<variant>`. This handler:
 *   1. Redirects the visitor to the website (homepage — the hero leads with the
 *      free-estimate form, matching the card's "Scan for a free quote" promise).
 *   2. Tags the visit with UTM params so it flows through the existing
 *      attribution pipeline (lib/attribution.ts -> CRM in lib/sheets.ts) and
 *      shows up in GA4 acquisition reports — closing the loop scan -> lead.
 *   3. Logs every scan server-side (Vercel logs) so raw scan counts are captured
 *      even for visitors who bounce before client-side analytics fire.
 *
 * The QR printed on the business cards encodes: /c?v=card
 */

export const runtime = "nodejs";
// Never cache: every scan must reach the function so it is logged, and so the
// destination can be repointed via redeploy without stale CDN copies lingering.
export const dynamic = "force-dynamic";

// Map a printed-asset variant to a clean GA4 utm_source. Unknown variants fall
// back to a namespaced source so a new print run works without a code change.
const SOURCE_BY_VARIANT: Record<string, string> = {
  card: "business_card",
  truck: "truck_magnet",
  flyer: "flyer",
  yard: "yard_sign",
};

// Where scans land. The homepage hero leads with the free-estimate form.
const DESTINATION_PATH = "/";

export function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("v") ?? "qr";
  // Sanitize: variant label only feeds UTM strings — keep it short + safe.
  const variant =
    raw.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32) || "qr";
  const source =
    SOURCE_BY_VARIANT[variant] ?? (variant === "qr" ? "qr" : `qr_${variant}`);

  const dest = new URL(DESTINATION_PATH, req.nextUrl.origin);
  dest.searchParams.set("utm_source", source);
  dest.searchParams.set("utm_medium", "qr");
  dest.searchParams.set("utm_campaign", variant);

  // Server-side scan log — a guaranteed count even if the visitor bounces.
  const h = req.headers;
  console.log(
    JSON.stringify({
      evt: "qr_scan",
      v: variant,
      source,
      country: h.get("x-vercel-ip-country") ?? undefined,
      region: h.get("x-vercel-ip-country-region") ?? undefined,
      city: h.get("x-vercel-ip-city") ?? undefined,
      ref: h.get("referer") ?? undefined,
      ua: h.get("user-agent") ?? undefined,
    }),
  );

  const res = NextResponse.redirect(dest, 307);
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
