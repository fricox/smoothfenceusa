import type { Metadata } from "next";
import FinancingClient from "./FinancingClient";

export const metadata: Metadata = {
  title: "Fence Financing | Monthly Payments — Smooth Fence USA",
  description:
    "Finance your new fence with affordable monthly payments. Options from GetHearth, Affirm, Afterpay, and Klarna. Apply in minutes. No hard credit check to prequalify.",
  openGraph: {
    title: "Fence Financing | Smooth Fence USA — Northeast Florida",
    description:
      "Affordable monthly payments for your fence project. Multiple financing options. Apply in minutes.",
    type: "website",
  },
};

export default function FinancingPage() {
  return <FinancingClient />;
}
