"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackClickToContact } from "@/lib/track-click";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { tr } = useLanguage();

  const quickLinks = [
    { label: tr.nav.getFreeQuote, href: "/contact" },
    { label: tr.nav.services, href: "/services" },
    { label: tr.nav.gallery, href: "/gallery" },
    { label: tr.nav.estimator, href: "/estimator" },
    { label: tr.nav.faq, href: "/faq" },
    { label: tr.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-brand-deep text-brand-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="space-y-3 max-w-sm">
          <p className="text-xl font-semibold tracking-tight text-brand-yellow">
            Smooth Fence USA
          </p>
          <p className="text-sm text-brand-cream/80">
            {tr.footer.tagline}
          </p>
          <p className="text-xs text-brand-cream/50">{tr.topbar.hours}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            {tr.nav.contact}
          </p>
          <ul className="mt-3 space-y-1 text-sm text-brand-cream/80">
            <li>
              <a href="tel:+13864039460" onClick={() => trackClickToContact("tel", "footer")} className="transition-colors hover:text-brand-yellow">
                (386) 403-9460
              </a>
            </li>
            <li>
              <a href="sms:+13864039460" onClick={() => trackClickToContact("sms", "footer")} className="transition-colors hover:text-brand-yellow">
                SMS / Text us
              </a>
            </li>
            <li>
              <a href="mailto:info@smoothfenceusa.com" className="transition-colors hover:text-brand-yellow">
                info@smoothfenceusa.com
              </a>
            </li>
            <li className="text-brand-cream/60">Flagler · Volusia · St. Johns · Duval · Putnam, FL</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            {tr.footer.quickLinks}
          </p>
          <ul className="mt-3 space-y-1 text-sm text-brand-cream/80">
            {quickLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="transition-colors hover:text-brand-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="px-4 py-6 text-center text-xs text-brand-cream/70">
          © {currentYear} Smooth Fence USA. {tr.footer.rights}
        </p>
      </div>
    </footer>
  );
}
