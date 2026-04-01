import type { Metadata } from "next";
import ServicesSection from "@/components/sections/Services";
import ServicesFAQ from "@/components/sections/ServicesFAQ";
import CTA from "@/components/layout/CTA";

export const metadata: Metadata = {
  title: "Fence Services | SmoothFenceUSA",
  description:
    "Professional fence installation, repair, and HOA support in Palm Coast and surrounding areas.",
};

export default function ServicesPage() {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 text-brand-deep sm:px-6 lg:pb-24 lg:pt-20">
        <header className="mb-10 space-y-4 text-center text-brand-deep lg:mb-14 lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
            Fence services for Palm Coast properties
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl lg:text-5xl">
            Professional fence services with local expertise
          </h1>
          <p className="max-w-2xl text-sm text-brand-deep/80 sm:text-base lg:text-lg">
            From new installations to repairs and HOA approvals, SmoothFenceUSA delivers
            long-lasting fences built for Florida weather, storms, and permitting rules.
          </p>
        </header>

        <div className="mb-16 lg:mb-20">
          <ServicesSection />
        </div>

        <section className="border-t border-brand-light/60 pt-10 lg:pt-12">
          <ServicesFAQ />
        </section>
      </section>

      <CTA />
    </main>
  );
}




