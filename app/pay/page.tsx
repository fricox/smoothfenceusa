"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const DEPOSIT_OPTIONS = [
  { label: "$250", value: 250 },
  { label: "$500", value: 500 },
  { label: "$750", value: 750 },
  { label: "$1,000", value: 1000 },
];

export default function PayPage() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const [amount, setAmount]         = useState<string>("500");
  const [customAmt, setCustomAmt]   = useState(false);
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [description, setDesc]      = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const numAmount = Math.max(0, Number(amount) || 0);

  async function handlePay() {
    if (!name || !email || numAmount < 50) {
      setError(isEs ? "Por favor llena todos los campos. Monto mínimo $50." : "Please fill all fields. Minimum amount is $50.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          customerName: name,
          customerEmail: email,
          description: description || (isEs ? "Depósito - Instalación de Cerca" : "Fence Installation Deposit"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-deep py-14 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
          {isEs ? "Pago Seguro" : "Secure Payment"}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {isEs ? "Pagar Depósito" : "Pay Deposit"}
        </h1>
        <p className="mt-3 text-brand-cream/70 max-w-md mx-auto text-sm">
          {isEs
            ? "Asegura tu fecha de instalación con un depósito. 100% seguro vía Stripe."
            : "Secure your installation date with a deposit. 100% safe via Stripe."}
        </p>
      </section>

      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-brand-light p-8 space-y-7">

          {/* Amount selector */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
              {isEs ? "Monto del Depósito" : "Deposit Amount"}
            </p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {DEPOSIT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setAmount(String(opt.value)); setCustomAmt(false); }}
                  className={`rounded-2xl border-2 py-2.5 text-sm font-bold transition-all ${
                    !customAmt && numAmount === opt.value
                      ? "border-brand-deep bg-brand-deep text-white"
                      : "border-brand-light text-brand-deep hover:border-brand-green"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setCustomAmt(true); setAmount(""); }}
              className={`w-full rounded-2xl border-2 py-2.5 text-sm font-semibold transition-all ${
                customAmt
                  ? "border-brand-deep bg-brand-deep text-white"
                  : "border-brand-light text-brand-deep hover:border-brand-green"
              }`}
            >
              {isEs ? "Otro monto" : "Custom amount"}
            </button>
            {customAmt && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl font-bold text-brand-deep">$</span>
                <input
                  type="number"
                  min={50}
                  placeholder="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-lg font-bold text-brand-deep placeholder:text-brand-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                />
              </div>
            )}
          </div>

          {/* Customer info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">
                {isEs ? "Nombre completo" : "Full name"} *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-sm text-brand-deep placeholder:text-brand-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">
                {isEs ? "Correo electrónico" : "Email"} *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                className="w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-sm text-brand-deep placeholder:text-brand-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">
                {isEs ? "Nota (opcional)" : "Note (optional)"}
              </label>
              <input
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={isEs ? "Ej: Cerca vinyl 150ft Palm Coast" : "e.g. Vinyl fence 150ft Palm Coast"}
                className="w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-sm text-brand-deep placeholder:text-brand-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              />
            </div>
          </div>

          {/* Summary */}
          {numAmount >= 50 && (
            <div className="rounded-2xl bg-brand-deep/5 border border-brand-light px-5 py-4 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-deep">
                {isEs ? "Total a pagar" : "Total to pay"}
              </span>
              <span className="text-2xl font-extrabold text-brand-deep">
                ${numAmount.toLocaleString("en-US")}
              </span>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            onClick={handlePay}
            disabled={loading || numAmount < 50}
            className="w-full rounded-full bg-brand-yellow py-4 text-base font-bold text-brand-deep shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50"
          >
            {loading
              ? (isEs ? "Redirigiendo..." : "Redirecting...")
              : (isEs ? `Pagar $${numAmount.toLocaleString("en-US")} →` : `Pay $${numAmount.toLocaleString("en-US")} →`)}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-brand-deep/50">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-brand-green">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
              {isEs ? "Pago 100% seguro" : "100% secure payment"}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-deep/50">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-brand-green">
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
              </svg>
              {isEs ? "Procesado por Stripe" : "Powered by Stripe"}
            </div>
          </div>

          <p className="text-center text-xs text-brand-deep/40">
            {isEs
              ? "Al pagar aceptas nuestros términos de servicio. El depósito se aplica al total del proyecto."
              : "By paying you agree to our terms of service. Deposit is applied to your project total."}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/contact" className="text-sm text-brand-deep/50 hover:text-brand-deep transition-colors">
            {isEs ? "¿Preguntas? Contáctanos →" : "Questions? Contact us →"}
          </Link>
        </div>
      </div>
    </main>
  );
}
