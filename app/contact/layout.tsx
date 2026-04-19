import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SmoothFenceUSA — Free Fence Estimate",
  description: "Get a free fence estimate in Flagler, Volusia, St. Johns, Duval, or Putnam County, FL. Call (386) 403-9460, use our instant estimator, or schedule a site visit. Mon-Sat 8AM-6PM.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
