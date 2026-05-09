"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Runs captureAttribution() once on mount. Renders nothing. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
