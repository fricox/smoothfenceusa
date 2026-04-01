import Link from "next/link";

const legalLinks = [
  { label: "Get a Free Quote", href: "/quote" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const socialLinks: { label: string; href: string }[] = [];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-deep text-brand-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="space-y-3 max-w-sm">
          <p className="text-xl font-semibold tracking-tight text-brand-yellow">
            SmoothFenceUSA
          </p>
          <p className="text-sm text-brand-cream/80">
            Custom fence installation experts serving Florida&apos;s coast with
            durable materials, HOA guidance, and worry-free permitting.
          </p>
          <div className="flex items-center gap-3 pt-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                {social.label.slice(0, 2)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            Contact
          </p>
          <ul className="mt-3 space-y-1 text-sm text-brand-cream/80">
            <li>
              Phone:{" "}
              <a href="tel:+13864039460" className="transition-colors hover:text-brand-yellow">
                (386) 403-9460
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:info@smoothfenceusa.com" className="transition-colors hover:text-brand-yellow">
                info@smoothfenceusa.com
              </a>
            </li>
            <li>Service area: Palm Coast & surrounding areas</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-light">
            Links
          </p>
          <ul className="mt-3 space-y-1 text-sm text-brand-cream/80">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-brand-yellow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="px-4 py-6 text-center text-xs text-brand-cream/70">
          © {currentYear} SmoothFenceUSA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


