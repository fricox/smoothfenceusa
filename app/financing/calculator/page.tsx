import type { Metadata } from "next";
import HearthWidgetEmbed from "./HearthWidgetEmbed";

export const metadata: Metadata = {
  title: "Payment Calculator — Smooth Fence USA",
  robots: { index: false, follow: false },
};

export default function FinancingCalculatorPage() {
  return <HearthWidgetEmbed />;
}
