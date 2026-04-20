"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HEARTH_APPLY_URL } from "@/lib/financing";

const HEARTH_SCRIPT_SRC = "https://widget.gethearth.com/script.js";

export default function HearthPaymentCalculator() {
  const { tr } = useLanguage();
  const t = tr.financing.calculator;

  // Bumped on mount and whenever the tab becomes visible again.
  // Drives both the script re-injection effect and the iframe re-mount key,
  // so the widget reliably re-initialises after SPA navigation or tab switching.
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setMountKey((k) => k + 1);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = HEARTH_SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-orgid", "61334");
    script.setAttribute("data-partner", "smooth-fence-usa");
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [mountKey]);

  return (
    <section
      aria-label="Hearth Payment Calculator"
      className="bg-slate-50 py-12"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-brand-deep sm:text-2xl">{t.title}</h2>
          <p className="mt-2 text-sm text-brand-deep/70 sm:text-base">{t.sub}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <iframe
            key={mountKey}
            id="hearth-widget_calculator_v1"
            title="Hearth Payment Calculator"
            style={{ width: "100%", minHeight: 420, border: 0, display: "block", margin: "0 auto" }}
          />

          <p className="mt-4 text-center text-xs text-neutral-500">{t.poweredBy}</p>

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
        </div>
      </div>
    </section>
  );
}
