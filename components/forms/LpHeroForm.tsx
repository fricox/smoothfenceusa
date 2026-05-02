"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAttribution } from "@/lib/attribution";
import { trackLead } from "@/lib/track";

/**
 * Hero-form for paid landing pages. Designed to convert.
 *
 * - 3 fields only: name, phone, ZIP. Email is optional and collapsed.
 * - Big primary submit button.
 * - Submits to /api/quote (same endpoint as QuickContactForm so the CRM
 *   pipeline already works).
 * - Fires GTM `lead_form_submit` + Google Ads conversion (`trackLeadConversion`).
 * - Receives `city` and `sourceSlug` so the lead is attributed to the right
 *   campaign / area in the Google Sheet + email.
 */
type Props = {
  city: string;
  sourceSlug: string;
};

export default function LpHeroForm({ city, sourceSlug }: Props) {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = {
    title: isEs ? `Cotizá tu cerca en ${city}` : `Get Your ${city} Fence Quote`,
    sub: isEs
      ? "Te respondemos el mismo día. Visita gratis en 24 horas."
      : "Same-day reply. Free site visit within 24 hours.",
    name: isEs ? "Nombre" : "Name",
    namePh: isEs ? "Tu nombre" : "Your name",
    phone: isEs ? "Teléfono" : "Phone",
    phonePh: "(386) 555-0123",
    zip: isEs ? "Código postal" : "ZIP code",
    zipPh: "32084",
    addEmail: isEs ? "+ Agregar correo (opcional)" : "+ Add email (optional)",
    emailLabel: isEs ? "Correo (opcional)" : "Email (optional)",
    emailPh: "you@example.com",
    submit: isEs ? "Cotizar gratis →" : "Get My Free Estimate →",
    sending: isEs ? "Enviando..." : "Sending...",
    ok: isEs
      ? "¡Listo! Te llamamos en menos de 24 horas."
      : "Thanks! We'll call you within 24 hours.",
    error: isEs
      ? "No se pudo enviar. Llamanos al (386) 403-9460."
      : "Couldn't send. Please call (386) 403-9460.",
    legal: isEs
      ? "Sin spam. Sin compromiso."
      : "No spam · No obligation",
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const attribution = getAttribution();
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email: email || "no-email@contact.smoothfenceusa.com",
          address: zip ? `ZIP ${zip}` : "",
          fenceType: "",
          linearFeet: "",
          hoa: "",
          preferredDate: "",
          message: `LP hero form — ${city} (${sourceSlug})`,
          ...attribution,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Network error");
      }

      trackLead("lp_hero", attribution, 50, {
        lp_slug: sourceSlug,
        lp_city: city,
      });

      setStatus("ok");
      setFullName("");
      setPhone("");
      setZip("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <div
      id="lp-form"
      className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-7"
    >
      <h2 className="text-xl font-extrabold text-brand-deep sm:text-2xl">
        {t.title}
      </h2>
      <p className="mt-1 text-sm text-brand-deep/70">{t.sub}</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
            {t.name}
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-brand-deep placeholder:text-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30"
            placeholder={t.namePh}
            autoComplete="name"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
              {t.phone}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-brand-deep placeholder:text-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              placeholder={t.phonePh}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
              {t.zip}
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-brand-deep placeholder:text-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              placeholder={t.zipPh}
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
            />
          </div>
        </div>

        {!showEmail ? (
          <button
            type="button"
            onClick={() => setShowEmail(true)}
            className="text-sm font-medium text-brand-green hover:underline"
          >
            {t.addEmail}
          </button>
        ) : (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-brand-deep placeholder:text-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              placeholder={t.emailPh}
              autoComplete="email"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-brand-yellow px-6 py-4 text-base font-extrabold text-brand-deep shadow-md transition-all hover:bg-amber-300 hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>

        <p className="text-center text-xs text-slate-500">{t.legal}</p>

        {status === "ok" && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            ✓ {t.ok}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ✗ {t.error}
            {errorMsg && (
              <span className="block text-xs font-normal opacity-70">{errorMsg}</span>
            )}
          </p>
        )}
      </form>
    </div>
  );
}
