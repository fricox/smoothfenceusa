import { NextResponse } from "next/server";
import { Resend } from "resend";
import { pushLeadEvent } from "@/lib/sheets";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const data = await request.json();
  const {
    name, phone, email, zip,
    material, height, linearFeet, gates,
    removal, premium, estimateLow, estimateHigh,
    // Attribution (Track A)
    gclid, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
  } = data;

  const resendApiKey = process.env.RESEND_API_KEY;
  const leadsToEmail = process.env.LEADS_TO_EMAIL;
  const emailFrom    = process.env.EMAIL_FROM;

  if (!resendApiKey || !leadsToEmail || !emailFrom) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // ── Email to client ──────────────────────────────────────
  const clientHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#125036">
      <div style="background:#125036;padding:32px;text-align:center;border-radius:16px 16px 0 0">
        <h1 style="color:#f8cf2b;margin:0;font-size:28px">SmoothFenceUSA</h1>
        <p style="color:#fff;margin:8px 0 0;font-size:14px">Your Fence Estimate is Ready</p>
      </div>
      <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px;border:1px solid #b2cf7f">
        <p style="font-size:16px">Hi <strong>${name}</strong>,</p>
        <p>Thanks for using our estimator! Here's a summary of your project and the estimated cost range:</p>

        <div style="background:#fbfcf9;border:1px solid #b2cf7f;border-radius:12px;padding:20px;margin:20px 0">
          <h2 style="margin:0 0 16px;font-size:18px;color:#125036">📋 Project Summary</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#666">Material</td><td style="font-weight:600">${material}${premium ? " (Premium Grade)" : ""}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Height</td><td style="font-weight:600">${height}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Linear Feet</td><td style="font-weight:600">${linearFeet} ft</td></tr>
            <tr><td style="padding:6px 0;color:#666">Gates</td><td style="font-weight:600">${gates}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Old fence removal</td><td style="font-weight:600">${removal ? "Yes" : "No"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Zip Code</td><td style="font-weight:600">${zip}</td></tr>
          </table>
        </div>

        <div style="background:#125036;border-radius:12px;padding:24px;text-align:center;margin:20px 0">
          <p style="color:#b2cf7f;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:2px">Estimated Range</p>
          <p style="color:#f8cf2b;font-size:36px;font-weight:900;margin:0">${fmt(estimateLow)} – ${fmt(estimateHigh)}</p>
          <p style="color:#fff;font-size:12px;margin:8px 0 0">Final price confirmed after free on-site measurement</p>
        </div>

        <p style="font-size:14px;color:#666">The next step is to schedule a <strong>free on-site visit</strong> so we can measure everything precisely and give you an exact quote.</p>

        <div style="text-align:center;margin:28px 0">
          <a href="https://calendly.com/federico-smoothfenceusa/30min"
             style="background:#679d38;color:#fff;padding:16px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block">
            📅 Schedule Your Free Site Visit
          </a>
        </div>

        <p style="font-size:14px;color:#666">Or call us directly: <a href="tel:+13864039460" style="color:#125036;font-weight:700">(386) 403-9460</a></p>

        <hr style="border:none;border-top:1px solid #b2cf7f;margin:24px 0">
        <p style="font-size:12px;color:#999;text-align:center">SmoothFenceUSA · Palm Coast, FL · info@smoothfenceusa.com</p>
      </div>
    </div>
  `;

  // ── Email to owner ───────────────────────────────────────
  const ownerHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#125036">
      <h2 style="background:#125036;color:#f8cf2b;padding:20px;border-radius:12px 12px 0 0;margin:0">
        🔔 New Estimator Lead
      </h2>
      <div style="background:#fff;padding:24px;border:1px solid #b2cf7f;border-radius:0 0 12px 12px">
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:8px;color:#666;width:40%">Name</td><td style="font-weight:700">${name}</td></tr>
          <tr style="background:#f8f8f8"><td style="padding:8px;color:#666">Phone</td><td style="font-weight:700"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px;color:#666">Email</td><td style="font-weight:700"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="background:#f8f8f8"><td style="padding:8px;color:#666">Zip Code</td><td style="font-weight:700">${zip}</td></tr>
          <tr><td style="padding:8px;color:#666">Material</td><td style="font-weight:700">${material}${premium ? " (Premium)" : ""}</td></tr>
          <tr style="background:#f8f8f8"><td style="padding:8px;color:#666">Height</td><td style="font-weight:700">${height}</td></tr>
          <tr><td style="padding:8px;color:#666">Linear Feet</td><td style="font-weight:700">${linearFeet} ft</td></tr>
          <tr style="background:#f8f8f8"><td style="padding:8px;color:#666">Gates</td><td style="font-weight:700">${gates}</td></tr>
          <tr><td style="padding:8px;color:#666">Old fence removal</td><td style="font-weight:700">${removal ? "Yes" : "No"}</td></tr>
          ${gclid || utm_source || utm_medium || utm_campaign ? `<tr style="background:#f0f0f0"><td style="padding:8px;color:#999" colspan="2"><small>Attribution: ${[gclid ? "gclid=" + gclid : "", utm_source ? "src=" + utm_source : "", utm_medium ? "med=" + utm_medium : "", utm_campaign ? "cmp=" + utm_campaign : ""].filter(Boolean).join(" · ")}</small></td></tr>` : ""}
          <tr style="background:#125036"><td colspan="2" style="padding:12px;text-align:center">
            <span style="color:#b2cf7f;font-size:12px">ESTIMATED RANGE</span><br>
            <span style="color:#f8cf2b;font-size:28px;font-weight:900">${fmt(estimateLow)} – ${fmt(estimateHigh)}</span>
          </td></tr>
        </table>
      </div>
    </div>
  `;

  // Send both emails in parallel
  await Promise.all([
    resend.emails.send({
      from: emailFrom,
      to: [email],
      subject: `Your SmoothFenceUSA Estimate: ${fmt(estimateLow)} – ${fmt(estimateHigh)}`,
      replyTo: leadsToEmail,
      html: clientHtml,
    }),
    resend.emails.send({
      from: emailFrom,
      to: [leadsToEmail],
      subject: `🔔 New Lead: ${name} — ${fmt(estimateLow)}–${fmt(estimateHigh)} (${material}, ${linearFeet} ft)`,
      replyTo: email,
      html: ownerHtml,
    }),
  ]);

  // Push to unified Google Sheets CRM
  await pushLeadEvent({
    type: "estimate_sent",
    source: "estimator",
    status: "new",
    fullName: name,
    phone,
    email,
    zip,
    material,
    height,
    linearFeet,
    gates,
    removal,
    premium,
    estimateLow,
    estimateHigh,
    notes: `Estimator: ${material}${premium ? " (premium)" : ""}, ${height}, ${linearFeet} ft, ${gates} gate(s), removal: ${removal ? "yes" : "no"}`,
    gclid,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  });

  return NextResponse.json({ ok: true });
}
