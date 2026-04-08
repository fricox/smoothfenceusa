"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Service icons ──────────────────────────────────────────────── */
const VinylIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" className="h-6 w-6" aria-hidden="true">
    {/* Vinyl privacy fence: solid planks + post caps */}
    <rect x="2" y="10" width="5" height="20" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="9" y="10" width="4" height="20" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="15" y="10" width="4" height="20" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="21" y="10" width="4" height="20" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="27" y="10" width="5" height="20" rx="1" fill="currentColor" opacity="0.9"/>
    {/* rails */}
    <rect x="2" y="14" width="30" height="3" rx="1" fill="currentColor" opacity="0.4"/>
    <rect x="2" y="23" width="30" height="3" rx="1" fill="currentColor" opacity="0.4"/>
    {/* post caps */}
    <polygon points="2,10 4.5,6 7,10" fill="currentColor" opacity="0.9"/>
    <polygon points="27,10 29.5,6 32,10" fill="currentColor" opacity="0.9"/>
  </svg>
);

const AluminumIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" className="h-6 w-6" aria-hidden="true">
    {/* Aluminum: thin vertical bars + pointed tops (decorative) */}
    <rect x="3"  y="12" width="3" height="18" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="9"  y="12" width="3" height="18" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="15" y="12" width="3" height="18" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="21" y="12" width="3" height="18" rx="1" fill="currentColor" opacity="0.75"/>
    <rect x="27" y="12" width="3" height="18" rx="1" fill="currentColor" opacity="0.9"/>
    {/* pointed spear tops */}
    <polygon points="3,12 4.5,7 6,12"  fill="currentColor" opacity="0.9"/>
    <polygon points="9,12 10.5,7 12,12" fill="currentColor" opacity="0.75"/>
    <polygon points="15,12 16.5,7 18,12" fill="currentColor" opacity="0.75"/>
    <polygon points="21,12 22.5,7 24,12" fill="currentColor" opacity="0.75"/>
    <polygon points="27,12 28.5,7 30,12" fill="currentColor" opacity="0.9"/>
    {/* two horizontal rails */}
    <rect x="2" y="16" width="32" height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="2" y="24" width="32" height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
  </svg>
);

const ChainLinkIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
    {/* Chain-link diamond mesh pattern */}
    <line x1="2"  y1="30" x2="10" y2="8"  strokeLinecap="round"/>
    <line x1="8"  y1="30" x2="16" y2="8"  strokeLinecap="round"/>
    <line x1="14" y1="30" x2="22" y2="8"  strokeLinecap="round"/>
    <line x1="20" y1="30" x2="28" y2="8"  strokeLinecap="round"/>
    <line x1="26" y1="30" x2="34" y2="8"  strokeLinecap="round"/>
    <line x1="10" y1="30" x2="2"  y2="8"  strokeLinecap="round"/>
    <line x1="16" y1="30" x2="8"  y2="8"  strokeLinecap="round"/>
    <line x1="22" y1="30" x2="14" y2="8"  strokeLinecap="round"/>
    <line x1="28" y1="30" x2="20" y2="8"  strokeLinecap="round"/>
    <line x1="34" y1="30" x2="26" y2="8"  strokeLinecap="round"/>
    {/* top and bottom rails */}
    <line x1="1" y1="8"  x2="35" y2="8"  strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="1" y1="30" x2="35" y2="30" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const WoodIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" className="h-6 w-6" aria-hidden="true">
    {/* Wood: picket tops (pointed) + board lines */}
    {[3, 10, 17, 24].map((x, i) => (
      <g key={i}>
        <polygon points={`${x},14 ${x+3.5},8 ${x+7},14`} fill="currentColor" opacity="0.85"/>
        <rect x={x} y="14" width="7" height="16" rx="0.5" fill="currentColor" opacity="0.85"/>
        {/* wood grain line */}
        <line x1={x+2} y1="18" x2={x+5} y2="18" stroke="white" strokeWidth="0.8" opacity="0.4"/>
        <line x1={x+2} y1="22" x2={x+5} y2="22" stroke="white" strokeWidth="0.8" opacity="0.4"/>
      </g>
    ))}
    {/* horizontal rails */}
    <rect x="2" y="17" width="32" height="2.5" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="2" y="25" width="32" height="2.5" rx="1" fill="currentColor" opacity="0.3"/>
  </svg>
);

const RepairIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
    {/* Wrench */}
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M26 8a6 6 0 0 0-8.5 8.5L6 28a2 2 0 1 0 2.8 2.8l11.6-11.5A6 6 0 0 0 26 8Z"/>
    <circle cx="26" cy="9" r="2" fill="currentColor" stroke="none" opacity="0.5"/>
    {/* lightning bolt for storm */}
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M20 4 l-4 7h4l-4 7" opacity="0.6"/>
  </svg>
);

const PermitIcon = () => (
  <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
    {/* Document */}
    <rect x="7" y="4" width="18" height="24" rx="2" strokeLinejoin="round"/>
    <line x1="11" y1="11" x2="21" y2="11" strokeLinecap="round"/>
    <line x1="11" y1="16" x2="21" y2="16" strokeLinecap="round"/>
    <line x1="11" y1="21" x2="17" y2="21" strokeLinecap="round"/>
    {/* checkmark badge */}
    <circle cx="25" cy="27" r="6" fill="currentColor" stroke="none" opacity="0.15"/>
    <circle cx="25" cy="27" r="6" strokeWidth="1.5"/>
    <path d="M22 27 l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
);

const serviceIcons = [VinylIcon, AluminumIcon, ChainLinkIcon, WoodIcon, RepairIcon, PermitIcon];

const services = [
  {
    title: "Vinyl fence installation",
    description:
      "Low-maintenance vinyl fences that stay bright and clean, perfect for privacy and curb appeal in Florida's coastal climate.",
  },
  {
    title: "Aluminum fence installation",
    description:
      "Sleek, durable aluminum fences that won't rust and are ideal for pools, front yards, and HOA communities.",
  },
  {
    title: "Chain-link fence installation",
    description:
      "A cost-effective way to secure your property, pets, or work areas without blocking visibility.",
  },
  {
    title: "Wood fence installation",
    description:
      "Classic wood fences with modern hardware and proper post setting so they don't lean or sag after the first storm.",
  },
  {
    title: "Fence repair & storm damage",
    description:
      "We fix leaning panels, broken posts, and storm-damaged sections so you don't have to replace the whole fence.",
  },
  {
    title: "HOA & permits assistance",
    description:
      "We help you navigate HOA guidelines and local permitting so your fence is approved the first time.",
  },
];

export default function ServicesSection() {
  const { tr } = useLanguage();
  const s = tr.services;

  return (
    <section
      id="services"
      className="w-full bg-brand-cream py-12 md:py-16 border-t border-brand-light/50"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl text-center mx-auto mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-brand-deep"
          >
            {s.sectionHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm md:text-base text-brand-deep/70"
          >
            {s.sectionSub}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {s.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={clsx(
                  "relative overflow-hidden rounded-2xl border border-brand-light/80",
                  "bg-white shadow-sm hover:shadow-md hover:-translate-y-1",
                  "transition-transform duration-200"
                )}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-light/40 via-transparent to-brand-yellow/30" />
                <div className="relative p-4 md:p-5 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-deep flex items-center justify-center text-brand-yellow shrink-0">
                      <Icon />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-brand-deep leading-snug pt-1">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-brand-deep/80 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
