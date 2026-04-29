// Single source of truth for paid-traffic landing pages.
// City-first (replaces county-first model in lib/counties.ts for /lp/* pages).
// Each Area drives /lp/fence-{slug} pages and shapes the headline that
// matches Google Ads keywords (people search "fence Jacksonville", not
// "fence Duval County").

export type Area = {
  slug: string;
  primaryCity: string;        // headline city, e.g. "Jacksonville"
  state: string;              // "FL"
  countyName: string;         // "Duval County" — used in subhead/SEO copy
  nearbyCities: string[];     // cities chips on LP
  metro?: string;             // optional metro descriptor, e.g. "Northeast Florida"
};

export const LP_AREAS: Area[] = [
  // Priority 1 — biggest market
  {
    slug: "jacksonville",
    primaryCity: "Jacksonville",
    state: "FL",
    countyName: "Duval County",
    nearbyCities: ["Jacksonville", "Atlantic Beach", "Jacksonville Beach", "Neptune Beach", "Mayport"],
    metro: "Northeast Florida",
  },
  // Priority 2 — high ticket (Ponte Vedra)
  {
    slug: "st-augustine",
    primaryCity: "St. Augustine",
    state: "FL",
    countyName: "St. Johns County",
    nearbyCities: ["St. Augustine", "Ponte Vedra", "St. Johns", "Vilano Beach", "World Golf Village"],
    metro: "Northeast Florida",
  },
  // Priority 3 — mid market
  {
    slug: "daytona",
    primaryCity: "Daytona Beach",
    state: "FL",
    countyName: "Volusia County",
    nearbyCities: ["Daytona Beach", "Ormond Beach", "Port Orange", "Deltona", "Holly Hill"],
    metro: "East Central Florida",
  },
  // Priority 4 — small but local
  {
    slug: "palatka",
    primaryCity: "Palatka",
    state: "FL",
    countyName: "Putnam County",
    nearbyCities: ["Palatka", "Interlachen", "Crescent City", "East Palatka"],
    metro: "North Florida",
  },

  // ── County-level aliases — same data, kept so existing /lp/fence-{county}
  // URLs in any prior ad campaigns / shared links continue to render.
  {
    slug: "duval",
    primaryCity: "Jacksonville",
    state: "FL",
    countyName: "Duval County",
    nearbyCities: ["Jacksonville", "Atlantic Beach", "Jacksonville Beach", "Neptune Beach", "Mayport"],
    metro: "Northeast Florida",
  },
  {
    slug: "st-johns",
    primaryCity: "St. Augustine",
    state: "FL",
    countyName: "St. Johns County",
    nearbyCities: ["St. Augustine", "Ponte Vedra", "St. Johns", "Vilano Beach", "World Golf Village"],
    metro: "Northeast Florida",
  },
  {
    slug: "volusia",
    primaryCity: "Daytona Beach",
    state: "FL",
    countyName: "Volusia County",
    nearbyCities: ["Daytona Beach", "Ormond Beach", "Port Orange", "Deltona", "Holly Hill"],
    metro: "East Central Florida",
  },
  {
    slug: "putnam",
    primaryCity: "Palatka",
    state: "FL",
    countyName: "Putnam County",
    nearbyCities: ["Palatka", "Interlachen", "Crescent City", "East Palatka"],
    metro: "North Florida",
  },

  // Flagler — kept for back-compat ONLY. NOT prioritized in current ads strategy
  // (2026-04-29 pivot away from Palm Coast). Page renders, but no ads point here.
  {
    slug: "flagler",
    primaryCity: "Palm Coast",
    state: "FL",
    countyName: "Flagler County",
    nearbyCities: ["Palm Coast", "Bunnell", "Flagler Beach"],
    metro: "Northeast Florida",
  },
];

export function getArea(slug: string): Area | undefined {
  return LP_AREAS.find((a) => a.slug === slug);
}

// Slugs that should generate static params for the dynamic [slug] route (if used).
export const LP_AREA_SLUGS = LP_AREAS.map((a) => a.slug);
