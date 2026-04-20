import CountyLanding, { buildCountyMetadata } from "@/components/sections/CountyLanding";

export const metadata = buildCountyMetadata("st-johns");

export default function Page() {
  return <CountyLanding slug="st-johns" />;
}
