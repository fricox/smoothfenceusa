import type { Metadata } from "next";
import FAQPageClient from "@/components/sections/FAQPageClient";
import { FAQ_CATEGORIES_EN } from "@/lib/faq-data";

const SITE_URL = "https://smoothfenceusa.com";

export const metadata: Metadata = {
  title: "FAQ | Smooth Fence USA — Northeast Florida",
  description:
    "Everything about vinyl, aluminum, wood, and chain-link fence installation, estimates, financing, and warranty across Flagler, Volusia, St. Johns, Duval, and Putnam counties.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "Frequently Asked Questions | Smooth Fence USA",
    description:
      "Answers about fence installation, repair, materials, HOA/permits, warranty, and financing across Northeast Florida.",
    url: `${SITE_URL}/faq`,
    siteName: "Smooth Fence USA",
    type: "website",
  },
};

// JSON-LD FAQPage schema — rendered server-side in EN (crawler baseline,
// ES toggle happens client-side and doesn't affect the indexed answers).
const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES_EN.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <FAQPageClient />
    </>
  );
}
