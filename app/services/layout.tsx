import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fence Services | Vinyl, Aluminum, Wood & Chain-Link — Smooth Fence USA",
  description: "Professional fence installation, repair, and HOA assistance across Flagler, Volusia, St. Johns, Duval, and Putnam counties in Northeast Florida. Vinyl, aluminum, chain-link, and wood fences built for Florida weather.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
