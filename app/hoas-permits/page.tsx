import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOA & Permits | SmoothFenceUSA",
  description:
    "SmoothFenceUSA helps homeowners in Palm Coast handle HOA approvals and local fence permits so projects move forward without delays.",
};

export default function HoasPermitsPage() {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 text-brand-deep sm:px-6 lg:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
          HOA & permits made simple
        </h1>
        <p className="mt-4 text-base text-brand-deep/80">
          Many neighborhoods in Palm Coast and nearby communities are part of an HOA.
          That means your new fence must follow specific rules for height, style,
          material, and color. On top of that, some projects require city or county
          permits.
        </p>
        <p className="mt-3 text-base text-brand-deep/80">
          SmoothFenceUSA helps you understand what&apos;s allowed before you sign a
          contract so you don&apos;t waste time or money on plans that won&apos;t be
          approved.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-brand-light bg-white p-5 text-brand-deep/80 shadow-sm">
            <h2 className="text-base font-semibold text-brand-deep">HOA guidance</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>Review of your HOA rules and design guidelines.</li>
              <li>Help choosing fence styles and colors that fit.</li>
              <li>Support with drawings or descriptions for approvals.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-light bg-white p-5 text-brand-deep/80 shadow-sm">
            <h2 className="text-base font-semibold text-brand-deep">
              Permits & inspections
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>Guidance on what projects require permits.</li>
              <li>Coordination of permit steps when applicable.</li>
              <li>Fence layouts that respect property lines and easements.</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-brand-deep/70">
          Every neighborhood is different. When you request a quote, let us know if
          you&apos;re part of an HOA and we&apos;ll factor that into your plan from
          day one.
        </p>
      </section>
    </main>
  );
}


