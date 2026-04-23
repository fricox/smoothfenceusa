"use client";

import Script from "next/script";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEARTH_APPLY_URL } from "@/lib/financing";

export default function HearthWidgetEmbed() {
  const { tr } = useLanguage();
  const t = tr.financing.calculator;

  return (
    <section aria-label="Hearth Payment Calculator" className="bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-brand-deep sm:text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-brand-deep/70 sm:text-base">{t.sub}</p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <iframe
            id="hearth-widget_calculator_v1"
            title="Hearth Payment Calculator"
            style={{ width: "100%", minHeight: 520, border: 0, display: "block" }}
          />

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
