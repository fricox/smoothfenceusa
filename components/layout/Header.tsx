"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, tr } = useLanguage();

  const navLinks = [
    { label: tr.nav.home, href: "/" },
    { label: tr.nav.services, href: "/services" },
    { label: tr.nav.gallery, href: "/gallery" },

    { label: tr.nav.about, href: "/about" },
    { label: tr.nav.hoaPermits, href: "/hoas-permits" },
    { label: tr.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const languages: { code: Lang; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const currentLang = languages.find((l) => l.code === lang)!;

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b border-brand-light/60 bg-brand-cream transition-shadow",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      {/* Top bar */}
      <div className="hidden bg-brand-deep text-brand-cream text-xs sm:text-sm md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <div className="flex items-center gap-6">
            <span className="font-medium">
              {tr.topbar.email}{" "}
              <a
                href="mailto:info@smoothfenceusa.com"
                className="underline underline-offset-2 transition-colors hover:text-brand-yellow"
              >
                info@smoothfenceusa.com
              </a>
            </span>
            <span className="hidden lg:inline">
              {tr.topbar.hours === "Mon–Sat 8:00 AM – 6:00 PM" ? "Hours: " : "Horario: "}
              <span className="font-semibold">{tr.topbar.hours}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">{tr.topbar.callUs}</span>
            <a
              href="tel:+13864039460"
              className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold text-brand-deep transition-colors hover:bg-brand-light sm:text-sm"
            >
              (386) 403-9460
            </a>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="border-b border-brand-light/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="SmoothFenceUSA logo"
              width={213}
              height={80}
              priority
              className="h-auto w-[170px] sm:w-[210px]"
            />
            <span className="sr-only">SmoothFenceUSA</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const basePath = link.href.split("#")[0];
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(basePath);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative inline-flex items-center px-2 py-1 text-sm md:text-base font-semibold tracking-tight transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-200",
                    isActive
                      ? "text-brand-deep after:w-full"
                      : "text-brand-deep/70 hover:text-brand-deep hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* Language toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-brand-light px-3 py-1.5 text-xs font-semibold text-brand-deep transition-colors hover:border-brand-green hover:text-brand-green"
                aria-label="Switch language"
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 opacity-60" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 rounded-2xl border border-brand-light bg-white py-1 shadow-xl">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                      className={clsx(
                        "flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-brand-light/30",
                        lang === l.code ? "font-bold text-brand-green" : "text-brand-deep"
                      )}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pay"
              className="rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-deep shadow-sm transition-colors hover:bg-brand-light mr-2"
            >
              💳 {lang === "es" ? "Pagar" : "Pay"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
            >
              {tr.nav.getFreeQuote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition-colors hover:border-slate-400 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={clsx("block h-0.5 w-5 bg-current transition-transform", isMenuOpen && "translate-y-1 rotate-45")} />
              <span className={clsx("block h-0.5 w-5 bg-current transition-opacity", isMenuOpen && "opacity-0")} />
              <span className={clsx("block h-0.5 w-5 bg-current transition-transform", isMenuOpen && "-translate-y-1 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col gap-4 px-6 py-5 text-base font-medium text-slate-800">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-amber-600" onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
            {/* Language switcher in mobile */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { setLang(l.code); closeMenu(); }}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    lang === l.code
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-slate-200 text-slate-700 hover:border-brand-green"
                  )}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-amber-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
              onClick={closeMenu}
            >
              {tr.nav.getFreeQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
