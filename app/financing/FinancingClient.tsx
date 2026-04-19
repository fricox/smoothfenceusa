"use client";

import Link from "next/link";
import CTA from "@/components/layout/CTA";
import { useLanguage } from "@/contexts/LanguageContext";

/* ──────────────────────────────────────────────
   Constants — no magic values
   ────────────────────────────────────────────── */
const PHONE = "(386) 403-9460";
const PHONE_HREF = "tel:+13864039460";

// Monthly payment examples assume 12-month 0% APR on a $5,000 project
const EXAMPLE_PROJECT = 5_000;
const EXAMPLE_MONTHLY = 417;

const PROVIDERS = [
  {
    id: "hearth",
    name: "GetHearth",
    logoColor: "bg-emerald-600",
    tagEn: "Home Improvement Financing",
    tagEs: "Financiamiento para Mejoras del Hogar",
    descEn:
      "Purpose-built for fence and home improvement projects. Offers long-term financing up to 12 years with competitive APR. Prequalify with a soft credit check — no impact to your score.",
    descEs:
      "Diseñado para proyectos de cercas y mejoras del hogar. Ofrece financiamiento a largo plazo hasta 12 años con APR competitivo. Precalifique con un chequeo suave — sin impacto a su crédito.",
    highlights: {
      en: ["Up to $100K", "Terms 2–12 years", "Soft credit check", "Apply in 2 min"],
      es: ["Hasta $100K", "Plazos 2–12 años", "Chequeo suave", "Aplica en 2 min"],
    },
    ctaEn: "Apply with GetHearth",
    ctaEs: "Aplicar con GetHearth",
    // Merchant-specific Hearth Financing prequalify URL (Smooth Fence USA / Federico).
    // Activated 2026-04-19 after Hearth account approval. Replaces prior "#hearth" placeholder.
    url: "https://app.gethearth.com/partners/smooth-fence-usa/federico/apply?utm_source=smoothfenceusa&utm_medium=website&utm_campaign=financing_page",
    bestFor: "best",
  },
  {
    id: "affirm",
    name: "Affirm",
    logoColor: "bg-blue-600",
    tagEn: "Pay Over Time",
    tagEs: "Paga a Plazos",
    descEn:
      "Split your deposit or full project cost into fixed monthly payments. Choose 3, 6, or 12-month plans. Available at checkout when you pay online.",
    descEs:
      "Divida su depósito o costo total en pagos mensuales fijos. Elija planes de 3, 6 o 12 meses. Disponible al pagar en línea.",
    highlights: {
      en: ["3–12 months", "Fixed payments", "At checkout", "Quick approval"],
      es: ["3–12 meses", "Pagos fijos", "Al pagar", "Aprobación rápida"],
    },
    ctaEn: "Available at Checkout",
    ctaEs: "Disponible al Pagar",
    url: "/pay",
    bestFor: "deposits",
  },
  {
    id: "afterpay",
    name: "Afterpay",
    logoColor: "bg-teal-500",
    tagEn: "Buy Now, Pay Later",
    tagEs: "Compra Ahora, Paga Después",
    descEn:
      "Split your payment into 4 interest-free installments over 6 weeks. Great for deposits and smaller payments. No interest, no fees when you pay on time.",
    descEs:
      "Divida su pago en 4 cuotas sin interés durante 6 semanas. Ideal para depósitos y pagos menores. Sin intereses ni cargos al pagar a tiempo.",
    highlights: {
      en: ["4 payments", "0% interest", "6 weeks", "No fees"],
      es: ["4 pagos", "0% interés", "6 semanas", "Sin cargos"],
    },
    ctaEn: "Available at Checkout",
    ctaEs: "Disponible al Pagar",
    url: "/pay",
    bestFor: "deposits",
  },
  {
    id: "klarna",
    name: "Klarna",
    logoColor: "bg-pink-500",
    tagEn: "Flexible Payments",
    tagEs: "Pagos Flexibles",
    descEn:
      "Choose to pay in 4 interest-free installments, or finance over 6–36 months. Smooth checkout experience with instant approval.",
    descEs:
      "Elija pagar en 4 cuotas sin interés, o financiar de 6 a 36 meses. Experiencia de pago fluida con aprobación instantánea.",
    highlights: {
      en: ["4 installments", "Or 6–36 months", "Instant approval", "Flexible"],
      es: ["4 cuotas", "O 6–36 meses", "Aprobación instantánea", "Flexible"],
    },
    ctaEn: "Available at Checkout",
    ctaEs: "Disponible al Pagar",
    url: "/pay",
    bestFor: "deposits",
  },
] as const;

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function FinancingClient() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const t = {
    label: isEs ? "FINANCIAMIENTO" : "FINANCING",
    heading: isEs
      ? "Tu cerca nueva, con pagos mensuales"
      : "Your new fence, with monthly payments",
    sub: isEs
      ? `No dejes que el costo total te detenga. Un proyecto de $${EXAMPLE_PROJECT.toLocaleString()} puede ser tan solo ~$${EXAMPLE_MONTHLY}/mes. Múltiples opciones de financiamiento disponibles.`
      : `Don't let the total cost hold you back. A $${EXAMPLE_PROJECT.toLocaleString()} project can be as low as ~$${EXAMPLE_MONTHLY}/mo. Multiple financing options available.`,
    recommended: isEs ? "Recomendado" : "Recommended",
    forDeposits: isEs ? "Para depósitos" : "For deposits",
    howTitle: isEs ? "¿Cómo funciona?" : "How does it work?",
    steps: isEs
      ? [
          { n: "1", title: "Elige tu cerca", desc: "Usa nuestro estimador o agenda una visita gratuita para obtener tu cotización." },
          { n: "2", title: "Selecciona financiamiento", desc: "Elige la opción que mejor se adapte a tu presupuesto. Precalifica en minutos." },
          { n: "3", title: "Disfruta tu cerca", desc: "Instalamos tu cerca y tú pagas cómodamente en cuotas mensuales." },
        ]
      : [
          { n: "1", title: "Choose your fence", desc: "Use our estimator or schedule a free visit to get your quote." },
          { n: "2", title: "Select financing", desc: "Pick the option that fits your budget. Prequalify in minutes." },
          { n: "3", title: "Enjoy your fence", desc: "We install your fence and you pay comfortably in monthly installments." },
        ],
    questionsTitle: isEs ? "¿Preguntas sobre financiamiento?" : "Questions about financing?",
    questionsDesc: isEs
      ? "Llámanos y te ayudamos a elegir la mejor opción para tu proyecto."
      : "Call us and we'll help you choose the best option for your project.",
    callBtn: isEs ? "Llamar ahora" : "Call now",
    estimateBtn: isEs ? "Obtener estimado gratis" : "Get free estimate",
  };

  return (
    <>
      <main className="bg-brand-cream">
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:pt-20">
          {/* Header */}
          <div className="mb-12 space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
              {t.label}
            </p>
            <h1 className="text-3xl font-bold text-brand-deep sm:text-4xl lg:text-5xl">
              {t.heading}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-brand-deep/80 sm:text-lg">
              {t.sub}
            </p>
          </div>

          {/* Provider cards */}
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {PROVIDERS.map((p) => (
              <div
                key={p.id}
                className={`relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-light transition-shadow hover:shadow-md sm:p-8 ${
                  p.bestFor === "best" ? "ring-2 ring-brand-green" : ""
                }`}
              >
                {/* Badge */}
                {p.bestFor === "best" && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-green px-3 py-1 text-xs font-bold text-white">
                    {t.recommended}
                  </span>
                )}

                {/* Provider header */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.logoColor} text-sm font-bold text-white`}
                  >
                    {p.name[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-brand-deep">{p.name}</h2>
                    <p className="text-xs text-brand-deep/60">
                      {isEs ? p.tagEs : p.tagEn}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-brand-deep/70">
                  {isEs ? p.descEs : p.descEn}
                </p>

                {/* Highlights */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {(isEs ? p.highlights.es : p.highlights.en).map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-brand-light/50 px-3 py-1 text-xs font-semibold text-brand-deep"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* CTA — external links (Hearth) open in new tab; internal links use Next Link. */}
                {p.url.startsWith("http") ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full bg-brand-green px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                  >
                    {isEs ? p.ctaEs : p.ctaEn} →
                  </a>
                ) : (
                  <Link
                    href={p.url}
                    className="block w-full rounded-full bg-brand-deep px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-green"
                  >
                    {isEs ? p.ctaEs : p.ctaEn}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-brand-deep">
              {t.howTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {t.steps.map((step) => (
                <div key={step.n} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white">
                    {step.n}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-deep">{step.title}</h3>
                  <p className="text-sm text-brand-deep/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions CTA */}
          <div className="rounded-3xl bg-brand-deep p-8 text-center text-white sm:p-12">
            <h2 className="mb-3 text-2xl font-bold">{t.questionsTitle}</h2>
            <p className="mb-6 text-white/80">{t.questionsDesc}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-deep transition-colors hover:bg-brand-light"
              >
                📞 {t.callBtn} — {PHONE}
              </a>
              <Link
                href="/estimator"
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
              >
                {t.estimateBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <CTA />
    </>
  );
}
