import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import EstimatorClient from "@/app/estimator/EstimatorClient";
import QuickContactForm from "@/components/forms/QuickContactForm";
import FinancingBanner from "@/components/sections/FinancingBanner";
import LpTrustStrip from "@/components/sections/LpTrustStrip";
import TrustBadges from "@/components/sections/TrustBadges";
import { getCounty, COUNTIES } from "@/lib/counties";

const CALENDLY_URL = "https://calendly.com/federico-smoothfenceusa/30min";
const SITE_URL = "https://smoothfenceusa.com";

export function buildCountyMetadata(slug: string): Metadata {
  const county = getCounty(slug);
  if (!county) return { title: "Fence Installation in Florida | Smooth Fence USA" };
  const title = `Fence Installation in ${county.name}, FL | Smooth Fence USA`;
  const description = `Vinyl, aluminum & wood fence installation across ${county.name}. Free estimate in minutes. Serving ${county.cities.join(", ")}.`;
  const url = `${SITE_URL}/lp/fence-${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    robots: { index: false, follow: false },
  };
}

type Props = { slug: string };

export default function CountyLanding({ slug }: Props) {
  const county = getCounty(slug);
  if (!county) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FencingContractor",
    name: "Smooth Fence USA",
    url: `${SITE_URL}/lp/fence-${slug}`,
    telephone: "+1-386-403-9460",
    areaServed: {
      "@type": "AdministrativeArea",
      name: county.name,
      containsPlace: county.cities.map((c) => ({ "@type": "City", name: c })),
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-deep text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
          Fence Installation in {county.name}
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
          Licensed &amp; insured. Serving {county.heroCity} and all of {county.name}. Free estimate in minutes.
        </p>
      </section>

      <LpTrustStrip />

      {/* Estimator */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <EstimatorClient inline />
      </section>

      <TrustBadges />

      {/* Cities chips */}
      <section className="py-10 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Cities We Serve in {county.name}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {county.cities.map((c) => (
            <span key={c} className="px-4 py-2 bg-slate-100 rounded-full text-sm">{c}</span>
          ))}
        </div>
      </section>

      <FinancingBanner variant="inline" source={`lp_fence_${slug}`} />

      {/* FAQ */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
        <details className="mb-3 border-b pb-3">
          <summary className="font-semibold cursor-pointer">How long does installation take?</summary>
          <p className="mt-2 text-slate-700">Most residential fences are installed in 1–3 days depending on linear footage and terrain in {county.name}.</p>
        </details>
        <details className="mb-3 border-b pb-3">
          <summary className="font-semibold cursor-pointer">Do you pull permits?</summary>
          <p className="mt-2 text-slate-700">Yes. We handle permits for {county.name} and all cities we serve.</p>
        </details>
        <details className="mb-3 border-b pb-3">
          <summary className="font-semibold cursor-pointer">Do you offer financing?</summary>
          <p className="mt-2 text-slate-700">Yes — monthly payments via Hearth. Pre-qualify in 60 seconds with no credit impact.</p>
        </details>
      </section>

      {/* Calendly + Form */}
      <section className="py-12 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Schedule a Free On-Site Estimate</h2>
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700"
        >
          Book a Time →
        </Link>
        <div className="mt-10">
          <QuickContactForm />
        </div>
      </section>
    </main>
  );
}

export function generateCountyStaticParams() {
  return COUNTIES.map((c) => ({ slug: c.slug }));
}
