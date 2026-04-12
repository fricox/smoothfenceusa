import type { Metadata } from "next";
import QuickContactForm from "@/components/forms/QuickContactForm";

export const metadata: Metadata = {
  title: "Free Fence Estimate | SmoothFenceUSA — Palm Coast, FL",
  description:
    "Get a free, no-obligation fence estimate from SmoothFenceUSA. Vinyl, aluminum, wood, and chain-link fences in Palm Coast and surrounding areas.",
  robots: { index: false, follow: false },
};

export default function FreeEstimateLandingPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-deep py-16 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
          Limited-Time Offer
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get Your Free Fence Estimate Today
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-brand-cream/80 text-base">
          No obligation, no pressure. Tell us what you need and we&apos;ll get
          back to you the same day with a personalized quote.
        </p>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <QuickContactForm />
      </section>

      {/* Trust signals */}
      <section className="bg-white py-12 px-4 text-center">
        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-3xl font-extrabold text-brand-deep">500+</p>
            <p className="text-sm text-brand-deep/60 mt-1">Fences Installed</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-brand-deep">5-Star</p>
            <p className="text-sm text-brand-deep/60 mt-1">Google Rating</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-brand-deep">Same Day</p>
            <p className="text-sm text-brand-deep/60 mt-1">Response Guarantee</p>
          </div>
        </div>
      </section>
    </main>
  );
}
