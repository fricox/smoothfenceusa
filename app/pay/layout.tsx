import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Payment | SmoothFenceUSA",
  description: "Securely pay your SmoothFenceUSA deposit or invoice online via Stripe.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
