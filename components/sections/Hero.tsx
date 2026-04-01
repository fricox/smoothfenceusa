"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center bg-brand-cream text-brand-deep">
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
          className="grid gap-10 items-center lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        >
          <div className="space-y-4 text-center lg:text-left">
            <h1
              className="
                text-4xl sm:text-5xl lg:text-6xl
                font-extrabold tracking-tight
                text-brand-deep
                animate-[fadeInUp_0.7s_ease-out]
              "
            >
              Caring for fences since 2015
            </h1>
            <p
              className="
                mt-4
                max-w-xl
                text-lg sm:text-xl lg:text-2xl
                font-medium
                text-brand-deep/90
                animate-[fadeInUp_0.7s_ease-out_0.15s]
              "
            >
              Clean work. Clear updates. Zero headaches.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-deep/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green" />
                <span>Licensed &amp; insured crew</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-yellow" />
                <span>Fast, clean installations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-deep" />
                <span>HOA &amp; permits support</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="/quote"
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  bg-brand-deep px-6 py-3
                  text-sm sm:text-base font-semibold text-white
                  shadow-md shadow-brand-deep/20
                  transition-transform transition-shadow duration-150
                  hover:bg-brand-green
                  hover:shadow-lg hover:-translate-y-[1px]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow
                  focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream
                "
              >
                Get a Free Quote
              </a>
              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  border border-brand-deep
                  px-6 py-3
                  text-sm sm:text-base font-semibold text-brand-deep
                  bg-white/80
                  shadow-sm shadow-brand-deep/10
                  transition-transform transition-shadow duration-150
                  hover:bg-brand-light/20 hover:shadow-md hover:-translate-y-[1px]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep
                  focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream
                "
              >
                Contact Us
              </a>
            </div>
          </div>

          <aside className="mx-auto w-full max-w-md rounded-3xl border border-brand-light bg-white/95 p-6 text-left shadow-lg shadow-brand-deep/10 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
              Get your free fence quote
            </p>
            <h2 className="mt-2 text-2xl font-bold text-brand-deep">
              Quick estimate for your next fence
            </h2>
            <p className="mt-3 text-sm text-brand-deep/80">
              Tell us about your property and fence type. We’ll respond with a clear,
              no-pressure estimate for your project.
            </p>
            <div className="mt-5 space-y-3">
              <a
                href="/quote"
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-deep px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green"
              >
                Get a Free Quote
              </a>
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-brand-deep px-4 py-2 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-light/20"
              >
                Contact Us
              </a>
            </div>
            <p className="mt-3 text-xs text-brand-deep/60">
              Serving Palm Coast and nearby areas with vinyl, aluminum,
              chain-link, and wood fences.
            </p>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
