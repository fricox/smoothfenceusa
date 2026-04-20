import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Before & After Gallery | Smooth Fence USA",
  description:
    "See the transformation. Real fence installation projects by Smooth Fence USA across Flagler, Volusia, St. Johns, Duval, and Putnam counties in Northeast Florida — vinyl, aluminum, chain-link, and wood fences.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
