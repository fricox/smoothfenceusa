import type { Metadata } from "next";
import EstimatorClient from "./EstimatorClient";

export const metadata: Metadata = {
  title: "Instant Fence Estimator | SmoothFenceUSA",
  description:
    "Get an instant price range for your fence project in seconds. Select material, size, and options — then schedule your free on-site estimate.",
};

export default function EstimatorPage() {
  return <EstimatorClient />;
}
