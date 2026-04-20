"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";
import { trackClickToContact } from "@/lib/track-click";

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
    { label: tr.nav.financing, href: "/financing" },
    { label: tr.nav.faq, href: "/faq" },
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
      {/* Top bar — desktop only */}
      <div className="hidden bg-brand-deep text-brand-cream text-xs md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
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
            <span className="hidden lg:inline">{tr.topbar.callUs}</span>
            <a
              href="tel:+13864039460"
              onClick={() => trackClickToContact("tel", "topbar")}
              className="rounded-full bg-brand-yellow px-3 py-1 font-semibold text-brand-deep transition-colors hover:bg-brand-light"
            >
              (386) 403-9460
            </a>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="border-b border-brand-light/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.svg"
              alt="Smooth Fence USA logo"
              width={213}
              height={80}
              priority
              className="h-auto w-[150px] sm:w-[180px] lg:w-[200px]"
            />
            <span className="sr-only">Smooth Fence USA</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex">
            {navLinks.map((link) => {
              const basePath = link.href.split("#")[0];
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(basePath);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative whitespace-nowrap px-1 py-1 text-sm font-semibold tracking-tight transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-200",
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

          {/* Desktop right-side actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {/* Language toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-brand-light px-2.5 py-1.5 text-xs font-semibold text-brand-deep transition-colors hover:border-brand-green hover:text-brand-green"
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
              className="whitespace-nowrap rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-deep shadow-sm transition-colors hover:bg-brand-light"
            >
              💳 {lang === "es" ? "Pagar" : "Pay"}
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
            >
              {tr.nav.getFreeQuote}
            </Link>
          </div>

          {/* Mobile right-side actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Call button */}
            <a
              href="tel:+13864039460"
              onClick={() => trackClickToContact("tel", "header_mobile")}
              aria-label="Call (386) 403-9460"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white shadow-sm transition-colors hover:bg-brand-deep"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Pay button */}
            <Link
              href="/pay"
              aria-label={lang === "es" ? "Pagar" : "Pay"}
              className="flex h-10 items-center gap-1 rounded-full bg-brand-yellow px-3 text-sm font-bold text-brand-deep shadow-sm transition-colors hover:bg-brand-light"
            >
              <span>💳</span>
              <span className="hidden xs:inline sm:inline">{lang === "es" ? "Pagar" : "Pay"}</span>
            </Link>
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-light text-brand-deep transition-colors hover:border-brand-green"
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
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-brand-light/60 bg-white lg:hidden">
          <nav className="flex flex-col gap-2 px-6 py-5 text-base font-medium text-brand-deep">
            {navLinks.map((link) => {
              const basePath = link.href.split("#")[0];
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(basePath);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "rounded-lg px-3 py-2 transition-colors",
                    isActive ? "bg-brand-light/40 font-bold text-brand-deep" : "hover:bg-brand-cream"
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Language switcher */}
            <div className="mt-2 flex gap-2 border-t border-brand-light/60 pt-4">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { setLang(l.code); closeMenu(); }}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    lang === l.code
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-brand-light text-brand-deep hover:border-brand-green"
                  )}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href="tel:+13864039460"
                onClick={() => { trackClickToContact("tel", "header_mobile_menu"); closeMenu(); }}
                className="flex items-center justify-center gap-2 rounded-full bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-deep"
              >
                📞 {lang === "es" ? "Llamar" : "Call"}
              </a>
              <Link
                href="/pay"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-deep shadow-sm transition-colors hover:bg-brand-light"
              >
                💳 {lang === "es" ? "Pagar" : "Pay"}
              </Link>
            </div>
            <Link
              href="/contact"
              className="mt-1 rounded-full bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
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
