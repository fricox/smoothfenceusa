import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SmoothFenceUSA | Local Fence Contractors in Palm Coast",
  description:
    "SmoothFenceUSA is a local fence contractor serving Palm Coast and nearby Florida communities with honest pricing, clean crews, and HOA-friendly installations.",
};

export default function AboutPage() {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-brand-deep sm:px-6 lg:py-20">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
            About SmoothFenceUSA
          </h1>
          <p className="text-base text-brand-deep/80">
            SmoothFenceUSA was created with a simple goal: make fence projects easy
            for homeowners in Palm Coast and the surrounding Florida coast. We know
            how stressful it can be to deal with HOAs, permits, and contractors that
            don&apos;t show up on time. Our team focuses on clear communication,
            clean job sites, and results that look great from the street.
          </p>
          <p className="text-base text-brand-deep/80">
            We specialize in vinyl, aluminum, chain-link, and wood fences and
            understand how Florida&apos;s sun, wind, and storms affect each
            material. That&apos;s why we recommend the right posts, hardware, and
            layouts based on your property—not a one-size-fits-all approach.
          </p>
          <p className="text-base text-brand-deep/80">
            When you work with SmoothFenceUSA, you get a local crew that respects
            your time, your yard, and your neighbors. We show up when we say we will,
            keep you updated during your project, and leave your property as clean
            as we found it.
          </p>

          <div className="mt-8 rounded-2xl border border-brand-light bg-white px-5 py-5 text-sm text-brand-deep/80">
            <h2 className="mb-2 text-base font-semibold text-brand-deep">
              What you can expect from us
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Clear, written quotes with no hidden fees.</li>
              <li>Help with HOA approvals and required drawings.</li>
              <li>Professional installation crews and clean job sites.</li>
              <li>Recommendations based on your needs, not our convenience.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}


