import CountyLanding, { buildCountyMetadata } from "@/components/sections/CountyLanding";

export const metadata = buildCountyMetadata("putnam");

export default function Page() {
  return <CountyLanding slug="putnam" />;
}
