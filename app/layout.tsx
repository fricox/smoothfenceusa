import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import AttributionCapture from "@/components/ui/AttributionCapture";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smooth Fence USA | Northeast Florida Fence Installation",
  description:
    "Smooth Fence USA installs vinyl, aluminum, chain-link, and wood fences across Flagler, Volusia, St. Johns, Duval & Putnam counties with full HOA and permit support.",
  applicationName: "Smooth Fence USA",
  openGraph: {
    siteName: "Smooth Fence USA",
    type: "website",
    url: "https://smoothfenceusa.com",
  },
  icons: {
    icon: [
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FencingContractor",
              name: "Smooth Fence USA",
              url: "https://smoothfenceusa.com",
              telephone: "+1-386-403-9460",
              email: "info@smoothfenceusa.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Palm Coast",
                addressRegion: "FL",
                postalCode: "32137",
                addressCountry: "US",
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Flagler County, FL" },
                { "@type": "AdministrativeArea", name: "Volusia County, FL" },
                { "@type": "AdministrativeArea", name: "St. Johns County, FL" },
                { "@type": "AdministrativeArea", name: "Duval County, FL" },
                { "@type": "AdministrativeArea", name: "Putnam County, FL" },
              ],
              priceRange: "$$",
            }),
          }}
        />
        {/* WebSite structured data — canonical brand name for Google SERP site name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Smooth Fence USA",
              alternateName: "SmoothFenceUSA",
              url: "https://smoothfenceusa.com",
            }),
          }}
        />
        {/* Conditional GTM — only loads when NEXT_PUBLIC_GTM_ID is set */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        {/* Google Ads conversion tracking (gtag.js) */}
        {GOOGLE_ADS_ID && (
          <>
            <Script
              id="gtag-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-brand-cream text-brand-deep antialiased`}
      >
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <AttributionCapture />
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingButtons />
          </div>
        </LanguageProvider>
        {/* Fency AI chatbot widget — loads from separate Vercel deployment */}
        <Script
          src="https://smoothfence-chatbot.vercel.app/api/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
