import type { Metadata } from "next";
import CTA from "@/components/layout/CTA";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustBadges from "@/components/sections/TrustBadges";
import ServiceArea from "@/components/sections/ServiceArea";
import FinancingBanner from "@/components/sections/FinancingBanner";

export const metadata: Metadata = {
  title: "Smooth Fence USA | Fence Installation in Northeast Florida",
  description: "Professional vinyl, aluminum, chain-link, and wood fence installation across Flagler, Volusia, St. Johns, Duval, and Putnam counties in Northeast Florida. Free estimates, licensed & insured.",
  openGraph: {
    title: "Smooth Fence USA | Fence Installation in Northeast Florida",
    description: "Professional fence installation across Flagler, Volusia, St. Johns, Duval & Putnam counties — vinyl, aluminum, chain-link, and wood. Free estimates. Licensed & insured.",
    siteName: "Smooth Fence USA",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <WhyChooseUs />
      <FinancingBanner variant="large" source="home" />
      <ServiceArea />
      <CTA />
    </>
  );
}
