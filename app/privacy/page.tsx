import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Smooth Fence USA",
  description:
    "How Smooth Fence USA collects, uses, and protects your information when you request a fence estimate or use our website.",
  alternates: { canonical: "https://www.smoothfenceusa.com/privacy" },
};

const LAST_UPDATED = "April 29, 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-brand-deep sm:px-6 lg:py-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-brand-deep/60">
          Last updated: {LAST_UPDATED}
        </p>

        <p className="mt-6 text-base text-brand-deep/80">
          Smooth Fence USA (&quot;Smooth Fence,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) operates{" "}
          <Link href="/" className="text-brand-green underline">
            smoothfenceusa.com
          </Link>{" "}
          and provides fence installation and repair services in Florida. This
          Privacy Policy explains how we collect, use, share, and protect
          information when you visit our website, submit a quote request, call
          us, or interact with our ads on Google, Meta (Facebook/Instagram), or
          other platforms.
        </p>

        <h2 className="mt-10 text-2xl font-bold">1. Information we collect</h2>

        <h3 className="mt-4 text-lg font-semibold">
          Information you provide directly
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>
            <strong>Contact details:</strong> name, phone number, email
            address, ZIP code, and street address (when provided).
          </li>
          <li>
            <strong>Project details:</strong> fence type, linear feet, HOA
            information, preferred installation date, and any additional
            messages you send through our forms.
          </li>
          <li>
            <strong>Payment information:</strong> if you pay a deposit, payment
            details (card number, billing address) are collected and processed
            by our payment processor, Stripe. We do not store full card numbers
            on our servers.
          </li>
          <li>
            <strong>Communications:</strong> records of phone calls, text
            messages, emails, or chat exchanges with our team.
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          Information collected automatically
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>
            <strong>Device and usage data:</strong> IP address, browser type,
            operating system, referring URL, pages viewed, and timestamps.
          </li>
          <li>
            <strong>Marketing attribution:</strong> UTM parameters, Google
            Click ID (gclid), Meta Click ID (fbclid), and similar identifiers
            that tell us which ad or channel sent you to our site.
          </li>
          <li>
            <strong>Cookies and tracking technologies:</strong> see Section 4.
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          Information from third parties
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>
            When you submit a lead form on Facebook or Instagram, Meta provides
            us with the contact details you confirm in that form.
          </li>
          <li>
            When you click a Google Ad or Local Services Ad, Google provides
            attribution and conversion data.
          </li>
          <li>
            If you finance your project through our partner (Hearth), the
            financing provider may share status updates with us.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold">2. How we use information</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>Respond to your quote request, schedule site visits, and provide our services.</li>
          <li>Send you estimates, invoices, scheduling confirmations, and project updates.</li>
          <li>Process deposits and payments.</li>
          <li>Improve our website, ads, and customer experience.</li>
          <li>Measure ad performance and optimize marketing campaigns.</li>
          <li>Comply with legal obligations and enforce our terms.</li>
          <li>Prevent fraud and protect our business and customers.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold">3. How we share information</h2>
        <p className="mt-2 text-brand-deep/80">
          We do not sell your personal information. We share it only with the
          following categories of recipients:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>
            <strong>Service providers</strong> who perform work on our behalf,
            such as: Stripe (payments), Resend (transactional email), Google
            Workspace and Google Sheets (CRM and email), Vercel (website
            hosting), Twilio (SMS, if applicable), and Hearth (financing).
          </li>
          <li>
            <strong>Advertising partners</strong> (Google, Meta, and similar)
            for the purpose of measuring ad effectiveness and showing relevant
            ads. This may include hashed contact information used in
            privacy-safe matching (e.g., Google&apos;s Enhanced Conversions or
            Meta&apos;s Conversions API).
          </li>
          <li>
            <strong>Subcontractors</strong> we engage to deliver fence
            installation, only when needed to complete your project.
          </li>
          <li>
            <strong>Legal and safety</strong> recipients, such as law
            enforcement or regulators, when required by law or to protect
            rights, property, or safety.
          </li>
          <li>
            <strong>Successors</strong> in the event of a merger, acquisition,
            or sale of assets, with notice to you.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold">
          4. Cookies, analytics, and ad tracking
        </h2>
        <p className="mt-2 text-brand-deep/80">
          We use cookies, pixels, and similar technologies to operate our site
          and measure marketing performance. Specifically:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>
            <strong>Google Tag Manager and Google Analytics 4</strong> for
            usage analytics.
          </li>
          <li>
            <strong>Google Ads</strong> for conversion tracking and remarketing.
          </li>
          <li>
            <strong>Meta Pixel and Conversions API</strong> for measuring
            Facebook and Instagram ad performance and showing relevant ads.
          </li>
          <li>
            <strong>First-party attribution cookies</strong> set by our site to
            remember which campaign sent you to us.
          </li>
        </ul>
        <p className="mt-3 text-brand-deep/80">
          You can disable cookies in your browser settings or opt out of
          interest-based advertising through{" "}
          <a
            href="https://optout.aboutads.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green underline"
          >
            the Digital Advertising Alliance
          </a>{" "}
          or{" "}
          <a
            href="https://www.networkadvertising.org/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green underline"
          >
            the Network Advertising Initiative
          </a>
          . Disabling cookies may limit some site functionality.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          5. Phone calls and text messages (SMS)
        </h2>
        <p className="mt-2 text-brand-deep/80">
          When you provide your phone number through our forms or a Meta /
          Google lead ad, you agree to receive phone calls and text messages
          from Smooth Fence USA at that number regarding your fence project,
          including estimates, scheduling, and follow-ups. Message frequency
          varies. Message and data rates may apply. You can opt out of SMS at
          any time by replying <strong>STOP</strong> to any text message from
          us. Replying <strong>HELP</strong> returns contact information.
          Opting out of SMS does not affect any other use of your phone number.
        </p>

        <h2 className="mt-10 text-2xl font-bold">6. Your privacy rights</h2>
        <p className="mt-2 text-brand-deep/80">
          Depending on where you live, you may have rights to:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-brand-deep/80">
          <li>Access the personal information we hold about you.</li>
          <li>Correct inaccurate information.</li>
          <li>Request deletion of your personal information.</li>
          <li>Opt out of the sale or sharing of personal information for cross-context behavioral advertising.</li>
          <li>Limit our use of sensitive personal information.</li>
          <li>Receive a copy of your information in a portable format.</li>
        </ul>
        <p className="mt-3 text-brand-deep/80">
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:info@smoothfenceusa.com"
            className="text-brand-green underline"
          >
            info@smoothfenceusa.com
          </a>{" "}
          or call <strong>(386) 403-9460</strong>. We will respond within
          applicable legal timeframes (typically 30–45 days). We will not
          discriminate against you for exercising these rights.
        </p>

        <h3 className="mt-4 text-lg font-semibold">
          California residents (CCPA / CPRA)
        </h3>
        <p className="mt-2 text-brand-deep/80">
          If you reside in California, you have the rights described above
          under the California Consumer Privacy Act, as amended. We do not sell
          personal information for monetary value, but our use of advertising
          cookies may be considered &quot;sharing&quot; under California law.
          You can opt out by emailing{" "}
          <a
            href="mailto:info@smoothfenceusa.com"
            className="text-brand-green underline"
          >
            info@smoothfenceusa.com
          </a>{" "}
          with the subject &quot;Do Not Sell or Share My Information.&quot;
        </p>

        <h2 className="mt-10 text-2xl font-bold">7. Children</h2>
        <p className="mt-2 text-brand-deep/80">
          Our services and website are not directed to children under 13, and
          we do not knowingly collect personal information from children under
          13. If you believe we have collected information from a child,
          please contact us so we can delete it.
        </p>

        <h2 className="mt-10 text-2xl font-bold">8. Data retention</h2>
        <p className="mt-2 text-brand-deep/80">
          We retain personal information for as long as needed to provide our
          services, complete projects, comply with tax and accounting
          obligations (typically 7 years for financial records), resolve
          disputes, and enforce our agreements. Marketing data is retained for
          up to 2 years from your last interaction unless you request deletion
          sooner.
        </p>

        <h2 className="mt-10 text-2xl font-bold">9. Security</h2>
        <p className="mt-2 text-brand-deep/80">
          We use reasonable administrative, technical, and physical safeguards
          to protect personal information, including encryption in transit
          (HTTPS/TLS), access controls, and trusted service providers. No
          system is 100% secure; we cannot guarantee absolute security.
        </p>

        <h2 className="mt-10 text-2xl font-bold">10. Third-party links</h2>
        <p className="mt-2 text-brand-deep/80">
          Our site may link to third-party websites (e.g., financing partners,
          Google Maps, social media). We are not responsible for the privacy
          practices of those sites. Review each site&apos;s privacy policy
          before sharing information.
        </p>

        <h2 className="mt-10 text-2xl font-bold">11. Changes to this policy</h2>
        <p className="mt-2 text-brand-deep/80">
          We may update this Privacy Policy from time to time. When we do, we
          will revise the &quot;Last updated&quot; date at the top of this
          page. Material changes will be communicated through the website or
          by email when appropriate.
        </p>

        <h2 className="mt-10 text-2xl font-bold">12. Contact us</h2>
        <p className="mt-2 text-brand-deep/80">
          Questions about this policy or our privacy practices? Reach us at:
        </p>
        <div className="mt-3 rounded-2xl border border-brand-light bg-white px-5 py-5 text-sm text-brand-deep/80">
          <p>
            <strong>Smooth Fence USA</strong>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+13864039460" className="text-brand-green underline">
              (386) 403-9460
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@smoothfenceusa.com"
              className="text-brand-green underline"
            >
              info@smoothfenceusa.com
            </a>
          </p>
          <p>Service area: Northeast Florida (Duval, St. Johns, Volusia, Putnam, and Flagler counties)</p>
        </div>
      </section>
    </main>
  );
}
