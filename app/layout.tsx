import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-brand-cream text-brand-deep antialiased`}
      >
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
