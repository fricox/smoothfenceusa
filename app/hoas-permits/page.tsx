"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HoasPermitsPage() {
  const { tr } = useLanguage();
  const h = tr.hoa;

  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-brand-deep sm:px-6 lg:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
          {h.heading}
        </h1>
        <p className="mt-4 text-base text-brand-deep/80">{h.intro1}</p>
        <p className="mt-3 text-base text-brand-deep/80">{h.intro2}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-brand-light bg-white p-5 text-brand-deep/80 shadow-sm">
            <h2 className="text-base font-semibold text-brand-deep">{h.hoaCard.heading}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {h.hoaCard.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-light bg-white p-5 text-brand-deep/80 shadow-sm">
            <h2 className="text-base font-semibold text-brand-deep">{h.permitCard.heading}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {h.permitCard.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-brand-deep/70">{h.footer}</p>
      </section>
    </main>
  );
}
