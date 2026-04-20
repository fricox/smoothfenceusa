"use client";

import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Compact 1-row trust strip shown above the Estimator on every LP.
 * Reinforces the P1-1 "site visit within 24h" SLA alongside licensing
 * and financing anchors. Wraps on narrow viewports.
 */
export default function LpTrustStrip() {
  const { tr } = useLanguage();
  const t = tr.lpTrustStrip;

  const items = [
    { icon: "⚡", label: t.siteVisit24h },
    { icon: "🔒", label: t.licensed },
    { icon: "💰", label: t.financing },
  ];

  return (
    <section aria-label="Trust signals" className="border-y border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-around gap-x-6 gap-y-2 px-4 py-3 text-sm font-semibold text-brand-deep sm:px-6">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
