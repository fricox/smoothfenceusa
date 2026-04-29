import AreaLanding, { buildAreaMetadata } from "@/components/sections/AreaLanding";

export const metadata = buildAreaMetadata("putnam");

export default function Page() {
  return <AreaLanding slug="putnam" />;
}
