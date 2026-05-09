import type { Metadata } from "next";
import EstimatorClient from "@/app/estimator/EstimatorClient";
import QuickContactForm from "@/components/forms/QuickContactForm";
import FinancingBanner from "@/components/sections/FinancingBanner";
import LpTrustStrip from "@/components/sections/LpTrustStrip";

export const metadata: Metadata = {
  title: "Vinyl Fence Installation | Smooth Fence USA — Northeast Florida",
  description:
    "Professional PVC/vinyl fence installation across Flagler, Volusia, St. Johns, Duval, and Putnam counties. Low maintenance, lifetime durability, HOA-approved styles. Free estimate from Smooth Fence USA.",
  robots: { index: false, follow: false },
};

export default function VinylFenceLandingPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-deep py-16 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
          #1 Choice in Northeast Florida
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Vinyl Fence Installation
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-brand-cream/80 text-base">
          Zero maintenance. Lifetime durability. HOA-approved styles available.
          Get your free estimate from the local experts.
        </p>
      </section>

      <LpTrustStrip />

      {/* Primary CTA: instant estimator (P0-1) */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <EstimatorClient inline />
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">No Painting, No Staining</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              Vinyl never rots, warps, or needs repainting. Just hose it off once a year.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">HOA &amp; Permit Support</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              We handle the paperwork so your fence gets approved the first time.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">Privacy &amp; Security</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              6-ft privacy panels keep your yard shielded from the street and neighbors.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">Florida-Grade Materials</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              UV-resistant, wind-rated vinyl built for Florida sun and storms.
            </p>
          </div>
        </div>

        <FinancingBanner variant="inline" source="lp_vinyl_fence" />

        {/* Secondary: fallback form for visitors who don't want the estimator */}
        <div className="mt-10">
          <QuickContactForm />
        </div>
      </section>
    </main>
  );
}
