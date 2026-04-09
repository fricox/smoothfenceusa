import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Add N business days to a date (skips Sat/Sun)
function addBusinessDays(start: Date, days: number): Date {
  const d = new Date(start);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown";
    console.error("Webhook verification failed:", msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerName  = session.metadata?.customerName || session.customer_details?.name || "Customer";
    const customerEmail = session.customer_email || session.customer_details?.email || "";
    const description   = session.metadata?.description || "Fence Installation Deposit";
    const amount        = (session.amount_total || 0) / 100;
    const paidAt        = new Date().toISOString();
    const sessionId     = session.id;

    // Earliest installation date: 5 business days after payment
    const earliestDate = addBusinessDays(new Date(), 5);
    const earliestStr  = earliestDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Prefilled Calendly link
    const calendlyUrl = `https://calendly.com/federico-smoothfenceusa/installation?${new URLSearchParams({
      name: customerName,
      email: customerEmail,
    }).toString()}`;

    // ── Send emails via Resend ────────────────────────────────
    const resendApiKey = process.env.RESEND_API_KEY;
    const leadsToEmail = process.env.LEADS_TO_EMAIL;
    const emailFrom    = process.env.EMAIL_FROM;

    if (resendApiKey && leadsToEmail && emailFrom && customerEmail) {
      const resend = new Resend(resendApiKey);

      // Email to customer
      const clientHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#125036">
          <div style="background:#125036;padding:32px;text-align:center;border-radius:16px 16px 0 0">
            <h1 style="color:#f8cf2b;margin:0;font-size:28px">SmoothFenceUSA</h1>
            <p style="color:#fff;margin:8px 0 0;font-size:14px">Payment Confirmation</p>
          </div>
          <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px;border:1px solid #b2cf7f">
            <div style="text-align:center;font-size:48px;margin-bottom:8px">✅</div>
            <h2 style="color:#125036;text-align:center;margin:0 0 8px">Payment Received</h2>
            <p style="text-align:center;color:#666;margin:0 0 24px">Thank you for your deposit, ${customerName}!</p>

            <div style="background:#125036;border-radius:12px;padding:28px;text-align:center;margin:20px 0">
              <p style="color:#b2cf7f;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:2px">Amount Paid</p>
              <p style="color:#f8cf2b;font-size:42px;font-weight:900;margin:0">${fmt(amount)}</p>
              <p style="color:#fff;font-size:12px;margin:8px 0 0">${description}</p>
            </div>

            <div style="background:#fbfcf9;border:1px solid #b2cf7f;border-radius:12px;padding:20px;margin:20px 0">
              <h3 style="margin:0 0 12px;font-size:14px;color:#125036;text-transform:uppercase;letter-spacing:1px">Receipt Details</h3>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:6px 0;color:#666">Date</td><td style="font-weight:600;text-align:right">${new Date(paidAt).toLocaleDateString("en-US", { dateStyle: "long" })}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Transaction ID</td><td style="font-weight:600;text-align:right;font-family:monospace;font-size:11px">${sessionId.slice(-16)}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Payment Method</td><td style="font-weight:600;text-align:right">Card</td></tr>
              </table>
            </div>

            <p style="font-size:14px;color:#666">Your deposit secures your spot on our installation schedule. The next step is to pick your installation date.</p>

            <div style="background:#fbfcf9;border:2px solid #f8cf2b;border-radius:12px;padding:20px;margin:20px 0;text-align:center">
              <p style="margin:0;font-size:12px;color:#125036;text-transform:uppercase;letter-spacing:2px;font-weight:700">📅 Earliest Installation Date</p>
              <p style="margin:8px 0 4px;font-size:20px;font-weight:900;color:#125036">${earliestStr}</p>
              <p style="margin:0;font-size:12px;color:#666">Minimum 5 business days required to prepare materials and permits</p>
            </div>

            <div style="text-align:center;margin:28px 0">
              <a href="${calendlyUrl}"
                 style="background:#679d38;color:#fff;padding:16px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block">
                📅 Schedule Your Installation
              </a>
            </div>

            <p style="font-size:14px;color:#666;text-align:center">Questions? Call us at <a href="tel:+13864039460" style="color:#125036;font-weight:700">(386) 403-9460</a></p>

            <hr style="border:none;border-top:1px solid #b2cf7f;margin:24px 0">
            <p style="font-size:12px;color:#999;text-align:center">SmoothFenceUSA · Palm Coast, FL · info@smoothfenceusa.com</p>
          </div>
        </div>
      `;

      // Email to owner
      const ownerHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#125036">
          <h2 style="background:#125036;color:#f8cf2b;padding:20px;border-radius:12px 12px 0 0;margin:0">
            💰 Payment Received — ${fmt(amount)}
          </h2>
          <div style="background:#fff;padding:24px;border:1px solid #b2cf7f;border-radius:0 0 12px 12px">
            <div style="background:#679d38;color:#fff;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px">
              <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px">Deposit Paid</p>
              <p style="margin:4px 0 0;font-size:36px;font-weight:900">${fmt(amount)}</p>
            </div>
            <table style="width:100%;font-size:14px;border-collapse:collapse">
              <tr><td style="padding:8px;color:#666;width:40%">Customer</td><td style="font-weight:700">${customerName}</td></tr>
              <tr style="background:#f8f8f8"><td style="padding:8px;color:#666">Email</td><td style="font-weight:700"><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
              <tr><td style="padding:8px;color:#666">Description</td><td style="font-weight:700">${description}</td></tr>
              <tr style="background:#f8f8f8"><td style="padding:8px;color:#666">Date</td><td style="font-weight:700">${new Date(paidAt).toLocaleString("en-US")}</td></tr>
              <tr><td style="padding:8px;color:#666">Stripe Session</td><td style="font-weight:700;font-family:monospace;font-size:11px">${sessionId}</td></tr>
              <tr style="background:#f8cf2b"><td style="padding:12px 8px;color:#125036;font-weight:700">📅 Earliest Install</td><td style="padding:12px 8px;font-weight:900;color:#125036">${earliestStr}</td></tr>
            </table>
            <p style="font-size:12px;color:#666;margin-top:12px;text-align:center">Client will receive a Calendly link to book installation on or after the date above.</p>
            <div style="text-align:center;margin-top:20px">
              <a href="https://dashboard.stripe.com/payments" style="background:#125036;color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block">View in Stripe</a>
            </div>
          </div>
        </div>
      `;

      try {
        await Promise.all([
          resend.emails.send({
            from: emailFrom,
            to: [customerEmail],
            subject: `Payment Confirmation: ${fmt(amount)} — SmoothFenceUSA`,
            replyTo: leadsToEmail,
            html: clientHtml,
          }),
          resend.emails.send({
            from: emailFrom,
            to: [leadsToEmail],
            subject: `💰 Payment Received: ${customerName} — ${fmt(amount)}`,
            replyTo: customerEmail,
            html: ownerHtml,
          }),
        ]);
      } catch (err) {
        console.error("Email send error:", err);
      }
    }

    // ── Log to Google Sheets ─────────────────────────────────
    const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhook) {
      fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "payment",
          submittedAt: paidAt,
          fullName: customerName,
          email: customerEmail,
          phone: session.customer_details?.phone || "",
          address: "",
          fenceType: "",
          linearFeet: "",
          hoa: "",
          preferredDate: "",
          message: `💰 DEPOSIT PAID: ${fmt(amount)} — ${description} — Stripe: ${sessionId}`,
        }),
      }).catch((err) => console.error("Sheets webhook error:", err));
    }
  }

  return NextResponse.json({ received: true });
}
