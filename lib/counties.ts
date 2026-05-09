// Single source of truth for the 5 counties served by Smooth Fence USA.
// Consumed by components/sections/CountyLanding.tsx and the 5 static
// wrapper pages under app/lp/fence-{slug}/ (P0-4).

export type County = {
  slug: string;
  name: string;
  cities: string[];
  heroCity: string;
};

export const COUNTIES: County[] = [
  { slug: "flagler",  name: "Flagler County",   cities: ["Palm Coast", "Bunnell", "Flagler Beach"],                    heroCity: "Palm Coast" },
  { slug: "volusia",  name: "Volusia County",   cities: ["Daytona Beach", "Deltona", "Ormond Beach", "Port Orange"],   heroCity: "Daytona Beach" },
  { slug: "st-johns", name: "St. Johns County", cities: ["St. Augustine", "Ponte Vedra", "St. Johns"],                 heroCity: "St. Augustine" },
  { slug: "duval",    name: "Duval County",     cities: ["Jacksonville", "Atlantic Beach", "Jacksonville Beach"],      heroCity: "Jacksonville" },
  { slug: "putnam",   name: "Putnam County",    cities: ["Palatka", "Interlachen", "Crescent City"],                   heroCity: "Palatka" },
];

export function getCounty(slug: string): County | undefined {
  return COUNTIES.find((c) => c.slug === slug);
}
