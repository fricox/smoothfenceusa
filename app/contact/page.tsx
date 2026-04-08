"use client";

import CTA from "@/components/layout/CTA";
import QuoteForm from "@/components/forms/QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { tr } = useLanguage();

  return (
    <>
      <main className="bg-brand-cream">
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 text-brand-deep sm:px-6 lg:pt-20">
          <div className="mb-10 space-y-4 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
              {tr.contact.label}
            </p>
            <h1 className="text-3xl font-bold text-brand-deep sm:text-4xl">
              {tr.contact.heading}
            </h1>
            <p className="text-base text-brand-deep/80 sm:text-lg">
              {tr.contact.sub}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,560px)_1fr]">
            <QuoteForm />
            <aside className="rounded-3xl border border-brand-light bg-white p-6 text-brand-deep/80 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-brand-deep">
                {tr.contact.whatNext}
              </h2>
              <ol className="mt-4 space-y-4 text-sm">
                <li>
                  <span className="font-semibold text-brand-deep">{tr.contact.step1.title}</span>{" "}
                  {tr.contact.step1.desc}
                </li>
                <li>
                  <span className="font-semibold text-brand-deep">{tr.contact.step2.title}</span>{" "}
                  {tr.contact.step2.desc}
                </li>
                <li>
                  <span className="font-semibold text-brand-deep">{tr.contact.step3.title}</span>{" "}
                  {tr.contact.step3.desc}
                </li>
              </ol>

              <div className="mt-8 space-y-3 text-sm">
                <p className="font-semibold uppercase tracking-wide text-brand-green">
                  {tr.contact.scheduleLabel}
                </p>
                <a
                  href="https://calendly.com/federico-smoothfenceusa/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-deep px-4 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-brand-green"
                >
                  {tr.contact.scheduleBtn}
                </a>
              </div>

              <div className="mt-6 space-y-2 text-sm border-t border-brand-light pt-6">
                <p className="font-semibold uppercase tracking-wide text-brand-green">
                  {tr.contact.directContact}
                </p>
                <p>
                  <a href="tel:+13864039460" className="hover:text-brand-green transition-colors">
                    (386) 403-9460
                  </a>
                </p>
                <p>
                  <a href="mailto:info@smoothfenceusa.com" className="hover:text-brand-green transition-colors">
                    info@smoothfenceusa.com
                  </a>
                </p>
                <p>{tr.contact.location}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <CTA />
    </>
  );
}
