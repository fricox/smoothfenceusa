import CountyLanding, { buildCountyMetadata } from "@/components/sections/CountyLanding";

export const metadata = buildCountyMetadata("volusia");

export default function Page() {
  return <CountyLanding slug="volusia" />;
}
