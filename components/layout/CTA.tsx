"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTA() {
  const { tr } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-brand-deep py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-brand-green/15 px-6 py-8 text-center text-brand-cream sm:px-8 sm:py-10 lg:flex-row lg:text-left">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
              Ready when you are
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {tr.cta.heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-brand-cream/90 sm:text-base">
              {tr.cta.sub}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm sm:text-base font-semibold text-brand-deep shadow-md shadow-black/15 transition-transform transition-shadow duration-150 hover:bg-brand-light hover:shadow-lg hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
            >
              {tr.cta.btn}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-brand-cream px-6 py-3 text-sm sm:text-base font-semibold text-brand-cream bg-transparent shadow-sm shadow-black/10 transition-transform transition-shadow duration-150 hover:bg-white/10 hover:shadow-lg hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
            >
              {tr.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
