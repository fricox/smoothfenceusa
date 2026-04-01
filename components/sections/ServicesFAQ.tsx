"use client";

import { useState } from "react";
import { clsx } from "clsx";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "What areas do you serve?",
    answer:
      "We primarily serve Palm Coast and surrounding communities. If you're slightly outside the zone, contact us and we’ll confirm availability.",
  },
  {
    id: 2,
    question: "Do you help with HOA approvals and permits?",
    answer:
      "Yes, we guide homeowners through HOA requirements and local permitting to avoid delays and rejections.",
  },
  {
    id: 3,
    question: "How long does a typical fence installation take?",
    answer:
      "Most residential fence projects take 1–3 days once materials are onsite and approvals are complete.",
  },
  {
    id: 4,
    question: "Can you repair part of my fence instead of replacing it?",
    answer:
      "Often yes. We repair damaged panels, leaning posts, and storm damage without replacing the entire fence.",
  },
  {
    id: 5,
    question: "Which fence material works best in Florida’s climate?",
    answer:
      "Vinyl and aluminum handle moisture, heat, and storms very well. Wood can also perform great with proper installation.",
  },
];

export default function ServicesFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((x) => (x === id ? null : id));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 text-center lg:mb-8 lg:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
          FAQ
        </p>
        <h2 className="text-2xl font-bold text-brand-deep sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-brand-deep/80 sm:text-base">
          These answers can be edited later with business-specific info.
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-brand-light bg-white/90 shadow-sm shadow-brand-deep/5"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
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




