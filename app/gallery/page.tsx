import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Before & After Gallery | SmoothFenceUSA",
  description:
    "See the transformation. Real fence installation projects by SmoothFenceUSA in Palm Coast, Florida — vinyl, aluminum, chain-link, and wood fences.",
};

const projects = [
  {
    id: 1,
    title: "Vinyl Privacy Fence",
    location: "Palm Coast, FL",
    before: "/gallery/vinyl-before-1.jpg",
    after: "/gallery/vinyl-after-1.jpg",
  },
  {
    id: 2,
    title: "Aluminum Pool Fence",
    location: "Flagler Beach, FL",
    before: "/gallery/aluminum-before-1.jpg",
    after: "/gallery/aluminum-after-1.jpg",
  },
  {
    id: 3,
    title: "Wood Privacy Fence",
    location: "Bunnell, FL",
    before: "/gallery/wood-before-1.jpg",
    after: "/gallery/wood-after-1.jpg",
  },
  {
    id: 4,
    title: "Chain-Link Fence",
    location: "Palm Coast, FL",
    before: "/gallery/chainlink-before-1.jpg",
    after: "/gallery/chainlink-after-1.jpg",
  },
  {
    id: 5,
    title: "Vinyl Fence with Gate",
    location: "St. Augustine, FL",
    before: "/gallery/vinyl-before-2.jpg",
    after: "/gallery/vinyl-after-2.jpg",
  },
  {
    id: 6,
    title: "Aluminum Perimeter Fence",
    location: "Ormond Beach, FL",
    before: "/gallery/aluminum-before-2.jpg",
    after: "/gallery/aluminum-after-2.jpg",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-deep py-16 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
          Real Projects. Real Results.
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Before &amp; After Gallery
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-brand-cream/80 text-base sm:text-lg">
          Every fence tells a story. See how we transform properties across Palm Coast and surrounding areas.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-deep shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        >
          Get Your Free Estimate →
        </Link>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl overflow-hidden border border-brand-light bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="relative">
                  <div className="aspect-square bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">Photo coming soon</span>
                  </div>
                  <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
                    Before
                  </span>
                </div>
                {/* After */}
                <div className="relative">
                  <div className="aspect-square bg-brand-light/40 flex items-center justify-center">
                    <span className="text-brand-green text-xs">Photo coming soon</span>
                  </div>
                  <span className="absolute top-2 right-2 rounded-full bg-brand-green px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
                    After
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-brand-deep">{project.title}</p>
                <p className="text-xs text-brand-deep/60 mt-0.5">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-brand-deep py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
          Ready for your transformation?
        </h2>
        <p className="text-brand-cream/80 max-w-lg mx-auto mb-8 text-base">
          Join hundreds of homeowners in Palm Coast who trust SmoothFenceUSA. Free estimates, no pressure.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-deep shadow-lg transition-transform hover:scale-105"
          >
            Get a Free Quote →
          </Link>
          <a
            href="https://calendly.com/federico-smoothfenceusa/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-white/10"
          >
            📅 Schedule a Visit
          </a>
        </div>
        <p className="mt-6 text-brand-cream/60 text-sm">
          📞 Call us now:{" "}
          <a href="tel:+13864039460" className="text-brand-yellow font-semibold hover:underline">
            (386) 403-9460
          </a>
        </p>
      </section>
    </main>
  );
}
