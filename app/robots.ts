import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/pay/", "/pay/success/"],
      },
    ],
    sitemap: "https://www.smoothfenceusa.com/sitemap.xml",
  };
}
