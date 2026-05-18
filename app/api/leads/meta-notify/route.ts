/**
 * Meta Lead Ads → email + Sheets notification endpoint.
 *
 * Called by the local lead-poller (~/.claude/mcp/meta-ads/lead-poller.py)
 * every 5 minutes when it detects a new submission on a configured Meta
 * Lead Gen form. Authenticated via Bearer token shared secret.
 *
 * Side effects:
 *   1. Fires owner email via Resend (same infra as /api/quote)
 *   2. Pushes lead to unified Google Sheets CRM via existing pushLeadEvent
 *
 * Not exposed via UI — only the poller hits this. Rate limit applied as
 * defense-in-depth in case the secret leaks.
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { pushLeadEvent } from "@/lib/sheets";
import { escapeHtml, rateLimit } from "@/lib/sanitize";

export const runtime = "nodejs";

type MetaLeadField = { name: string; values?: string[] };

type MetaLeadNotifyPayload = {
  form_id: string;
  lead_id: string;
  created_time: string;
  field_data: MetaLeadField[];
  ad_id?: string;
  adset_id?: string;
  campaign_id?: string;
};

function flattenFields(fields: MetaLeadField[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fields) {
    if (!f?.name) continue;
    out[f.name] = (f.values && f.values[0]) || "";
  }
  return out;
}

export async function POST(request: NextRequest) {
  // ── Auth: shared secret ──────────────────────────────────────
  const auth = request.headers.get("authorization") || "";
  const secret = process.env.META_LEAD_NOTIFY_SECRET;
  if (!secret) {
    console.error("META_LEAD_NOTIFY_SECRET not configured");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // ── Rate limit (defense in depth) ────────────────────────────
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip, { maxRequests: 20, windowMs: 60_000 })) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  // ── Parse body ───────────────────────────────────────────────
  let payload: MetaLeadNotifyPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (!payload.form_id || !payload.lead_id || !Array.isArray(payload.field_data)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const fields = flattenFields(payload.field_data);
  const name = fields.full_name || fields.first_name || "Unknown";
  const phone = fields.phone_number || fields.phone || "";
  const email = fields.email || "";
  const zipcode = fields.zip_code || fields.zip || "";
  const city = fields.city || "";
  const state = fields.state || "";

  // ── Email via Resend (same env vars as /api/quote) ───────────
  const resendApiKey = process.env.RESEND_API_KEY;
  const leadsToEmail = process.env.LEADS_TO_EMAIL;
  const emailFrom = process.env.EMAIL_FROM;
  let emailOk = false;
  let emailError: string | null = null;

  if (resendApiKey && leadsToEmail && emailFrom) {
    const resend = new Resend(resendApiKey);

    const subject = `🔔 New Meta Lead — ${name}${zipcode ? ` (${zipcode})` : ""}`;

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#125036">
        <div style="background:#125036;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#f8cf2b;margin:0;font-size:24px">🔔 Meta Lead Ads</h1>
          <p style="color:#fff;margin:6px 0 0;font-size:13px">Smooth Fence USA · ${escapeHtml(zipcode || city || "Florida")}</p>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #b2cf7f;border-radius:0 0 12px 12px">
          <p style="background:#f8cf2b;color:#125036;padding:14px;border-radius:8px;margin:0 0 20px;text-align:center;font-weight:700">
            ⏱️ Reply within 5 minutes for ~100x conversion vs 1 hour
          </p>
          <table style="width:100%;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:8px;color:#666;width:30%">Name</td><td style="font-weight:700">${escapeHtml(name)}</td></tr>
            <tr style="background:#fbfcf9"><td style="padding:8px;color:#666">Phone</td><td style="font-weight:700"><a href="tel:${escapeHtml(phone)}" style="color:#125036">${escapeHtml(phone || "—")}</a></td></tr>
            <tr><td style="padding:8px;color:#666">Email</td><td style="font-weight:700">${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#125036">${escapeHtml(email)}</a>` : "—"}</td></tr>
            <tr style="background:#fbfcf9"><td style="padding:8px;color:#666">ZIP</td><td style="font-weight:700">${escapeHtml(zipcode || "—")}</td></tr>
            ${city || state ? `<tr><td style="padding:8px;color:#666">Location</td><td style="font-weight:700">${escapeHtml([city, state].filter(Boolean).join(", "))}</td></tr>` : ""}
            <tr style="background:#fbfcf9"><td style="padding:8px;color:#666">Submitted</td><td style="font-weight:700">${escapeHtml(payload.created_time || "")}</td></tr>
          </table>
          <div style="margin-top:20px;padding:14px;background:#fbfcf9;border:1px dashed #b2cf7f;border-radius:8px">
            <p style="margin:0 0 6px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px">Meta Source</p>
            <p style="margin:0;font-size:11px;color:#666;font-family:monospace">
              Form ${escapeHtml(payload.form_id)} · Ad ${escapeHtml(payload.ad_id || "—")} · Campaign ${escapeHtml(payload.campaign_id || "—")}
            </p>
          </div>
        </div>
      </div>
    `;

    const textBody = [
      "🔔 New Meta Lead — Smooth Fence USA",
      "",
      `Name:    ${name}`,
      `Phone:   ${phone || "—"}`,
      `Email:   ${email || "—"}`,
      `ZIP:     ${zipcode || "—"}`,
      city || state ? `Location: ${[city, state].filter(Boolean).join(", ")}` : "",
      `Time:    ${payload.created_time || "—"}`,
      "",
      "⏱️  Reply within 5 minutes for ~100x conversion vs 1 hour.",
      "",
      `Form ID: ${payload.form_id}`,
      `Lead ID: ${payload.lead_id}`,
      `Ad ID:   ${payload.ad_id || "—"}`,
      `Campaign:${payload.campaign_id || "—"}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const { error } = await resend.emails.send({
        from: emailFrom,
        to: [leadsToEmail],
        subject,
        replyTo: email || leadsToEmail,
        text: textBody,
        html: htmlBody,
      });
      if (error) {
        emailError = String(error);
        console.error("Meta lead email error:", error);
      } else {
        emailOk = true;
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
      console.error("Meta lead email exception:", err);
    }
  } else {
    emailError = "Resend env vars not set";
    console.error("Resend env vars missing — email skipped");
  }

  // ── Push to Sheets ──────────────────────────────────────────
  let sheetsOk = false;
  try {
    await pushLeadEvent({
      type: "lead_created",
      source: "meta_lead_ads",
      status: "new",
      fullName: name,
      phone,
      email,
      address: city && state ? `${city}, ${state} ${zipcode}` : zipcode,
      utm_source: "meta",
      utm_medium: "lead_ads",
      utm_campaign: payload.campaign_id || "",
      utm_content: payload.ad_id || "",
      notes: `Meta Lead Form ${payload.form_id} · Lead ${payload.lead_id} · ${payload.created_time}`,
    });
    sheetsOk = true;
  } catch (err) {
    console.error("Meta lead Sheets push error:", err);
  }

  return NextResponse.json({
    ok: true,
    email_sent: emailOk,
    email_error: emailError,
    sheets_pushed: sheetsOk,
  });
}
