import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("st-augustine");

export default function Page() {
  return <AreaLanding slug="st-augustine" />;
}
