import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SmoothFenceUSA | Palm Coast Fence Company",
  description: "Learn about SmoothFenceUSA — a locally owned fence installation company serving Palm Coast, Flagler County, and Northeast Florida with 10+ years of experience.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
