import CountyLanding, { buildCountyMetadata } from "@/components/sections/CountyLanding";

export const metadata = buildCountyMetadata("flagler");

export default function Page() {
  return <CountyLanding slug="flagler" />;
}
