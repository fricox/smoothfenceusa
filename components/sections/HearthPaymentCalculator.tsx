"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { HEARTH_APPLY_URL } from "@/lib/financing";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2.2}
    stroke="currentColor"
    className="h-5 w-5 flex-shrink-0 text-brand-green"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default function HearthPaymentCalculator() {
  const { tr } = useLanguage();
  const t = tr.financing.calculator;
  const benefits = [t.benefit1, t.benefit2, t.benefit3];

  return (
    <section aria-label="Hearth Payment Calculator" className="bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-brand-deep sm:text-2xl">{t.title}</h2>
          <p className="mt-2 text-sm text-brand-deep/70 sm:text-base">{t.sub}</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
            <span role="img" aria-hidden="true">💰</span>
          </div>

          <ul className="mx-auto mb-8 max-w-md space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-brand-deep sm:text-base">
                <CheckIcon />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <a
            href={HEARTH_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-amber-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
          >
            {t.cta}
          </a>

          <p className="mt-3 text-center text-xs text-neutral-500">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
