"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { galleryPhotos } from "./data";
import type { FenceType, PhotoTag } from "./types";

const PHOTOS_PER_PAGE = 24;

const TAG_STYLES: Record<PhotoTag, { bg: string; text: string }> = {
  finished:     { bg: "bg-brand-deep",  text: "text-brand-yellow" },
  process:      { bg: "bg-brand-green", text: "text-white" },
  installation: { bg: "bg-brand-light", text: "text-brand-deep" },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
}

export default function GalleryClient() {
  const { lang } = useLanguage();
  const isEs = lang === "es";
  const [active, setActive] = useState<FenceType>("all");
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_PAGE);

  const tagLabel: Record<PhotoTag, string> = {
    finished:     isEs ? "Terminado"   : "Finished",
    process:      isEs ? "Proceso"     : "In Progress",
    installation: isEs ? "Instalación" : "Installation",
  };

  const filters: { label: string; value: FenceType }[] = [
    { label: isEs ? "Todos" : "All",                 value: "all" },
    { label: "PVC / Vinyl",                           value: "vinyl" },
    { label: isEs ? "Aluminio" : "Aluminum",          value: "aluminum" },
    { label: isEs ? "Malla Ciclónica" : "Chain-Link", value: "chain-link" },
    { label: isEs ? "Madera" : "Wood",                value: "wood" },
  ];

  const filtered = useMemo(
    () => galleryPhotos.filter((p) => active === "all" || p.type === active),
    [active]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (value: FenceType) => {
    setActive(value);
    setVisibleCount(PHOTOS_PER_PAGE);
  };

  return (
    <main className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-deep py-16 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
          {isEs ? "Nuestro Trabajo" : "Our Work"}
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {isEs ? "Galería de Proyectos" : "Project Gallery"}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-brand-cream/80 text-base sm:text-lg">
          {isEs
            ? "Proceso, instalación y resultados finales — así es como trabajamos en Palm Coast y alrededores."
            : "Process, installation, and final results — this is how we work across Palm Coast and surrounding areas."}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-deep shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        >
          {isEs ? "Obtener Estimado Gratis →" : "Get Your Free Estimate →"}
        </Link>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
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
          {isEs
            ? `${filtered.length} foto${filtered.length !== 1 ? "s" : ""}`
            : `${filtered.length} photo${filtered.length !== 1 ? "s" : ""}`}
          {" · "}
          {isEs
            ? `mostrando ${Math.min(visibleCount, filtered.length)}`
            : `showing ${Math.min(visibleCount, filtered.length)}`}
        </p>
      </section>

      {/* Photo Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {filtered.length === 0 ? (
          <p className="text-center text-brand-deep/60 py-16">
            {isEs ? "Aún no hay fotos en esta categoría. ¡Vuelve pronto!" : "No photos yet for this category. Check back soon!"}
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((photo) => {
                const tagStyle = TAG_STYLES[photo.tag];
                return (
                  <div
                    key={photo.id}
                    className="rounded-3xl overflow-hidden border border-brand-light bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    {/* Photo area */}
                    <div className="relative aspect-[4/3] bg-brand-cream">
                      <Image
                        src={photo.src}
                        alt={isEs ? photo.titleEs : photo.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      {/* Tag badge */}
                      <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide z-10 ${tagStyle.bg} ${tagStyle.text}`}>
                        {tagLabel[photo.tag]}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="px-5 py-4 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-brand-deep text-sm leading-snug">
                          {isEs ? photo.titleEs : photo.title}
                        </p>
                        <p className="text-xs text-brand-deep/50 mt-0.5 flex items-center gap-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 flex-shrink-0">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8.25 8.25 0 0 0-16.5 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                          </svg>
                          {photo.location}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((c) => c + PHOTOS_PER_PAGE)}
                  className="inline-flex items-center justify-center rounded-full border-2 border-brand-deep px-8 py-3 text-base font-bold text-brand-deep transition-all hover:bg-brand-deep hover:text-white"
                >
                  {isEs
                    ? `Ver más fotos (${filtered.length - visibleCount} restantes)`
                    : `Load more (${filtered.length - visibleCount} remaining)`}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Bottom */}
      <section className="bg-brand-deep mt-8 py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
          {isEs ? "¿Listo para tu proyecto?" : "Ready to start your project?"}
        </h2>
        <p className="text-brand-cream/80 max-w-lg mx-auto mb-8 text-base">
          {isEs
            ? "Únete a cientos de propietarios en Palm Coast que confían en SmoothFenceUSA. Estimados gratis, sin presión."
            : "Join hundreds of homeowners in Palm Coast who trust SmoothFenceUSA. Free estimates, no pressure."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-deep shadow-lg transition-transform hover:scale-105"
          >
            {isEs ? "Cotización Gratis →" : "Get a Free Quote →"}
          </Link>
          <a
            href="https://calendly.com/federico-smoothfenceusa/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-white/10"
          >
            {isEs ? "Agendar una Visita" : "Schedule a Visit"}
          </a>
        </div>
        <p className="mt-6 text-brand-cream/60 text-sm">
          {" "}
          <a href="tel:+13864039460" className="text-brand-yellow font-semibold hover:underline">
            (386) 403-9460
          </a>
        </p>
      </section>
    </main>
  );
}
