"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Tiny pre-estimator form for people who have a quick question.
 * Only 3 fields: name, phone, and what they want to know.
 * The real lead capture is the estimator — this form is a safety net.
 */
export default function QuickContactForm() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = {
    title: isEs ? "¿Tienes una pregunta rápida?" : "Have a quick question?",
    sub: isEs
      ? "Déjanos tu mensaje y te respondemos el mismo día. Si ya sabes lo que necesitas, usa el estimador — es más rápido."
      : "Drop us a line and we'll reply the same day. If you already know what you need, use the estimator — it's faster.",
    name: isEs ? "Nombre" : "Name",
    phone: isEs ? "Teléfono" : "Phone",
    email: isEs ? "Correo (opcional)" : "Email (optional)",
    message: isEs ? "¿En qué te podemos ayudar?" : "How can we help?",
    submit: isEs ? "Enviar pregunta" : "Send question",
    sending: isEs ? "Enviando..." : "Sending...",
    ok: isEs ? "¡Recibido! Te contactamos pronto." : "Got it! We'll reach out shortly.",
    error: isEs ? "No se pudo enviar. Llámanos directo." : "Couldn't send. Please call us directly.",
    useEstimator: isEs ? "¿Listo para un estimado?" : "Ready for an estimate?",
    goEstimator: isEs ? "Usa el estimador →" : "Use the estimator →",
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email: email || "no-email@contact.smoothfenceusa.com",
          address: "",
          fenceType: "",
          linearFeet: "",
          hoa: "",
          preferredDate: "",
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Network error");
      }

      setStatus("ok");
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-light sm:p-8">
      <h2 className="text-xl font-extrabold text-brand-deep sm:text-2xl">{t.title}</h2>
      <p className="mt-2 text-sm text-brand-deep/70">{t.sub}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
            {t.name}
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-brand-deep placeholder:text-brand-deep/40 focus:border-brand-green focus:outline-none"
            placeholder={isEs ? "Tu nombre" : "Your name"}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
              {t.phone}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-brand-deep placeholder:text-brand-deep/40 focus:border-brand-green focus:outline-none"
              placeholder="(386) 555-0123"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-brand-deep placeholder:text-brand-deep/40 focus:border-brand-green focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-deep/70">
            {t.message}
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-brand-deep placeholder:text-brand-deep/40 focus:border-brand-green focus:outline-none"
            placeholder={
              isEs
                ? "Ej: ¿Trabajan en mi zona? ¿Cuánto cuesta una puerta extra?"
                : "e.g. Do you work in my area? What does an extra gate cost?"
            }
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-brand-deep px-6 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-green disabled:opacity-50"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>

        {status === "ok" && (
          <p className="rounded-xl bg-brand-green/10 px-4 py-3 text-sm font-semibold text-brand-green">
            ✓ {t.ok}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ✗ {t.error}
            {errorMsg && <span className="block text-xs font-normal opacity-70">{errorMsg}</span>}
          </p>
        )}
      </form>

      <div className="mt-6 border-t border-brand-light pt-6 text-center">
        <p className="text-sm text-brand-deep/70">{t.useEstimator}</p>
        <Link
          href="/estimator"
          className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:underline"
        >
          {t.goEstimator}
        </Link>
      </div>
    </div>
  );
}
