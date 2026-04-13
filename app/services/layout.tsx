import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fence Services | Vinyl, Aluminum, Wood & Chain-Link — SmoothFenceUSA",
  description: "Professional fence installation, repair, and HOA assistance in Palm Coast, FL. Vinyl, aluminum, chain-link, and wood fences built for Florida weather.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
