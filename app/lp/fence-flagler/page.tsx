import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("flagler");

export default function Page() {
  return <AreaLanding slug="flagler" />;
}
