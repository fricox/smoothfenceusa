"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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

function SuccessContent() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const earliest = addBusinessDays(new Date(), 5);
  const earliestStr = earliest.toLocaleDateString(isEs ? "es-US" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const calendlyUrl = "https://calendly.com/federico-smoothfenceusa/installation";

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl ring-1 ring-brand-light p-10 max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-2xl font-extrabold text-brand-deep">
          {isEs ? "¡Pago Recibido!" : "Payment Received!"}
        </h1>
        <p className="text-brand-deep/70">
          {isEs
            ? "Gracias por tu depósito. Recibirás una confirmación por correo en breve."
            : "Thank you for your deposit. You'll receive a confirmation email shortly."}
        </p>

        {/* Earliest installation date */}
        <div className="rounded-2xl bg-brand-deep p-5 text-white">
          <p className="text-xs uppercase tracking-widest text-brand-yellow font-bold mb-2">
            {isEs ? "📅 Próximo paso: Agendar instalación" : "📅 Next step: Schedule installation"}
          </p>
          <p className="text-sm text-white/80 mb-1">
            {isEs
              ? "La instalación puede agendarse a partir del:"
              : "Installation can be scheduled starting:"}
          </p>
          <p className="text-lg font-extrabold text-brand-yellow">
            {earliestStr}
          </p>
          <p className="text-[11px] text-white/60 mt-2">
            {isEs
              ? "Tiempo mínimo de 5 días hábiles para preparar materiales y permisos."
              : "Minimum 5 business days required to prepare materials and permits."}
          </p>
        </div>

        <div className="rounded-2xl bg-brand-green/10 border border-brand-light p-4">
          <p className="text-sm font-semibold text-brand-deep">
            {isEs ? "¿Tienes preguntas?" : "Have questions?"}
          </p>
          <a href="tel:+13864039460" className="text-brand-green font-bold hover:underline">
            (386) 403-9460
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-brand-yellow py-4 text-sm font-bold text-brand-deep shadow-lg transition-all hover:scale-105"
          >
            {isEs ? "📅 Agendar instalación ahora" : "📅 Schedule installation now"}
          </a>
          <Link
            href="/"
            className="w-full rounded-full border border-brand-light py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-cream"
          >
            {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaySuccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-brand-cream" />}>
      <SuccessContent />
    </Suspense>
  );
}
