"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAttribution } from "@/lib/attribution";
import { trackLeadConversion } from "@/lib/gtag";
import { trackClickToContact } from "@/lib/track-click";

/* ── Pricing data ─────────────────────────────────────────── */
const MATERIALS = [
  { id: "vinyl",     label: "PVC / Vinyl",  low: 26, high: 45 },
  { id: "wood",      label: "Wood",         low: 20, high: 35 },
  { id: "aluminum",  label: "Aluminum",     low: 30, high: 50 },
  { id: "chainlink", label: "Chain-Link",   low: 15, high: 25 },
];

const HEIGHTS = [
  { value: 4, label: "4 ft", multiplier: 0.85 },
  { value: 5, label: "5 ft", multiplier: 1.0 },
  { value: 6, label: "6 ft", multiplier: 1.2 },
];

const GATE_COST = { low: 250, high: 450 };
const REMOVAL_COST_PER_FT = { low: 3, high: 7 };
const PREMIUM_MULTIPLIER = 1.2;

function calcRange(
  materialId: string,
  height: number,
  linearFeet: number,
  gates: number,
  removal: boolean,
  premium: boolean
) {
  const mat = MATERIALS.find((m) => m.id === materialId);
  const ht = HEIGHTS.find((h) => h.value === height);
  if (!mat || !ht || linearFeet <= 0) return null;

  let low = mat.low * ht.multiplier * linearFeet;
  let high = mat.high * ht.multiplier * linearFeet;

  if (premium) { low *= PREMIUM_MULTIPLIER; high *= PREMIUM_MULTIPLIER; }
  if (removal) { low += REMOVAL_COST_PER_FT.low * linearFeet; high += REMOVAL_COST_PER_FT.high * linearFeet; }
  low  += gates * GATE_COST.low;
  high += gates * GATE_COST.high;

  return { low: Math.round(low), high: Math.round(high) };
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* ── Component ────────────────────────────────────────────── */
export default function EstimatorClient({ inline = false }: { inline?: boolean }) {
  const { tr, lang } = useLanguage();
  const e = tr.estimator;

  /* Step 1 state */
  const [material,    setMaterial]    = useState("vinyl");
  const [height,      setHeight]      = useState(6);
  const [linearFeet,  setLinearFeet]  = useState<string>("150");
  const [gates,       setGates]       = useState<string>("1");
  const [removal,     setRemoval]     = useState(false);
  const [premium,     setPremium]     = useState(false);

  /* Step 2 state */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip,   setZip]   = useState("");
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState("");

  const feetNum = Math.max(0, Number(linearFeet) || 0);
  const gatesNum = Math.max(0, Number(gates) || 0);
  const estimate = calcRange(material, height, feetNum, gatesNum, removal, premium);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !email || !zip) { setError("Please fill in all fields."); return; }
    setSending(true);
    setError("");
    try {
      const attribution = getAttribution();
      const res = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, zip,
          material: MATERIALS.find(m => m.id === material)?.label,
          height: `${height} ft`,
          linearFeet: feetNum,
          gates: gatesNum,
          removal,
          premium,
          estimateLow:  estimate?.low,
          estimateHigh: estimate?.high,
          ...attribution,
        }),
      });
      if (!res.ok) throw new Error("Server error");

      // Push GTM dataLayer event for conversion tracking
      if (typeof window !== "undefined") {
        const w = window as unknown as Record<string, unknown[]>;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: "lead_form_submit", form_type: "estimator", estimate_low: estimate?.low, estimate_high: estimate?.high, ...attribution });
      }
      trackLeadConversion();

      setStep(3);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const cards = (
    <div>

        {/* ── STEP 1: Project Details ── */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl ring-1 ring-brand-light p-8 space-y-8">

            {/* Header */}
            {inline && (
              <div className="text-center border-b border-brand-light pb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-2">{e.tagline}</p>
                <h2 className="text-2xl font-extrabold text-brand-deep">{e.heading}</h2>
                <p className="mt-2 text-sm text-brand-deep/60">{e.sub}</p>
              </div>
            )}

            {/* Material */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3">{e.selectMaterial}</p>
              <div className="grid grid-cols-2 gap-3">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                      material === m.id
                        ? "border-brand-deep bg-brand-deep text-white shadow-md"
                        : "border-brand-light bg-white text-brand-deep hover:border-brand-green"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <label className="mt-3 flex items-center justify-between rounded-2xl border border-brand-light bg-brand-cream/50 px-4 py-3 cursor-pointer">
                <span className="text-sm font-medium text-brand-deep">{e.premiumLabel}</span>
                <div
                  onClick={() => setPremium(!premium)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${premium ? "bg-brand-green" : "bg-slate-300"}`}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${premium ? "left-6" : "left-1"}`} />
                </div>
              </label>
            </div>

            {/* Height */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3">{e.height}</p>
              <div className="flex gap-3">
                {HEIGHTS.map((h) => (
                  <button
                    key={h.value}
                    onClick={() => setHeight(h.value)}
                    className={`flex-1 rounded-2xl border-2 py-3 text-sm font-semibold transition-all ${
                      height === h.value
                        ? "border-brand-deep bg-brand-deep text-white"
                        : "border-brand-light bg-white text-brand-deep hover:border-brand-green"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Linear feet & gates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2">{e.linearFeet}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={10}
                    max={2000}
                    value={linearFeet}
                    onChange={(e) => setLinearFeet(e.target.value)}
                    className="w-full rounded-2xl border border-brand-light px-4 py-3 text-sm font-semibold text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                  <span className="text-sm text-brand-deep/60">ft</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2">{e.gates}</p>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={gates}
                  onChange={(e) => setGates(e.target.value)}
                  className="w-full rounded-2xl border border-brand-light px-4 py-3 text-sm font-semibold text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                />
              </div>
            </div>

            {/* Old fence removal */}
            <label className="flex items-center justify-between rounded-2xl border border-brand-light bg-brand-cream/50 px-4 py-3 cursor-pointer">
              <span className="text-sm font-medium text-brand-deep">{e.removal}</span>
              <div
                onClick={() => setRemoval(!removal)}
                className={`relative w-11 h-6 rounded-full transition-colors ${removal ? "bg-brand-green" : "bg-slate-300"}`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${removal ? "left-6" : "left-1"}`} />
              </div>
            </label>

            {/* Teaser — no price shown until contact info is submitted */}
            {estimate && (
              <div className="rounded-2xl bg-brand-deep/5 border border-brand-light p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-green mb-1">{e.estimateReady}</p>
                <p className="text-base font-semibold text-brand-deep">{e.estimateReadySub}</p>
                <p className="text-xs text-brand-deep/50 mt-1">
                  {e.estimateMeta} {feetNum} ft · {height} ft · {MATERIALS.find(m=>m.id===material)?.label}
                  {gatesNum > 0 ? ` · ${gatesNum} gate${gatesNum > 1 ? "s" : ""}` : ""}
                  {removal ? " · includes removal" : ""}
                  {premium ? " · premium grade" : ""}
                </p>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!estimate}
              className="w-full rounded-full bg-brand-deep py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-green hover:shadow-xl disabled:opacity-50"
            >
              {e.nextBtn}
            </button>
            <p className="text-center text-xs text-brand-deep/40">{e.noCommit}</p>
          </div>
        )}

        {/* ── STEP 2: Contact Info ── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl ring-1 ring-brand-light p-8 space-y-6">
            <div className="text-center">
              <span className="inline-block rounded-full bg-brand-yellow/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-deep mb-3">{e.gallery}</span>
              <h2 className="text-2xl font-extrabold text-brand-deep">{e.step2Title}</h2>
              <p className="text-sm text-brand-deep/60 mt-1">{e.step2Sub}</p>
            </div>

            {/* Teaser in step 2 — price hidden until submission */}
            <div className="rounded-2xl bg-brand-deep text-white p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-brand-cream/70 mb-1">{e.step2Locked}</p>
              <p className="text-base font-semibold text-brand-cream/90">{e.step2Sub}</p>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-brand-cream/50 mt-1 hover:text-brand-yellow transition-colors">
                {e.editDetails}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">{e.nameLabel} *</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="John Smith" required
                  className="w-full rounded-2xl border border-brand-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">{e.phoneLabel} *</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(386) 000-0000" type="tel" required
                  className="w-full rounded-2xl border border-brand-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">{e.emailLabel} *</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="john@email.com" type="email" required
                  className="w-full rounded-2xl border border-brand-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-semibold text-brand-deep/70 mb-1 block">{e.zipLabel} *</label>
                <input value={zip} onChange={e=>setZip(e.target.value)} placeholder="32137" required
                  className="w-full rounded-2xl border border-brand-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button type="submit" disabled={sending}
              className="w-full rounded-full bg-brand-yellow py-4 text-base font-bold text-brand-deep shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-60">
              {sending ? e.submitting : e.submitBtn}
            </button>
            <p className="text-center text-xs text-brand-deep/40">{e.privacy}</p>
          </form>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl ring-1 ring-brand-light p-8 text-center space-y-6">
            <div className="text-5xl">🎉</div>
            <h2 className="text-2xl font-extrabold text-brand-deep">{e.confirmTitle}</h2>
            <p className="text-brand-deep/70">{e.success24h}</p>

            {estimate && (
              <div className="rounded-2xl bg-brand-deep text-white p-5">
                <p className="text-xs uppercase tracking-wide text-brand-cream/70 mb-1">{e.range}</p>
                <p className="text-3xl font-extrabold">{fmt(estimate.low)} – {fmt(estimate.high)}</p>
                <p className="text-xs text-brand-cream/50 mt-1">{e.rangeNote}</p>
              </div>
            )}

            {/* Pay deposit button */}
            {estimate && (
              <Link
                href={`/pay?amount=${Math.round(estimate.low * 0.50)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow py-4 text-base font-bold text-brand-deep shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                💳 {lang === "es" ? `Pagar Depósito 50% (${fmt(Math.round(estimate.low * 0.50))}) →` : `Pay 50% Deposit (${fmt(Math.round(estimate.low * 0.50))}) →`}
              </Link>
            )}

            <a
              href="https://calendly.com/federico-smoothfenceusa/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-green py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              {e.scheduleBtn}
            </a>
            <div className="flex gap-3">
              <Link href="/" className="flex-1 rounded-full border border-brand-light py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-cream text-center">
                {e.backHome}
              </Link>
              <a href="tel:+13864039460" onClick={() => trackClickToContact("tel", "estimator_success")} className="flex-1 rounded-full border border-brand-light py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-cream text-center">
                {e.callNow}
              </a>
            </div>
          </div>
        )}
    </div>
  );

  if (inline) return cards;

  return (
    <main className="min-h-screen bg-brand-cream">
      <section className="bg-brand-deep py-14 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">{e.tagline}</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{e.heading}</h1>
        <p className="mt-4 max-w-xl mx-auto text-brand-cream/80 text-base">{e.sub}</p>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {cards}
      </div>
    </main>
  );
}
