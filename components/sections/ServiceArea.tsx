"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const counties = [
  { key: "flagler",  name: "Flagler County",   cities: "Palm Coast, Bunnell, Flagler Beach" },
  { key: "stjohns",  name: "St. Johns County",  cities: "St. Augustine, Ponte Vedra, Palm Valley" },
  { key: "volusia",  name: "Volusia County",    cities: "Ormond Beach, Daytona Beach, DeLand" },
  { key: "putnam",   name: "Putnam County",     cities: "Palatka, Crescent City, Interlachen" },
];

// Cities shown as pins in the map modal
const PINS = [
  { name: "Jacksonville",   top: "13%", left: "62%", highlight: false },
  { name: "St. Augustine",  top: "26%", left: "72%", highlight: false },
  { name: "Hastings",       top: "31%", left: "56%", highlight: false },
  { name: "Palatka",        top: "36%", left: "44%", highlight: false },
  { name: "Palm Coast",     top: "41%", left: "66%", highlight: true  },
  { name: "Crescent City",  top: "44%", left: "50%", highlight: false },
  { name: "Daytona Beach",  top: "55%", left: "72%", highlight: false },
  { name: "Port Orange",    top: "61%", left: "68%", highlight: false },
  { name: "Deltona",        top: "71%", left: "62%", highlight: false },
];

const MapPinIcon = ({ size = 5 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`h-${size} w-${size}`} aria-hidden="true">
    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8.25 8.25 0 0 0-16.5 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
  </svg>
);

function MapModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(18,80,54,0.75)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#fbfcf9", border: "2px solid #b2cf7f" }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5" style={{ backgroundColor: "#125036" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-white/10"
            style={{ color: "#fbfcf9" }}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-extrabold" style={{ color: "#fbfcf9" }}>
            {isEs ? "Nuestra " : "Our "}
            <span style={{ color: "#f8cf2b" }}>{isEs ? "Área de Servicio" : "Service Area"}</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed italic" style={{ color: "#b2cf7f" }}>
            {isEs
              ? "Sirviendo el Noreste de Florida: Desde Jacksonville hasta Deltona, incluyendo Palm Coast, St. Augustine, Palatka, Hastings, Crescent City y Port Orange."
              : "Serving Northeast Florida: From Jacksonville to Deltona, including Palm Coast, St. Augustine, Palatka, Hastings, Crescent City, and Port Orange."}
          </p>
        </div>

        {/* Map container */}
        <div className="relative" style={{ height: "380px", backgroundColor: "#e8f0e9" }}>
          {/* Google Maps iframe */}
          <iframe
            title="Service Area Map"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: "saturate(0.7) brightness(1.05)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500000!2d-81.3!3d29.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1"
          />

          {/* Brand-colored service area overlay circle */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "18%", left: "30%",
              width: "55%", height: "68%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(103,157,56,0.22) 0%, rgba(103,157,56,0.10) 55%, transparent 75%)",
              border: "2px solid rgba(103,157,56,0.45)",
            }}
          />

          {/* City pins */}
          {PINS.map((pin) => (
            <div
              key={pin.name}
              className="absolute flex items-center gap-1"
              style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -50%)" }}
            >
              <div
                className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold shadow-lg whitespace-nowrap"
                style={
                  pin.highlight
                    ? { backgroundColor: "#125036", color: "#f8cf2b", border: "2px solid #f8cf2b", fontSize: "0.75rem", padding: "4px 10px" }
                    : { backgroundColor: "#125036", color: "#fbfcf9", fontSize: "0.65rem", padding: "3px 7px" }
                }
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: pin.highlight ? 12 : 10, height: pin.highlight ? 12 : 10, flexShrink: 0 }}>
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8.25 8.25 0 0 0-16.5 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 0 0 2.683 2.282 16.975 16.975 0 0 0 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
                {pin.name}
              </div>
            </div>
          ))}
        </div>

        {/* Legend + CTA */}
        <div className="px-7 py-5" style={{ backgroundColor: "#fbfcf9" }}>
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-5"
            style={{ backgroundColor: "#125036" }}
          >
            <div
              className="h-5 w-5 flex-shrink-0 rounded"
              style={{ background: "rgba(103,157,56,0.5)", border: "2px solid #679d38" }}
            />
            <span className="text-sm font-medium" style={{ color: "#fbfcf9" }}>
              {isEs ? "Área verde resaltada: Zona de Servicio Garantizada" : "Green highlighted area: Guaranteed Service Zone"}
            </span>
          </div>

          <div className="flex gap-3">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex-1 rounded-full py-3 text-center text-sm font-bold shadow-md transition-all hover:scale-105"
              style={{ backgroundColor: "#f8cf2b", color: "#125036" }}
            >
              {isEs ? "Solicitar Presupuesto" : "Get a Free Quote"}
            </Link>
            <button
              onClick={onClose}
              className="flex-1 rounded-full py-3 text-center text-sm font-semibold transition-all"
              style={{ border: "2px solid #b2cf7f", color: "#125036", backgroundColor: "transparent" }}
            >
              {isEs ? "Cerrar" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceArea() {
  const { tr } = useLanguage();
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <section className="bg-brand-deep py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
              {tr.serviceArea.label}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-cream sm:text-4xl">
              {tr.serviceArea.heading}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-brand-cream/70">
              {tr.serviceArea.sub}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {counties.map((county) => (
              <div key={county.key} className="rounded-2xl border border-brand-cream/10 bg-white/5 px-5 py-5 backdrop-blur">
                <div className="flex items-center gap-2 text-brand-yellow">
                  <MapPinIcon />
                  <span className="font-semibold text-brand-cream">{county.name}</span>
                </div>
                <p className="mt-2 text-sm text-brand-cream/60">{county.cities}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-deep shadow-lg transition-colors hover:bg-brand-light"
            >
              {tr.serviceArea.ctaQuote}
            </Link>
            <button
              onClick={() => setShowMap(true)}
              className="inline-flex items-center gap-2 rounded-full border border-brand-cream/20 px-6 py-3 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-cream/50 hover:text-white"
            >
              <MapPinIcon />
              {tr.serviceArea.ctaMap}
            </button>
          </div>
        </div>
      </section>

      {showMap && <MapModal onClose={() => setShowMap(false)} />}
    </>
  );
}
