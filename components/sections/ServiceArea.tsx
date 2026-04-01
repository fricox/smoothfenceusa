"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const counties = [
  { key: "flagler", name: "Flagler County", cities: "Palm Coast, Bunnell, Flagler Beach" },
  { key: "stjohns", name: "St. Johns County", cities: "St. Augustine, Ponte Vedra, Palm Valley" },
  { key: "volusia", name: "Volusia County", cities: "Ormond Beach, Daytona Beach, DeLand" },
  { key: "putnam", name: "Putnam County", cities: "Palatka, Crescent City, Interlachen" },
];

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8.25 8.25 0 0 0-16.5 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
  </svg>
);

export default function ServiceArea() {
  const { tr } = useLanguage();

  return (
    <section className="bg-brand-deep py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
            {tr.serviceArea.label}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-cream sm:text-4xl">
            {tr.serviceArea.heading}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-brand-cream/70">
            {tr.serviceArea.sub}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {counties.map((county) => (
            <div key={county.key} className="rounded-2xl border border-brand-cream/10 bg-white/5 px-5 py-5 backdrop-blur">
              <div className="flex items-center gap-2 text-brand-yellow">
                <MapPinIcon />
                <span className="font-semibold text-brand-cream">{county.name}</span>
              </div>
              <p className="mt-2 text-sm text-brand-cream/60">{county.cities}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-deep shadow-lg transition-colors hover:bg-brand-light"
          >
            {tr.serviceArea.ctaQuote}
          </Link>
          <a
            href="https://www.google.com/maps/search/fence+installation+palm+coast+florida"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-cream/20 px-6 py-3 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-cream/50 hover:text-white"
          >
            <MapPinIcon />
            {tr.serviceArea.ctaMap}
          </a>
        </div>
      </div>
    </section>
  );
}
