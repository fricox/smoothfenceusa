"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesFAQ() {
  const { tr } = useLanguage();
  const s = tr.services;
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((x) => (x === id ? null : id));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 text-center lg:mb-8 lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
          {s.faqLabel}
        </p>
        <h2 className="text-2xl font-bold text-brand-deep sm:text-3xl">
          {s.faqHeading}
        </h2>
        <p className="mt-2 text-sm text-brand-deep/80 sm:text-base">
          {s.faqSub}
        </p>
      </div>

      <div className="space-y-3">
        {s.faqs.map((item, index) => {
          const isOpen = openId === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-brand-light bg-white/90 shadow-sm shadow-brand-deep/5"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-4 py-3 text-left sm:px-5 sm:py-4"
              >
                <span className="text-sm font-semibold text-brand-deep sm:text-base">
                  {item.question}
                </span>
                <span
                  className={clsx(
                    "ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-light text-xs font-bold text-brand-deep transition-transform",
                    isOpen ? "rotate-45 bg-brand-light/40" : "bg-brand-cream"
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={clsx(
                  "px-4 pb-3 text-sm text-brand-deep/80 transition-[max-height] duration-200 ease-out sm:px-5 sm:pb-4",
                  isOpen ? "max-h-40" : "max-h-0"
                )}
              >
                {isOpen && <p className="pt-1">{item.answer}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
