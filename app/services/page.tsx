"use client";

import CTA from "@/components/layout/CTA";
import ServicesSection from "@/components/sections/Services";
import ServicesFAQ from "@/components/sections/ServicesFAQ";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesPage() {
  const { tr } = useLanguage();
  const s = tr.services;

  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 text-brand-deep sm:px-6 lg:pb-24 lg:pt-20">
        <header className="mb-10 space-y-4 text-center text-brand-deep lg:mb-14 lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
            {s.pageTagline}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl lg:text-5xl">
            {s.pageHeading}
          </h1>
          <p className="max-w-2xl text-sm text-brand-deep/80 sm:text-base lg:text-lg">
            {s.pageSub}
          </p>
        </header>

        <div className="mb-16 lg:mb-20">
          <ServicesSection />
        </div>

        <section className="border-t border-brand-light/60 pt-10 lg:pt-12">
          <ServicesFAQ />
        </section>
      </section>

      <CTA />
    </main>
  );
}
