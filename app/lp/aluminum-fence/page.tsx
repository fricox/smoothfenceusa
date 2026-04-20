import type { Metadata } from "next";
import EstimatorClient from "@/app/estimator/EstimatorClient";
import QuickContactForm from "@/components/forms/QuickContactForm";
import FinancingBanner from "@/components/sections/FinancingBanner";
import LpTrustStrip from "@/components/sections/LpTrustStrip";

export const metadata: Metadata = {
  title: "Aluminum Fence Installation | Smooth Fence USA — Northeast Florida",
  description:
    "Elegant aluminum fence installation across Flagler, Volusia, St. Johns, Duval, and Putnam counties. Rust-proof, pool-code compliant, and built to last. Free estimate from Smooth Fence USA.",
  robots: { index: false, follow: false },
};

export default function AluminumFenceLandingPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-deep py-16 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
          Elegant &amp; Durable
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Aluminum Fence Installation
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-brand-cream/80 text-base">
          Rust-proof, pool-code compliant, and built to last a lifetime.
          The premium look without the premium maintenance.
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
            <h3 className="font-bold text-brand-deep">Pool-Code Compliant</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              Self-closing, self-latching gate options that meet Florida pool safety codes.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">Rust-Proof Guarantee</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              Powder-coated aluminum that won&apos;t rust, even in Florida&apos;s salt air.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">Curb Appeal</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              Clean, elegant lines that increase property value and complement any landscape.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-light">
            <h3 className="font-bold text-brand-deep">HOA-Friendly Styles</h3>
            <p className="mt-2 text-sm text-brand-deep/70">
              Multiple heights, colors, and picket styles to match your community&apos;s guidelines.
            </p>
          </div>
        </div>

        <FinancingBanner variant="inline" source="lp_aluminum_fence" />

        {/* Secondary: fallback form for visitors who don't want the estimator */}
        <div className="mt-10">
          <QuickContactForm />
        </div>
      </section>
    </main>
  );
}
