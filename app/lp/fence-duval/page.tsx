import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("duval");

export default function Page() {
  return <AreaLanding slug="duval" />;
}
