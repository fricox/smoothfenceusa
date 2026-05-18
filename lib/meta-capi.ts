/**
 * Meta Conversions API (CAPI) — server-side event dispatcher.
 *
 * Fires server-side events to Meta Marketing API so Advantage+ has reliable
 * conversion signal (iOS 14.5+ blocks ~30-40% of browser-side Pixel events).
 *
 * Design notes:
 * - Fire-and-forget: callers should NOT await this in critical paths.
 *   Use dispatchMetaCapiEvent(...).catch(noop) so a CAPI failure never
 *   breaks the user's actual request (form submit, Stripe webhook, etc).
 * - Silent no-op if META_PIXEL_ID or META_CAPI_TOKEN unset — lets the
 *   site deploy before the Pixel is created without breaking anything.
 * - All user PII is SHA256-hashed per Meta's requirement.
 *
 * Required env vars (Vercel):
 *   META_PIXEL_ID    — Numeric Pixel/Dataset ID
 *   META_CAPI_TOKEN  — Access token with `ads_management` (System User token
 *                      from SmoothFenceAdsMCP works since it owns the pixel)
 *
 * Optional:
 *   META_CAPI_TEST_CODE — Set to e.g. "TEST12345" to route events to the
 *                         Test Events tab in Meta Events Manager. UNSET in
 *                         prod or events won't count for ad optimization.
 *
 * Reference: https://developers.facebook.com/docs/marketing-api/conversions-api/
 */
import crypto from "node:crypto";

export type MetaCapiEventName =
  | "Lead"
  | "Purchase"
  | "InitiateCheckout"
  | "Schedule"
  | "Contact"
  | "SubmitApplication"
  | "ViewContent";

export type MetaCapiActionSource =
  | "website"
  | "email"
  | "app"
  | "phone_call"
  | "chat"
  | "physical_store"
  | "system_generated"
  | "business_messaging";

export interface MetaCapiUserData {
  email?: string;       // Will be hashed
  phone?: string;       // Will be hashed (normalize to digits-only first)
  firstName?: string;
  lastName?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;     // 2-letter ISO; default "us"
  externalId?: string;  // Will be hashed; e.g. Stripe customer ID
  // Non-hashed identifiers:
  ip?: string;          // From request headers
  userAgent?: string;   // From request headers
  fbc?: string;         // From fbclid query param (fb.1.<ts>.<fbclid>)
  fbp?: string;         // From _fbp cookie
}

export interface MetaCapiCustomData {
  value?: number;
  currency?: string;          // Default "USD"
  contentName?: string;
  contentCategory?: string;
  contentIds?: string[];
  numItems?: number;
  orderId?: string;
}

export interface MetaCapiEvent {
  eventName: MetaCapiEventName;
  eventTime?: number;         // Unix seconds; default = now
  eventId?: string;           // For Pixel-CAPI dedup; default = random
  eventSourceUrl?: string;    // URL where event happened
  actionSource: MetaCapiActionSource;
  userData: MetaCapiUserData;
  customData?: MetaCapiCustomData;
}

/** SHA256 hash a normalized lowercase trimmed string. */
function hash(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/** Normalize phone to digits-only before hashing (E.164 without +). */
function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  return digits || undefined;
}

/** Build the user_data block per Meta's CAPI spec (hashed where required). */
function buildUserData(u: MetaCapiUserData): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {
    em: hash(u.email),
    ph: hash(normalizePhone(u.phone)),
    fn: hash(u.firstName),
    ln: hash(u.lastName),
    zp: hash(u.zip),
    ct: hash(u.city),
    st: hash(u.state),
    country: hash(u.country || "us"),
    external_id: hash(u.externalId),
    client_ip_address: u.ip || undefined,
    client_user_agent: u.userAgent || undefined,
    fbc: u.fbc || undefined,
    fbp: u.fbp || undefined,
  };
  // Drop undefined keys (Meta rejects them).
  for (const k of Object.keys(out)) {
    if (out[k] === undefined) delete out[k];
  }
  return out;
}

