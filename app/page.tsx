import type { Metadata } from "next";
import CTA from "@/components/layout/CTA";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustBadges from "@/components/sections/TrustBadges";
import ServiceArea from "@/components/sections/ServiceArea";

export const metadata: Metadata = {
  title: "SmoothFenceUSA | Fence Installation in Palm Coast & Northeast Florida",
  description: "Professional vinyl, aluminum, chain-link, and wood fence installation in Palm Coast, Flagler County, and Northeast Florida. Free estimates, licensed & insured.",
  openGraph: {
    title: "SmoothFenceUSA | Fence Installation in Palm Coast, FL",
    description: "Professional fence installation — vinyl, aluminum, chain-link, and wood. Free estimates. Licensed & insured.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <WhyChooseUs />
      <ServiceArea />
      <CTA />
    </>
  );
}
