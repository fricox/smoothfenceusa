"use client";

import { useLanguage } from "@/contexts/LanguageContext";

/* ──────────────────────────────────────────────
   FinancingBanner — reusable Hearth Financing CTA
   ────────────────────────────────────────────── */

// Merchant-specific Hearth prequalify URL (Smooth Fence USA / Federico)
const HEARTH_MERCHANT_URL =
  "https://app.gethearth.com/partners/smooth-fence-usa/federico/apply";

// Example monthly payment shown in copy (12-month 0% APR on a $5,000 project)
const EXAMPLE_MONTHLY = 417;

type Variant = "large" | "inline";

type FinancingBannerProps = {
  /** Visual variant. `large` = full-width section for home/LPs; `inline` = compact row for mid-page. */
  variant?: Variant;
  /** Source tag appended to utm_content for tracking where the click came from. */
  source?: string;
};

/**
 * Builds the Hearth merchant URL with UTM parameters for attribution.
 * Mirrors the attribution pattern used across the rest of the site (see lib/attribution.ts).
 */
function buildHearthUrl(source: string): string {
  const params = new URLSearchParams({
    utm_source: "smoothfenceusa",
    utm_medium: "website",
    utm_campaign: "financing_banner",
    utm_content: source,
  });
  return `${HEARTH_MERCHANT_URL}?${params.toString()}`;
}

export default function FinancingBanner({
  variant = "large",
  source = "generic",
}: FinancingBannerProps) {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  const t = {
    label: isEs ? "FINANCIAMIENTO DISPONIBLE" : "FINANCING AVAILABLE",
    heading: isEs
      ? `Tu cerca desde $${EXAMPLE_MONTHLY}/mes`
      : `Your fence from $${EXAMPLE_MONTHLY}/mo`,
    sub: isEs
      ? "Precalifica en 60 segundos con Hearth. Plazos hasta 12 años, APR competitivo, sin impacto a tu crédito."
      : "Prequalify in 60 seconds with Hearth. Terms up to 12 years, competitive APR, no impact to your credit.",
    cta: isEs ? "Precalificar ahora" : "Prequalify now",
    disclaimer: isEs
      ? "Ejemplo: $5,000 a 12 meses con 0% APR. Los términos reales dependen de tu aplicación."
      : "Example: $5,000 over 12 months at 0% APR. Actual terms depend on your application.",
    inlineHeadingEs: "¿Prefieres financiarlo?",
    inlineHeadingEn: "Want to finance it?",
    inlineSubEs: `Paga tu cerca desde ~$${EXAMPLE_MONTHLY}/mes con Hearth. Precalifica en 60 segundos sin afectar tu crédito.`,
    inlineSubEn: `Pay for your fence from ~$${EXAMPLE_MONTHLY}/mo with Hearth. Prequalify in 60 seconds — no credit impact.`,
  };

  const href = buildHearthUrl(source);

  if (variant === "inline") {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-emerald-600 to-brand-green px-6 py-6 text-white shadow-md sm:px-8 sm:py-7 lg:flex-row lg:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              {t.label}
            </p>
            <h3 className="mt-2 text-xl font-bold sm:text-2xl">
              {isEs ? t.inlineHeadingEs : t.inlineHeadingEn}
            </h3>
            <p className="mt-1 max-w-xl text-sm text-white/90 sm:text-base">
              {isEs ? t.inlineSubEs : t.inlineSubEn}
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-deep shadow-sm transition-all hover:bg-brand-yellow hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green sm:text-base"
          >
            {t.cta} →
          </a>
        </div>
      </section>
    );
  }

  // variant === "large"
  return (
    <section className="relative isolate overflow-hidden bg-brand-cream py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-brand-green to-emerald-700 px-6 py-10 text-center text-white shadow-lg sm:px-10 sm:py-12 lg:text-left">
          {/* Decorative dot pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
                {t.label}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {t.heading}
              </h2>
              <p className="mt-4 text-base text-white/90 sm:text-lg">
                {t.sub}
              </p>
              <p className="mt-3 text-xs text-white/70 sm:text-sm">
                {t.disclaimer}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-deep shadow-md transition-all hover:bg-brand-yellow hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
              >
                {t.cta} →
              </a>
              <span className="text-center text-xs text-white/70 lg:text-left">
                {isEs
                  ? "Chequeo suave · Sin compromiso"
                  : "Soft credit check · No obligation"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
