import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input") ?? "";
  const components = searchParams.get("components") ?? "country:us";
  const types = searchParams.get("types") ?? "address";

  const apiKey = process.env.GOOGLE_MAPS_KEY;

  // If no API key is configured, return empty predictions
  if (!apiKey) {
    return NextResponse.json({ predictions: [] });
  }

  const params = new URLSearchParams({
    input,
    components,
    types,
    key: apiKey,
    language: "en",
  });

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
    );
    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return NextResponse.json({ predictions: [] });
    }

    // Return only place_id and description — never expose the full Google response
    const predictions = (data.predictions ?? []).map(
      (p: { place_id: string; description: string }) => ({
        place_id: p.place_id,
        description: p.description,
      })
    );

    return NextResponse.json({ predictions });
  } catch {
    return NextResponse.json({ predictions: [] });
  }
}
