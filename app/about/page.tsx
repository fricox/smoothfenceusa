"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { tr } = useLanguage();
  const a = tr.about;

  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-brand-deep sm:px-6 lg:py-20">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
            {a.heading}
          </h1>
          <p className="text-base text-brand-deep/80">{a.p1}</p>
          <p className="text-base text-brand-deep/80">{a.p2}</p>
          <p className="text-base text-brand-deep/80">{a.p3}</p>

          <div className="mt-8 rounded-2xl border border-brand-light bg-white px-5 py-5 text-sm text-brand-deep/80">
            <h2 className="mb-2 text-base font-semibold text-brand-deep">
              {a.expectHeading}
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              {a.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
