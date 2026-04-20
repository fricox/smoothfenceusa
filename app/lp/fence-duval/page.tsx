import CountyLanding, { buildCountyMetadata } from "@/components/sections/CountyLanding";

export const metadata = buildCountyMetadata("duval");

export default function Page() {
  return <CountyLanding slug="duval" />;
}
