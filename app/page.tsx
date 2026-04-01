import CTA from "@/components/layout/CTA";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustBadges from "@/components/sections/TrustBadges";
import ServiceArea from "@/components/sections/ServiceArea";

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
