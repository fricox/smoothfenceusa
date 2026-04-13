import type { Metadata } from "next";
import FinancingClient from "./FinancingClient";

export const metadata: Metadata = {
  title: "Fence Financing | Monthly Payments — SmoothFenceUSA",
  description:
    "Finance your new fence with affordable monthly payments. Options from GetHearth, Affirm, Afterpay, and Klarna. Apply in minutes. No hard credit check to prequalify.",
  openGraph: {
    title: "Fence Financing | SmoothFenceUSA — Palm Coast, FL",
    description:
      "Affordable monthly payments for your fence project. Multiple financing options. Apply in minutes.",
    type: "website",
  },
};

export default function FinancingPage() {
  return <FinancingClient />;
}
