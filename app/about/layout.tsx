import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SmoothFenceUSA | Northeast Florida Fence Company",
  description: "Learn about SmoothFenceUSA — a locally owned fence installation company serving Flagler, Volusia, St. Johns, Duval, and Putnam counties across Northeast Florida with 10+ years of experience.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
