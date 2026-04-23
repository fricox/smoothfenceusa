import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/pay/", "/pay/success/", "/financing/calculator/"],
      },
    ],
    sitemap: "https://www.smoothfenceusa.com/sitemap.xml",
  };
}
