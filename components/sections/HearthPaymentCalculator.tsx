"use client";

import Script from "next/script";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEARTH_APPLY_URL } from "@/lib/financing";

/**
 * HearthPaymentCalculator
 *
 * Renders the official Hearth embedded calculator widget (v1) inside /financing.
 * The script at widget.gethearth.com/script.js finds the iframe by id and injects
 * the live calculator UI. We keep a plain "Apply" anchor as a fallback in case
 * the widget fails to initialize (ad blockers, offline, partner outage, etc.).
 *
 * Partner attribution:
 *   - data-orgid="61334"
 *   - data-partner="smooth-fence-usa"
 */
export default function HearthPaymentCalculator() {
  const { tr } = useLanguage();
  const t = tr.financing.calculator;

  return (
    <section aria-label="Hearth Payment Calculator" className="bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-brand-deep sm:text-2xl">{t.title}</h2>
          <p className="mt-2 text-sm text-brand-deep/70 sm:text-base">{t.sub}</p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          {/*
            Official Hearth widget container. The script populates this iframe
            after it loads. min-height prevents layout shift while loading.
          */}
          <iframe
            id="hearth-widget_calculator_v1"
            title="Hearth Payment Calculator"
            style={{ width: "100%", minHeight: 520, border: 0, display: "block" }}
          />

          {/* Fallback CTA — always visible so the page is useful even if the
              embedded widget is blocked or still loading. */}
          <a
            href={HEARTH_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-full bg-amber-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
          >
            {t.cta}
          </a>

          <p className="mt-3 text-center text-xs text-neutral-500">{t.disclaimer}</p>
        </div>
      </div>

      <Script
        id="hearth-script"
        src="https://widget.gethearth.com/script.js"
        strategy="afterInteractive"
        data-orgid="61334"
        data-partner="smooth-fence-usa"
      />
    </section>
  );
}
