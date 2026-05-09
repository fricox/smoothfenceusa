import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Payment | Smooth Fence USA",
  description: "Securely pay your Smooth Fence USA deposit or invoice online via Stripe.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
