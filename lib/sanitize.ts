/**
 * HTML-escape user-provided strings before embedding in email templates.
 * Prevents HTML/script injection via form inputs.
 */
export function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Simple in-memory rate limiter keyed by IP.
 * Returns true if the request is allowed, false if rate-limited.
 */
const ipHits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  ip: string,
  { maxRequests = 5, windowMs = 60_000 } = {}
): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  entry.count++;
  if (entry.count > maxRequests) return false;
  return true;
}
