import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("daytona");

export default function Page() {
  return <AreaLanding slug="daytona" />;
}
