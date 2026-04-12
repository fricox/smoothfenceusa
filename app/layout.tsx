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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmoothFenceUSA | Palm Coast Fence Installation",
  description:
    "SmoothFenceUSA installs vinyl, aluminum, chain-link, and wood fences across Palm Coast with full HOA and permit support.",
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
              name: "SmoothFenceUSA",
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
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: { "@type": "GeoCoordinates", latitude: 29.5846, longitude: -81.2079 },
                geoRadius: "50000",
              },
              priceRange: "$$",
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
