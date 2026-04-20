"use client";

import Script from "next/script";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEARTH_APPLY_URL } from "@/lib/financing";

export default function HearthPaymentCalculator() {
  const { tr } = useLanguage();
  const t = tr.financing.calculator;

  return (
    <section
      aria-label="Hearth Payment Calculator"
      className="mx-auto w-full max-w-2xl px-4 py-4 sm:px-6"
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-brand-deep sm:text-2xl">{t.title}</h2>
        <p className="mt-2 text-sm text-brand-deep/70 sm:text-base">{t.sub}</p>
      </div>

      <iframe
        id="hearth-widget_calculator_v1"
        title="Hearth Payment Calculator"
        style={{ width: "100%", minHeight: 420, border: 0, display: "block", margin: "0 auto" }}
      />

      <Script
        src="https://widget.gethearth.com/script.js"
        id="hearth-script"
        data-orgid="61334"
        data-partner="smooth-fence-usa"
        strategy="afterInteractive"
      />

      <p className="mt-3 text-center text-xs text-neutral-500">{t.poweredBy}</p>

      <p className="mt-2 text-center text-sm">
        <a
          href={HEARTH_APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-green underline-offset-2 hover:underline"
        >
          {t.fallback}
        </a>
      </p>
    </section>
  );
}
