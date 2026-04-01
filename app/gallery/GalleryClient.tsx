"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type FenceType = "all" | "vinyl" | "aluminum" | "chain-link" | "wood";

type Project = {
  id: number;
  title: string;
  location: string;
  type: FenceType;
  date: string;
  before: string | null;
  after: string | null;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Vinyl Privacy Fence",
    location: "Palm Coast, FL",
    type: "vinyl",
    date: "2025-03-15",
    before: null,
    after: null,
  },
  {
    id: 2,
    title: "Aluminum Pool Fence",
    location: "Flagler Beach, FL",
    type: "aluminum",
    date: "2025-02-20",
    before: null,
    after: null,
  },
  {
    id: 3,
    title: "Wood Privacy Fence",
    location: "Bunnell, FL",
    type: "wood",
    date: "2025-01-10",
    before: null,
    after: null,
  },
  {
    id: 4,
    title: "Chain-Link Fence",
    location: "Palm Coast, FL",
    type: "chain-link",
    date: "2024-12-05",
    before: null,
    after: null,
  },
  {
    id: 5,
    title: "Vinyl Fence with Gate",
    location: "St. Augustine, FL",
    type: "vinyl",
    date: "2024-11-18",
    before: null,
    after: null,
  },
  {
    id: 6,
    title: "Aluminum Perimeter Fence",
    location: "Ormond Beach, FL",
    type: "aluminum",
    date: "2024-10-30",
    before: null,
    after: null,
  },
];

const filters: { label: string; value: FenceType }[] = [
  { label: "All", value: "all" },
  { label: "PVC / Vinyl", value: "vinyl" },
  { label: "Aluminum", value: "aluminum" },
  { label: "Chain-Link", value: "chain-link" },
  { label: "Wood", value: "wood" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function GalleryClient() {
  const [active, setActive] = useState<FenceType>("all");

  const filtered = projects
    .filter((p) => active === "all" || p.type === active)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
          See how we transform properties across Palm Coast and surrounding areas — sorted by most recent.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-deep shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        >
          Get Your Free Estimate →
        </Link>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors border ${
                active === f.value
                  ? "bg-brand-deep text-white border-brand-deep"
                  : "bg-white text-brand-deep border-brand-light hover:border-brand-deep"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-brand-deep/50 mt-3">
          Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""} — most recent first
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {filtered.length === 0 ? (
          <p className="text-center text-brand-deep/60 py-16">No projects yet for this category. Check back soon!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl overflow-hidden border border-brand-light bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="relative aspect-square bg-slate-100 flex items-center justify-center">
                    {project.before ? (
                      <Image src={project.before} alt={`Before - ${project.title}`} fill className="object-cover" />
                    ) : (
                      <span className="text-slate-400 text-xs px-2 text-center">Photo coming soon</span>
                    )}
                    <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wide z-10">
                      Before
                    </span>
                  </div>
                  {/* After */}
                  <div className="relative aspect-square bg-brand-light/30 flex items-center justify-center">
                    {project.after ? (
                      <Image src={project.after} alt={`After - ${project.title}`} fill className="object-cover" />
                    ) : (
                      <span className="text-brand-green text-xs px-2 text-center">Photo coming soon</span>
                    )}
                    <span className="absolute top-2 right-2 rounded-full bg-brand-green px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wide z-10">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-brand-deep">{project.title}</p>
                    <p className="text-xs text-brand-deep/60 mt-0.5">{project.location}</p>
                  </div>
                  <span className="text-xs text-brand-deep/40 mt-0.5 whitespace-nowrap ml-2">
                    {formatDate(project.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Bottom */}
      <section className="bg-brand-deep mt-8 py-16 px-4 text-center">
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
          📞{" "}
          <a href="tel:+13864039460" className="text-brand-yellow font-semibold hover:underline">
            (386) 403-9460
          </a>
        </p>
      </section>
    </main>
  );
}