function buildCustomData(c: MetaCapiCustomData | undefined): Record<string, unknown> | undefined {
  if (!c) return undefined;
  const out: Record<string, unknown> = {};
  if (c.value !== undefined) out.value = c.value;
  if (c.currency) out.currency = c.currency;
  else if (c.value !== undefined) out.currency = "USD";
  if (c.contentName) out.content_name = c.contentName;
  if (c.contentCategory) out.content_category = c.contentCategory;
  if (c.contentIds && c.contentIds.length) out.content_ids = c.contentIds;
  if (c.numItems !== undefined) out.num_items = c.numItems;
  if (c.orderId) out.order_id = c.orderId;
  return Object.keys(out).length ? out : undefined;
}

/**
 * Dispatch a single CAPI event. Silently no-ops if env vars missing.
 * Returns a brief result object — caller may ignore or log.
 *
 * Caller pattern:
 *   dispatchMetaCapiEvent({...}).catch((e) => console.error("CAPI:", e));
 */
export async function dispatchMetaCapiEvent(
  event: MetaCapiEvent,
): Promise<{ ok: boolean; reason?: string; meta?: Record<string, unknown> }> {
  const pixelId = process.env.META_PIXEL_ID?.trim();
  const token = process.env.META_CAPI_TOKEN?.trim() || process.env.META_ACCESS_TOKEN?.trim();
  const apiVersion = process.env.META_API_VERSION?.trim() || "v21.0";
  const testEventCode = process.env.META_CAPI_TEST_CODE?.trim();

  if (!pixelId || !token) {
    return { ok: false, reason: "META_PIXEL_ID or META_CAPI_TOKEN not configured" };
  }

  const eventTime = event.eventTime ?? Math.floor(Date.now() / 1000);
  const eventId = event.eventId ?? crypto.randomBytes(8).toString("hex");

  const eventPayload: Record<string, unknown> = {
    event_name: event.eventName,
    event_time: eventTime,
    event_id: eventId,
    action_source: event.actionSource,
    user_data: buildUserData(event.userData),
  };
  if (event.eventSourceUrl) eventPayload.event_source_url = event.eventSourceUrl;
  const custom = buildCustomData(event.customData);
  if (custom) eventPayload.custom_data = custom;

  const body: Record<string, unknown> = {
    data: [eventPayload],
  };
  if (testEventCode) body.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Per Vercel Edge/Node fetch — short timeout via AbortController
      signal: AbortSignal.timeout(10_000),
    });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error("Meta CAPI error", resp.status, json);
      return { ok: false, reason: `HTTP ${resp.status}`, meta: json };
    }
    return { ok: true, meta: json };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Meta CAPI exception:", msg);
    return { ok: false, reason: msg };
  }
}

/**
 * Helper to extract fbc + fbp from a Next.js Request.
 * - fbc: from ?fbclid= query param (formatted per Meta's spec)
 * - fbp: from _fbp cookie set by the browser Pixel (we don't have Pixel,
 *        so usually undefined — that's fine, server-only attribution works)
 */
export function extractMetaIds(
  request: Request,
): { fbc?: string; fbp?: string } {
  const url = new URL(request.url);
  const fbclid = url.searchParams.get("fbclid");
  const fbc = fbclid
    ? `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`
    : undefined;

  // Parse _fbp cookie if present
  const cookie = request.headers.get("cookie") || "";
  const fbpMatch = cookie.match(/_fbp=([^;]+)/);
  const fbp = fbpMatch ? fbpMatch[1] : undefined;

  return { fbc, fbp };
}

/** Helper to extract client IP + UA from request headers (Vercel-friendly). */
export function extractClientIdentity(
  request: Request,
): { ip?: string; userAgent?: string } {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || undefined;
  const userAgent = request.headers.get("user-agent") || undefined;
  return { ip, userAgent };
}
