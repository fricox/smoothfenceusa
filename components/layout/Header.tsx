"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Estimator", href: "/estimator" },
  { label: "About", href: "/about" },
  { label: "HOA & Permits", href: "/hoas-permits" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b border-brand-light/60 bg-brand-cream transition-shadow",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="hidden bg-brand-deep text-brand-cream text-xs sm:text-sm md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <div className="flex items-center gap-6">
            <span className="font-medium">
              Email:{" "}
              <a
                href="mailto:info@smoothfenceusa.com"
                className="underline underline-offset-2 transition-colors hover:text-brand-yellow"
              >
                info@smoothfenceusa.com
              </a>
            </span>
            <span className="hidden lg:inline">
              Hours:{" "}
              <span className="font-semibold">Mon–Sat 8:00 AM – 6:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">Call us anytime:</span>
            <a
              href="tel:+13864039460"
              className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold text-brand-deep transition-colors hover:bg-brand-light sm:text-sm"
            >
              (386) 403-9460
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-brand-light/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="SmoothFenceUSA logo"
            width={190}
            height={60}
            priority
            className="h-auto w-[160px] sm:w-[190px]"
          />
          <span className="sr-only">SmoothFenceUSA</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const basePath = link.href.split("#")[0];
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(basePath);

            const baseLinkClasses =
              "relative inline-flex items-center px-2 py-1 text-sm md:text-base font-semibold tracking-tight transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-200";
            const activeClasses = "text-brand-deep after:w-full";
            const inactiveClasses =
              "text-brand-deep/70 hover:text-brand-deep hover:after:w-full";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  baseLinkClasses,
                  isActive ? activeClasses : inactiveClasses
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

          <div className="hidden md:block">
            <Link
              href="/quote"
              className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
            >
              Get a Free Quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition-colors hover:border-slate-400 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={clsx(
                  "block h-0.5 w-5 bg-current transition-transform",
                  isMenuOpen && "translate-y-1 rotate-45"
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-5 bg-current transition-opacity",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-5 bg-current transition-transform",
                  isMenuOpen && "-translate-y-1 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col gap-4 px-6 py-5 text-base font-medium text-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber-600"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="rounded-full bg-amber-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-500"
              onClick={closeMenu}
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


