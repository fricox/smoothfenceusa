"use client";

import Link from "next/link";
import CTA from "@/components/layout/CTA";
import QuickContactForm from "@/components/forms/QuickContactForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const t = {
    label: isEs ? "CONTÁCTANOS" : "GET IN TOUCH",
    heading: isEs ? "Hablemos de tu proyecto" : "Let's talk about your project",
    sub: isEs
      ? "La forma más rápida de avanzar es usar nuestro estimador — te damos un rango de precio al instante. Si solo quieres preguntar algo, déjanos un mensaje corto."
      : "The fastest way to move forward is our instant estimator — you'll get a price range in seconds. If you just want to ask something, drop us a short message.",
    primaryCtaTitle: isEs ? "Presupuesto instantáneo" : "Instant estimate",
    primaryCtaDesc: isEs
      ? "Responde 6 preguntas rápidas y recibe un estimado detallado por correo en menos de 2 minutos."
      : "Answer 6 quick questions and get a detailed estimate by email in under 2 minutes.",
    primaryCtaBtn: isEs ? "Abrir estimador →" : "Open estimator →",
    visitTitle: isEs ? "Agendar visita en sitio" : "Schedule a site visit",
    visitDesc: isEs
      ? "¿Prefieres que vayamos a tomar medidas en persona? Es gratis y sin compromiso."
      : "Rather have us come measure in person? It's free and no-obligation.",
    visitBtn: isEs ? "Reservar visita gratis →" : "Book free visit →",
    directContact: isEs ? "Contacto directo" : "Direct contact",
    callUs: isEs ? "Llámanos" : "Call us",
    emailUs: isEs ? "Escríbenos" : "Email us",
    hours: isEs ? "Horario" : "Hours",
    hoursVal: isEs ? "Lun–Sáb 8:00 AM – 6:00 PM" : "Mon–Sat 8:00 AM – 6:00 PM",
    area: isEs ? "Área de servicio" : "Service area",
    areaVal: "Palm Coast · Flagler · Volusia · St. Johns County, FL",
  };

  return (
    <>
      <main className="bg-brand-cream">
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 text-brand-deep sm:px-6 lg:pt-20">
          {/* Header */}
          <div className="mb-10 space-y-4 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
              {t.label}
            </p>
            <h1 className="text-3xl font-bold text-brand-deep sm:text-4xl">
              {t.heading}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-brand-deep/80 sm:text-lg lg:mx-0">
              {t.sub}
            </p>
          </div>

          {/* Primary CTAs — the real lead funnels */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/estimator"
              className="group relative overflow-hidden rounded-3xl bg-brand-deep p-6 text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl sm:p-8"
            >
              <div className="relative z-10">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-2xl">
                  ⚡
                </div>
                <h2 className="text-xl font-extrabold text-brand-yellow sm:text-2xl">
                  {t.primaryCtaTitle}
                </h2>
                <p className="mt-2 text-sm text-white/80">{t.primaryCtaDesc}</p>
                <p className="mt-4 text-sm font-bold text-brand-yellow group-hover:underline">
                  {t.primaryCtaBtn}
                </p>
              </div>
            </Link>

            <a
              href="https://calendly.com/federico-smoothfenceusa/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-brand-green p-6 text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl sm:p-8"
            >
              <div className="relative z-10">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
                  📅
                </div>
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                  {t.visitTitle}
                </h2>
                <p className="mt-2 text-sm text-white/90">{t.visitDesc}</p>
                <p className="mt-4 text-sm font-bold text-white group-hover:underline">
                  {t.visitBtn}
                </p>
              </div>
            </a>
          </div>

          {/* Short form + direct info */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <QuickContactForm />

            <aside className="space-y-6">
              {/* Direct contact card */}
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                  {t.directContact}
                </p>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-deep/50">{t.callUs}</p>
                    <a
                      href="tel:+13864039460"
                      className="text-lg font-extrabold text-brand-deep hover:text-brand-green"
                    >
                      (386) 403-9460
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-deep/50">{t.emailUs}</p>
                    <a
                      href="mailto:info@smoothfenceusa.com"
                      className="break-all font-semibold text-brand-deep hover:text-brand-green"
                    >
                      info@smoothfenceusa.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-deep/50">{t.hours}</p>
                    <p className="font-semibold text-brand-deep">{t.hoursVal}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-deep/50">{t.area}</p>
                    <p className="font-semibold text-brand-deep">{t.areaVal}</p>
                  </div>
                </div>
              </div>

              {/* Quick action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+13864039460"
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-deep"
                >
                  📞 {isEs ? "Llamar" : "Call"}
                </a>
                <a
                  href="sms:+13864039460"
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-deep shadow-sm transition-colors hover:bg-brand-light"
                >
                  💬 {isEs ? "Texto" : "Text"}
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <CTA />
    </>
  );
}
