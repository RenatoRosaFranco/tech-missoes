/**
 * Site environment helpers.
 *
 * Isolates the canonical URL, AMP route, Search Console token, and Analytics
 * ID so the rest of the app does not read `process.env` directly.
 *
 * @packageDocumentation
 */

/**
 * Canonical site URL, without a trailing slash.
 *
 * Resolution order: `NEXT_PUBLIC_SITE_URL`, Vercel production domain,
 * Vercel preview URL, then `http://localhost:3000`.
 *
 * @returns Absolute origin used in the sitemap, metadata, and JSON-LD.
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * URL of the AMP home page.
 *
 * @returns `{siteUrl}/amp`.
 */
export function getAmpUrl() {
  return `${getSiteUrl()}/amp`;
}

/**
 * Google Search Console verification token, if configured.
 *
 * @returns Value of `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, or `undefined`.
 */
export function googleSiteVerification() {
  return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
}

const googleAnalyticsIdPattern = /^(G|GT)-[A-Z0-9]+$/i;

/**
 * Google Analytics 4 measurement ID, if valid.
 *
 * Accepts only IDs in the `G-…` or `GT-…` format.
 *
 * @returns Measurement ID, or `undefined` when missing or invalid.
 */
export function googleAnalyticsId() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();
  if (!id || !googleAnalyticsIdPattern.test(id)) return undefined;
  return id;
}
