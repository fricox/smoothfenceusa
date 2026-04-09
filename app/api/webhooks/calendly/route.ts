import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { pushLeadEvent, type LeadStatus, type LeadEventType } from "@/lib/sheets";

export const runtime = "nodejs";

/**
 * Calendly webhook receiver.
 *
 * Events handled:
 *   - invitee.created  → visit/install booked
 *   - invitee.canceled → visit/install canceled
 *
 * We look at the event's slug ("installation" vs anything else) to decide
 * whether it's a site-visit or an actual installation booking, so we can push
 * the right status ("visit_scheduled" vs "install_scheduled") to the Sheet.
 *
 * Signature verification: Calendly signs the webhook with the signing key
 * you configured. We accept the request if the HMAC matches, OR if no signing
 * key is configured in env (useful during local testing). See SETUP_CRM.md.
 */

interface CalendlyPayload {
  event: string;
  created_at: string;
  payload: {
    email?: string;
    name?: string;
    scheduled_event?: {
      uri?: string;
      name?: string;
      start_time?: string;
      end_time?: string;
      event_type?: string;
    };
    event_type?: {
      slug?: string;
      name?: string;
    };
    questions_and_answers?: Array<{ question: string; answer: string }>;
    text_reminder_number?: string;
    cancel_url?: string;
    reschedule_url?: string;
  };
}

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) return true; // allow unsigned if not configured
  if (!signatureHeader) return false;

  // Calendly header format: "t=1234567890,v1=abcdef..."
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => {
      const [k, v] = p.split("=");
      return [k?.trim(), v?.trim()];
    })
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;

  const data = `${t}.${rawBody}`;
  const expected = crypto.createHmac("sha256", signingKey).update(data).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(v1, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

function findAnswer(qa: Array<{ question: string; answer: string }> | undefined, needle: string): string {
  if (!qa) return "";
  const hit = qa.find((q) => q.question.toLowerCase().includes(needle.toLowerCase()));
  return hit?.answer || "";
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("calendly-webhook-signature");

  if (!verifySignature(raw, sig)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: CalendlyPayload;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const p = body.payload || {};
  const name  = p.name || "";
  const email = (p.email || "").toLowerCase();
  const phone = p.text_reminder_number || "";
  const scheduledStart = p.scheduled_event?.start_time || "";
  const slug = p.event_type?.slug || p.scheduled_event?.name || "";
  const isInstall = slug.toLowerCase().includes("install");

  // Map custom question answers into our schema where possible
  const address   = findAnswer(p.questions_and_answers, "address") || findAnswer(p.questions_and_answers, "dirección");
  const linearFt  = findAnswer(p.questions_and_answers, "linear feet") || findAnswer(p.questions_and_answers, "linear");
  const gates     = findAnswer(p.questions_and_answers, "gate");
  const material  = findAnswer(p.questions_and_answers, "material") || findAnswer(p.questions_and_answers, "type of fence");
  const notes     = findAnswer(p.questions_and_answers, "note") || findAnswer(p.questions_and_answers, "comment");

  let type: LeadEventType;
  let status: LeadStatus;

  if (body.event === "invitee.created") {
    type = isInstall ? "install_booked" : "visit_booked";
    status = isInstall ? "install_scheduled" : "visit_scheduled";
  } else if (body.event === "invitee.canceled") {
    type = isInstall ? "install_canceled" : "visit_canceled";
    status = "canceled";
  } else {
    return NextResponse.json({ received: true, ignored: body.event });
  }

  pushLeadEvent({
    type,
    source: "calendly",
    status,
    fullName: name,
    email,
    phone,
    address,
    material,
    linearFeet: linearFt,
    gates,
    visitDate: !isInstall ? scheduledStart : undefined,
    installDate: isInstall ? scheduledStart : undefined,
    notes: `Calendly ${body.event} — ${slug} — ${scheduledStart}${notes ? ` — ${notes}` : ""}`,
  });

  return NextResponse.json({ received: true });
}
