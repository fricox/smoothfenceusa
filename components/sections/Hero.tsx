"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import EstimatorClient from "@/app/estimator/EstimatorClient";
import FenceAnimation from "@/components/sections/FenceAnimation";

export default function Hero() {
  const { tr } = useLanguage();

  return (
    <section className="relative w-full bg-brand-cream text-brand-deep">
      <Image
        src="/hero-fence-optimized.jpg"
        alt="Professional fence installation by SmoothFenceUSA in Palm Coast, Florida"
        fill
        priority
        className="object-cover opacity-35"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid gap-10 items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          {/* Left: headline */}
          <div className="space-y-4 text-center lg:text-left lg:pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
              {tr.hero.tagline}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-deep">
              {tr.hero.heading}
            </h1>
            <p className="mt-4 max-w-xl text-lg sm:text-xl font-medium text-brand-deep/90">
              {tr.hero.subheading}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="https://calendly.com/federico-smoothfenceusa/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-brand-deep px-6 py-3 text-sm sm:text-base font-semibold text-brand-deep bg-white/80 shadow-sm transition-transform duration-150 hover:bg-brand-light/20 hover:shadow-md hover:-translate-y-[1px]"
              >
                {tr.hero.schedule}
              </a>
            </div>

            {/* Fence animation */}
            <div className="mt-4">
              <FenceAnimation />
            </div>
          </div>

          {/* Right: full estimator */}
          <aside className="mx-auto w-full max-w-lg rounded-3xl border border-brand-light bg-white/97 shadow-xl shadow-brand-deep/10 backdrop-blur-sm overflow-hidden">
            <EstimatorClient inline />
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
