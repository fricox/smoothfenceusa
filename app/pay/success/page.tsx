"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PaySuccessPage() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl ring-1 ring-brand-light p-10 max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-2xl font-extrabold text-brand-deep">
          {isEs ? "¡Pago Recibido!" : "Payment Received!"}
        </h1>
        <p className="text-brand-deep/70">
          {isEs
            ? "Gracias por tu depósito. Recibirás una confirmación por correo en breve. Nuestro equipo se pondrá en contacto contigo para coordinar la instalación."
            : "Thank you for your deposit. You'll receive a confirmation email shortly. Our team will reach out to coordinate your installation."}
        </p>

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
            href="https://calendly.com/federico-smoothfenceusa/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-brand-deep py-3 text-sm font-bold text-white transition-all hover:bg-brand-green"
          >
            {isEs ? "📅 Agendar visita de instalación" : "📅 Schedule installation visit"}
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
