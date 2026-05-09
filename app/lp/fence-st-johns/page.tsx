import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("st-johns");

export default function Page() {
  return <AreaLanding slug="st-johns" />;
}
