import { NextResponse, type NextRequest } from "next/server";
import { buildKbFromFaqData, type KbLang } from "@/lib/kb-builder";

// Public read-only endpoint serving the Fency KnowledgeBase.
// Source of truth: lib/faq-data.ts (same data backing the public /faq page).
// Consumed cross-domain by https://smoothfence-chatbot.vercel.app — CORS is
// open because the exact same content is already public at /faq.

export const runtime = "nodejs";
export const revalidate = 3600;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function normalizeLang(param: string | null): KbLang {
  return param === "es" ? "es" : "en";
}

export async function GET(request: NextRequest) {
  const lang = normalizeLang(request.nextUrl.searchParams.get("lang"));
  const kb = buildKbFromFaqData(lang);
  return NextResponse.json(kb, {
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
