import type { Metadata } from "next";
import CTA from "@/components/layout/CTA";
import QuoteForm from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Fence installation quote in Palm Coast, Florida | SmoothFenceUSA",
  description:
    "Request a free fence installation quote in Palm Coast, Florida. SmoothFenceUSA handles HOA approvals, permits, and high-quality fence builds.",
};

export default function ContactPage() {
  return (
    <>
      <main className="bg-brand-cream">
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 text-brand-deep sm:px-6 lg:pt-20">
          <div className="mb-10 space-y-4 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
              Get your free quote
            </p>
            <h1 className="text-3xl font-bold text-brand-deep sm:text-4xl">
              Contact SmoothFenceUSA
            </h1>
            <p className="text-base text-brand-deep/80 sm:text-lg">
              Share your site details and we&apos;ll coordinate a visit, gather HOA
              docs, and send a precise project estimate.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,560px)_1fr]">
            <QuoteForm />
            <aside className="rounded-3xl border border-brand-light bg-white p-6 text-brand-deep/80 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-brand-deep">
                What happens next?
              </h2>
              <ol className="mt-4 space-y-4 text-sm">
                <li>
                  <span className="font-semibold text-brand-deep">1. Quick call:</span>{" "}
                  We confirm project scope, HOA status, and preferred timelines.
                </li>
                <li>
                  <span className="font-semibold text-brand-deep">2. Site visit:</span>{" "}
                  Our estimator measures linear feet and checks grading, utilities,
                  and property lines.
                </li>
                <li>
                  <span className="font-semibold text-brand-deep">3. Proposal:</span>{" "}
                  You receive a detailed quote with materials, permits, and
                  scheduling info.
                </li>
              </ol>

              <div className="mt-8 space-y-3 text-sm">
                <p className="font-semibold uppercase tracking-wide text-brand-green">
                  Prefer to schedule directly?
                </p>
                <a
                  href="https://calendly.com/federico-smoothfenceusa/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-deep px-4 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-brand-green"
                >
                  📅 Schedule an Estimate Visit
                </a>
              </div>

              <div className="mt-6 space-y-2 text-sm border-t border-brand-light pt-6">
                <p className="font-semibold uppercase tracking-wide text-brand-green">
                  Contact us directly
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
                <p>Palm Coast &amp; surrounding areas</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <CTA />
    </>
  );
}

