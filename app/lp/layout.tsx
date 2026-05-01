import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LpCallTracker from "./LpCallTracker";
import TrackedLink from "@/components/ui/TrackedLink";

// Paid landing pages share this minimal layout.
// Goal: zero distraction. The site's full nav (Services / Gallery / About /
// FAQ / Pay / etc.) is intentionally NOT rendered here — ad visitors should
// see only the offer and the form. The site Header/Footer/FloatingButtons
// detect /lp/* and return null, so this layout owns the entire chrome.

export const metadata: Metadata = {
  // Default for LPs unless the page overrides — search engines should never
  // index paid landers.
  robots: { index: false, follow: false },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Minimal LP header — logo + phone. No menu, no Pay, no language toggle. */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" aria-label="Smooth Fence USA home" className="flex shrink-0 items-center">
            <Image
              src="/logo.svg"
              alt="Smooth Fence USA"
              width={213}
              height={80}
              priority
              className="h-auto w-[150px] sm:w-[180px]"
            />
          </Link>
          <LpCallTracker />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Minimal LP footer — no cross-links, just legal/contact basics. */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-xs text-slate-600">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p>
            <strong>Smooth Fence USA</strong> · Licensed &amp; Insured · Florida
          </p>
          <p>
            <TrackedLink
              href="tel:+13864039460"
              tracking={{ kind: "contact", channel: "tel", location: "lp_footer" }}
              className="font-semibold text-brand-deep hover:underline"
            >
              (386) 403-9460
            </TrackedLink>
            {" · "}
            <TrackedLink
              href="mailto:info@smoothfenceusa.com"
              tracking={{ kind: "contact", channel: "email", location: "lp_footer" }}
              className="hover:underline"
            >
              info@smoothfenceusa.com
            </TrackedLink>
          </p>
          <p className="text-slate-400">© {new Date().getFullYear()} Smooth Fence USA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
