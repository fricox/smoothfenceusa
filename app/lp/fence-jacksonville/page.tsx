import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("jacksonville");

export default function Page() {
  return <AreaLanding slug="jacksonville" />;
}
