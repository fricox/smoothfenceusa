import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOA & Permits Guide | SmoothFenceUSA — Palm Coast, FL",
  description: "Need HOA approval or a fence permit in Palm Coast? SmoothFenceUSA guides you through HOA rules, design guidelines, and local permitting requirements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
