"use client";

import { clsx } from "clsx";

type Reason = {
  id: number;
  title: string;
  description: string;
  delayClass: string;
};

const reasons: Reason[] = [
  {
    id: 1,
    title: "You speak directly with the owner",
    description:
      "No middlemen. I personally supervise your project and make sure everything is done right from the beginning.",
    delayClass: "animate-[fadeInUp_0.7s_ease-out_0.05s]",
  },
  {
    id: 2,
    title: "Professional installation with no shortcuts",
    description:
      "Precise, level, and long-lasting work. I don’t subcontract — I handle the installation myself, and that guarantees real quality.",
    delayClass: "animate-[fadeInUp_0.7s_ease-out_0.15s]",
  },
  {
    id: 3,
    title: "Fair pricing with zero hidden fees",
    description:
      "You don’t pay for big offices or commission chains. You only pay for a well-built fence at the correct price.",
    delayClass: "animate-[fadeInUp_0.7s_ease-out_0.25s]",
  },
];

function FenceIcon({ variant }: { variant: 1 | 2 | 3 }) {
  const common = "stroke-brand-deep";
  if (variant === 1) {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <rect
          x="6"
          y="18"
          width="24"
          height="16"
          rx="2"
          className={common}
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M12 18v16M18 18v16M24 18v16"
          className={common}
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M30 10h8a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2l-3 3v-3h-3a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4Z"
          className={common}
          fill="none"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <rect
          x="8"
          y="16"
          width="20"
          height="16"
          rx="2"
          className={common}
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M13 16v16M19 16v16M25 16v16"
          className={common}
          fill="none"
          strokeWidth="2"
        />
        <rect
          x="28"
          y="10"
          width="12"
          height="28"
          rx="3"
          className={common}
          fill="none"
          strokeWidth="2"
        />
        <circle
          cx="34"
          cy="18"
          r="2"
          className={common}
          fill="none"
          strokeWidth="2"
        />
        <circle
          cx="34"
          cy="26"
          r="2"
          className={common}
          fill="none"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <rect
        x="6"
        y="18"
        width="22"
        height="16"
        rx="2"
        className={common}
        fill="none"
        strokeWidth="2"
      />
      <path
        d="M11 18v16M17 18v16M23 18v16"
        className={common}
        fill="none"
        strokeWidth="2"
      />
      <path
        d="M28 14 38 8l6 6-10 6-6-6Z"
        className={common}
        fill="none"
        strokeWidth="2"
      />
      <path
        d="m36 10 4 4"
        className={common}
        fill="none"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
            Why choose us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
            Not just another fence company
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-brand-deep/80">
            We keep things personal, professional, and honest — so you know
            exactly who is on your property and how your fence is being built.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:divide-x lg:divide-brand-light/60">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className={clsx(
                "flex flex-col items-center px-4 text-center lg:px-8"
              )}
            >
              <div
                className={clsx(
                  "mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow shadow-md shadow-brand-deep/15",
                  reason.delayClass
                )}
              >
                <FenceIcon variant={(index + 1) as 1 | 2 | 3} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-brand-deep">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-brand-deep/80">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




