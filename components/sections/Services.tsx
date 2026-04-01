"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

const services = [
  {
    title: "Vinyl fence installation",
    description:
      "Low-maintenance vinyl fences that stay bright and clean, perfect for privacy and curb appeal in Florida’s coastal climate.",
  },
  {
    title: "Aluminum fence installation",
    description:
      "Sleek, durable aluminum fences that won’t rust and are ideal for pools, front yards, and HOA communities.",
  },
  {
    title: "Chain-link fence installation",
    description:
      "A cost-effective way to secure your property, pets, or work areas without blocking visibility.",
  },
  {
    title: "Wood fence installation",
    description:
      "Classic wood fences with modern hardware and proper post setting so they don’t lean or sag after the first storm.",
  },
  {
    title: "Fence repair & storm damage",
    description:
      "We fix leaning panels, broken posts, and storm-damaged sections so you don’t have to replace the whole fence.",
  },
  {
    title: "HOA & permits assistance",
    description:
      "We help you navigate HOA guidelines and local permitting so your fence is approved the first time.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full bg-brand-cream py-12 md:py-16 border-t border-brand-light/50"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Título */}
        <div className="max-w-3xl text-center mx-auto mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-brand-deep"
          >
            Fence services for Palm Coast properties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm md:text-base text-brand-deep/70"
          >
            Installations, repairs, and HOA support handled by a crew that knows
            Florida’s climate and permitting rules.
          </motion.p>
        </div>

        {/* Grid de servicios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
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
                  <div className="h-9 w-9 rounded-xl bg-brand-deep flex items-center justify-center text-sm text-brand-yellow font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-brand-deep leading-snug">
                    {service.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-brand-deep/80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
