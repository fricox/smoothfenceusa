import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EstimatorClient from "@/app/estimator/EstimatorClient";
import LpHeroForm from "@/components/forms/LpHeroForm";
import TrackedLink from "@/components/ui/TrackedLink";
import { getArea, LP_AREA_SLUGS } from "@/lib/lp-areas";

const SITE_URL = "https://smoothfenceusa.com";

/**
 * Build the metadata for an /lp/fence-{slug} page.
 *
 * Critical for ad performance: the title and H1 lead with the **city**
 * (Jacksonville, St. Augustine, Daytona) — that's what users type into
 * Google, not "Duval County". Mismatched title vs. ad keyword is one of
 * the failures the 2026-04-29 pivot addresses.
 */
export function buildAreaMetadata(slug: string): Metadata {
  const area = getArea(slug);
  if (!area) return { title: "Fence Installation in Florida | Smooth Fence USA" };
  const title = `Fence Installation in ${area.primaryCity}, ${area.state} | Smooth Fence USA`;
  const description = `Vinyl, aluminum & wood fence installation in ${area.primaryCity}. Free estimate in 60 seconds. Licensed & insured. Same-day quote.`;
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

export default function AreaLanding({ slug }: Props) {
  const area = getArea(slug);
  if (!area) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FencingContractor",
    name: "Smooth Fence USA",
    url: `${SITE_URL}/lp/fence-${slug}`,
    telephone: "+1-386-403-9460",
    email: "info@smoothfenceusa.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "19",
      bestRating: "5",
    },
    areaServed: [
      {
        "@type": "City",
        name: area.primaryCity,
        containedInPlace: { "@type": "AdministrativeArea", name: `${area.countyName}, ${area.state}` },
      },
      ...area.nearbyCities
        .filter((c) => c !== area.primaryCity)
        .map((c) => ({ "@type": "City", name: c })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO — H1 + sub + form on the right (form is above the fold on desktop) */}
      <section className="bg-gradient-to-br from-brand-deep to-brand-green px-4 py-10 text-white sm:py-14">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column — copy + trust */}
          <div className="lg:pt-6">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Fence Installation in {area.primaryCity}, {area.state}
            </h1>
            <p className="mt-4 text-lg opacity-90 sm:text-xl">
              Vinyl, aluminum, wood &amp; chain-link fences for {area.primaryCity} and all of{" "}
              {area.countyName}. Free estimate in 60 seconds.
            </p>

            <ul className="mt-6 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5">★★★★★</span>
                <span><strong>5.0</strong> rating · <strong>19</strong> Google reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✓</span>
                <span>Licensed &amp; insured local Florida team</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✓</span>
                <span>Same-day quote · 24-hour site visit</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">✓</span>
                <span>Financing available · pre-qualify in 60 sec, no credit hit</span>
              </li>
            </ul>
          </div>

          {/* Right column — fast lead form */}
          <div className="lg:pt-2">
            <LpHeroForm city={area.primaryCity} sourceSlug={slug} />
          </div>
        </div>
      </section>

      {/* ── ESTIMATOR — secondary CTA for users who want to play with price */}
      <section id="estimator" className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-brand-deep sm:text-3xl">
            Get Your Personalized Estimate
          </h2>
          <p className="mb-8 text-center text-sm text-brand-deep/70 sm:text-base">
            Pick your fence type and length — see your price range instantly.
          </p>
          <EstimatorClient inline />
        </div>
      </section>

      {/* ── CITIES SERVED chips */}
      <section className="bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-bold text-brand-deep sm:text-2xl">
            Cities We Serve Near {area.primaryCity}
          </h2>
          <p className="mt-1 text-sm text-brand-deep/70">
            Plus all of {area.countyName} and nearby {area.metro || "Florida"} communities.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {area.nearbyCities.map((c) => (
              <span
                key={c}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-deep ring-1 ring-slate-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-brand-deep">
            Frequently Asked
          </h2>
          <details className="mb-3 border-b border-slate-200 pb-3">
            <summary className="cursor-pointer font-semibold">
              How long does a fence take to install in {area.primaryCity}?
            </summary>
            <p className="mt-2 text-slate-700">
              Most residential fence installs in {area.primaryCity} are done in 1–3 days
              depending on linear footage, terrain, and material.
            </p>
          </details>
          <details className="mb-3 border-b border-slate-200 pb-3">
            <summary className="cursor-pointer font-semibold">Do you pull permits?</summary>
            <p className="mt-2 text-slate-700">
              Yes. We pull permits for {area.countyName} and every city we serve, and we
              handle HOA approvals when needed.
            </p>
          </details>
          <details className="mb-3 border-b border-slate-200 pb-3">
            <summary className="cursor-pointer font-semibold">How fast can you give me a quote?</summary>
            <p className="mt-2 text-slate-700">
              Submit the form above and we&apos;ll call back the same day. We schedule a
              free site visit within 24 hours.
            </p>
          </details>
          <details className="mb-3 border-b border-slate-200 pb-3">
            <summary className="cursor-pointer font-semibold">Do you offer financing?</summary>
            <p className="mt-2 text-slate-700">
              Yes — monthly payments via Hearth. Pre-qualify in 60 seconds with no impact
              to your credit score.
            </p>
          </details>
          <details className="mb-3 border-b border-slate-200 pb-3">
            <summary className="cursor-pointer font-semibold">Are you licensed and insured?</summary>
            <p className="mt-2 text-slate-700">
              Yes. We are a fully licensed and insured Florida fence contractor.
            </p>
          </details>
        </div>
      </section>

      {/* ── BOTTOM CTA — single anchor back to the hero form */}
      <section className="bg-brand-deep px-4 py-12 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to fence your {area.primaryCity} property?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
          Free estimate · No obligation · Local team
        </p>
        <a
          href="#lp-form"
          className="mt-6 inline-block rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-deep shadow-md transition-colors hover:bg-brand-light"
        >
          Get My Free Estimate →
        </a>
        <p className="mt-4 text-sm opacity-80">
          or call{" "}
          <TrackedLink
            href="tel:+13864039460"
            tracking={{ kind: "contact", channel: "tel", location: "lp_inline_cta" }}
            className="font-bold underline"
          >
            (386) 403-9460
          </TrackedLink>
        </p>
      </section>
    </>
  );
}

export function generateAreaStaticParams() {
  return LP_AREA_SLUGS.map((slug) => ({ slug }));
}
