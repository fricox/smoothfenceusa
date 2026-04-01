import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Before & After Gallery | SmoothFenceUSA",
  description:
    "See the transformation. Real fence installation projects by SmoothFenceUSA in Palm Coast, Florida — vinyl, aluminum, chain-link, and wood fences.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
