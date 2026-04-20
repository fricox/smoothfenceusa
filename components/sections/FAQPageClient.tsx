"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Full /faq page UI. Renders the 4-category accordion consuming
 * tr.faqPage.categories. Accordion pattern mirrors ServicesFAQ.tsx
 * (brand-* tokens, rotate-45 on open, max-h transition).
 */
export default function FAQPageClient() {
  const { tr } = useLanguage();
  const f = tr.faqPage;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((x) => (x === id ? null : id));

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-deep text-white py-14 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-2">
          {f.hero.tagline}
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {f.hero.heading}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-brand-cream/80 text-base sm:text-lg">
          {f.hero.sub}
        </p>
      </section>

      {/* Categories */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-12">
        {f.categories.map((category) => (
          <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-heading`}>
            <h2
              id={`${category.slug}-heading`}
              className="text-2xl font-bold text-brand-deep sm:text-3xl mb-4"
            >
              {category.label}
            </h2>
            <div className="space-y-3">
              {category.items.map((item, index) => {
                const id = `${category.slug}-${index}`;
                const isOpen = openId === id;
                return (
                  <div
                    key={id}
                    className="overflow-hidden rounded-2xl border border-brand-light bg-white/90 shadow-sm shadow-brand-deep/5"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between px-4 py-3 text-left sm:px-5 sm:py-4"
                    >
                      <span className="text-sm font-semibold text-brand-deep sm:text-base">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "ml-3 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-brand-light text-xs font-bold text-brand-deep transition-transform",
                          isOpen ? "rotate-45 bg-brand-light/40" : "bg-brand-cream"
                        )}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={clsx(
                        "px-4 text-sm text-brand-deep/80 transition-all duration-200 ease-out sm:px-5",
                        isOpen ? "max-h-96 pb-3 sm:pb-4" : "max-h-0"
                      )}
                    >
                      {isOpen && <p className="pt-1">{item.answer}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 text-center">
        <div className="rounded-3xl bg-brand-deep p-8 text-white sm:p-12">
          <h2 className="text-2xl font-bold">{f.cta.heading}</h2>
          <p className="mt-2 text-brand-cream/80">{f.cta.sub}</p>
          <Link
            href="/estimator"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
          >
            {f.cta.btn}
          </Link>
        </div>
      </section>
    </main>
  );
}
