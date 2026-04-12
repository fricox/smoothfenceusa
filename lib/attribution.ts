/**
 * Track A — Attribution capture & retrieval.
 *
 * Stores gclid + UTM params from the landing URL into sessionStorage
 * so they survive navigation within the same tab. Retrieved later when
 * a form is submitted and merged into the POST body + Sheets payload.
 */

const STORAGE_KEY = "sf_attribution";

const PARAM_KEYS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export interface Attribution {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/** Read gclid + UTMs from the current URL and persist to sessionStorage. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const data: Attribution = {};
  let found = false;

  for (const key of PARAM_KEYS) {
    const val = params.get(key);
    if (val) {
      data[key] = val;
      found = true;
    }
  }

  // Only overwrite if the current URL actually carries attribution params.
  // This way the first-touch attribution survives internal navigations.
  if (found) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Private browsing or storage full — silently ignore.
    }
  }
}

/** Retrieve stored attribution (empty object if nothing captured). */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
