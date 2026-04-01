import type { Metadata } from "next";
import QuoteForm from "@/components/forms/QuoteForm";
import CTA from "@/components/layout/CTA";

export const metadata: Metadata = {
  title: "Free Fence Estimate | SmoothFenceUSA",
  description:
    "Request a free fence estimate in Palm Coast and nearby areas. Vinyl, aluminum, chain-link and wood fence installation and repair.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
            Free fence estimate
          </h1>
          <p className="mt-3 text-sm text-brand-deep/80 sm:text-base">
            Vinyl, aluminum, chain-link and wood fences. Installation &amp; repair
            in Palm Coast and nearby areas. HOA-friendly and{" "}
            <span className="font-semibold text-brand-deep">se habla español.</span>
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          <div>
            <QuoteForm />
          </div>

          <aside className="space-y-6">
            {/* Calendly CTA */}
            <div className="rounded-2xl border border-brand-yellow bg-brand-yellow/10 p-6 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-green mb-1">
                Prefer to schedule directly?
              </p>
              <h2 className="text-base font-bold text-brand-deep mb-2">
                Book your free estimate visit
              </h2>
              <p className="text-xs text-brand-deep/70 mb-4">
                Pick a date and time that works for you. We&apos;ll come to your property and measure everything on-site.
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

            {/* Why choose us */}
            <div className="rounded-2xl border border-brand-light bg-white p-6 text-sm text-brand-deep/80 shadow-sm">
              <h2 className="mb-2 text-base font-semibold text-brand-deep">
                Why homeowners choose SmoothFenceUSA
              </h2>
              <ul className="mb-4 list-disc space-y-1 pl-5">
                <li>Professional installation crews and fence repairs.</li>
                <li>Vinyl, aluminum, chain-link, and wood options.</li>
                <li>Storm-damage repair and custom gates.</li>
                <li>HOA guidance and permit-friendly planning.</li>
              </ul>
              <p className="text-xs text-brand-deep/60">
                Tell us about your project and we&apos;ll follow up with a detailed
                estimate. No spam, no pressure.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CTA />
    </main>
  );
}

