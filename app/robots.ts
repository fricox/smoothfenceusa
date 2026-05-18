import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Per-bot allow rules — explicit signal that AI crawlers are welcome.
  // Lessons from lufer.ai 2026-05-09: scanner showed score 85/100 even while
  // robots.txt blocked AI crawlers (Disallow: /) — explicit rules avoid that
  // pitfall. Catch-all User-agent: * preserves existing disallow policy.
  const aiCrawlers = [
    "GPTBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "PerplexityBot",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "Amazonbot",
  ];

  const internalDisallows = ["/api/", "/pay/", "/pay/success/", "/financing/calculator/"];

  return {
    rules: [
      ...aiCrawlers.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: internalDisallows,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: internalDisallows,
      },
    ],
    sitemap: "https://www.smoothfenceusa.com/sitemap.xml",
  };
}
