import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOA & Permits Guide | Smooth Fence USA — Northeast Florida",
  description: "Need HOA approval or a fence permit in Flagler, Volusia, St. Johns, Duval, or Putnam County? Smooth Fence USA guides you through HOA rules, design guidelines, and local permitting requirements across Northeast Florida.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
