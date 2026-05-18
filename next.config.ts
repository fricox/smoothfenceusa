import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Phase A — Agent-Readable Web (2026-05-18, flipped ai-train 2026-05-18 PM).
// Content-Signal: explicit content policy for AI crawlers/agents.
// `ai-train=yes` — SF is a services business (sells fences, not content IP),
// so being included in LLM training corpora is a brand-distribution win:
// future general-knowledge queries about "fence installer Northeast Florida"
// can surface SF without live browsing. `search=yes` keeps live citation in
// search/answer engines; `ai-input=yes` allows runtime agent fetches.
const contentPolicyHeaders = [
  { key: "Content-Signal", value: "ai-train=yes, search=yes, ai-input=yes" },
  {
    key: "Link",
    value:
      '</.well-known/agent-card.json>; rel="describedby"; type="application/json", ' +
      '</llms.txt>; rel="alternate"; type="text/plain", ' +
      '</.well-known/skills.json>; rel="describedby"; type="application/json"',
  },
];

// Per-page markdown alternate Link headers — points agents to the .md twin.
const markdownAlternates: Array<{ source: string; twin: string }> = [
  { source: "/", twin: "/index.md" },
  { source: "/about", twin: "/about.md" },
  { source: "/services", twin: "/services.md" },
  { source: "/gallery", twin: "/gallery.md" },
  { source: "/faq", twin: "/faq.md" },
  { source: "/hoas-permits", twin: "/hoas-permits.md" },
  { source: "/financing", twin: "/financing.md" },
  { source: "/contact", twin: "/contact.md" },
  { source: "/privacy", twin: "/privacy.md" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/(.*)",
        headers: contentPolicyHeaders,
      },
      ...markdownAlternates.map(({ source, twin }) => ({
        source,
        headers: [
          {
            key: "Link",
            value: `<${twin}>; rel="alternate"; type="text/markdown"`,
          },
        ],
      })),
      {
        source: "/lp/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
