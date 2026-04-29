import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("volusia");

export default function Page() {
  return <AreaLanding slug="volusia" />;
}
