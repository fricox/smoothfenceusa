import { NextResponse } from "next/server";
import { Resend } from "resend";
import { pushLeadEvent } from "@/lib/sheets";

type QuotePayload = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  fenceType: string;
  linearFeet?: string;
  hoa: string;
  preferredDate?: string;
  message: string;
  // Attribution (Track A) — all optional
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

type FieldErrors = Partial<Record<keyof QuotePayload, string>>;

export const runtime = "nodejs";

// Minimal required fields: the new short contact form only collects name,
// phone and message. Everything else is optional so the legacy long form
// keeps working for backward compatibility.
const requiredFields: Array<keyof QuotePayload> = [
  "fullName",
  "phone",
  "message",
];

const templateLine = (label: string, value?: string) =>
  value ? `<p><strong>${label}:</strong> ${value}</p>` : "";

const templateLineText = (label: string, value?: string) =>
  value ? `${label}: ${value}` : "";

export async function POST(request: Request) {
  let payload: QuotePayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const fieldErrors: FieldErrors = {};

  for (const field of requiredFields) {
    const value = payload[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      fieldErrors[field] = "This field is required.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        details: fieldErrors,
      },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const leadsToEmail = process.env.LEADS_TO_EMAIL;
  const emailFrom = process.env.EMAIL_FROM;

  if (!resendApiKey || !leadsToEmail || !emailFrom) {
    console.error("Missing email configuration");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured correctly." },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);
  const subject = `Nueva solicitud de cotización - ${payload.fullName}`;

  const textBody = [
    "Detalles del prospecto:",
    templateLineText("Nombre Completo", payload.fullName),
    templateLineText("Teléfono", payload.phone),
    templateLineText("Correo", payload.email),
    templateLineText("Dirección", payload.address),
    templateLineText("Tipo de Cerca", payload.fenceType),
    templateLineText("Pies lineales", payload.linearFeet),
    templateLineText("HOA", payload.hoa),
    templateLineText("Fecha preferida", payload.preferredDate),
    "",
    "Mensaje:",
    payload.message,
    "",
    "--- Attribution ---",
    templateLineText("gclid", payload.gclid),
    templateLineText("utm_source", payload.utm_source),
    templateLineText("utm_medium", payload.utm_medium),
    templateLineText("utm_campaign", payload.utm_campaign),
    templateLineText("utm_term", payload.utm_term),
    templateLineText("utm_content", payload.utm_content),
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div>
      <h2>Solicitud de cotización</h2>
      ${templateLine("Nombre Completo", payload.fullName)}
      ${templateLine("Teléfono", payload.phone)}
      ${templateLine("Correo", payload.email)}
      ${templateLine("Dirección", payload.address)}
      ${templateLine("Tipo de Cerca", payload.fenceType)}
      ${templateLine("Pies lineales", payload.linearFeet)}
      ${templateLine("HOA", payload.hoa)}
      ${templateLine("Fecha preferida", payload.preferredDate)}
      <p><strong>Mensaje:</strong></p>
      <p>${payload.message}</p>
      <hr>
      <p style="color:#999;font-size:12px"><strong>Attribution</strong></p>
      ${templateLine("gclid", payload.gclid)}
      ${templateLine("utm_source", payload.utm_source)}
      ${templateLine("utm_medium", payload.utm_medium)}
      ${templateLine("utm_campaign", payload.utm_campaign)}
      ${templateLine("utm_term", payload.utm_term)}
      ${templateLine("utm_content", payload.utm_content)}
    </div>
  `;

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: [leadsToEmail],
    subject,
    replyTo: payload.email,
    text: textBody,
    html: htmlBody,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el correo." },
      { status: 502 }
    );
  }

  // ── Save lead to unified Google Sheets CRM ──
  await pushLeadEvent({
    type: "lead_created",
    source: "contact",
    status: "new",
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    address: payload.address,
    material: payload.fenceType,
    linearFeet: payload.linearFeet,
    hoa: payload.hoa,
    preferredDate: payload.preferredDate,
    message: payload.message,
    gclid: payload.gclid,
    utm_source: payload.utm_source,
    utm_medium: payload.utm_medium,
    utm_campaign: payload.utm_campaign,
    utm_term: payload.utm_term,
    utm_content: payload.utm_content,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}


