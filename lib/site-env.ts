export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getAmpUrl() {
  return `${getSiteUrl()}/amp`;
}

export function googleSiteVerification() {
  return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
}

const googleAnalyticsIdPattern = /^(G|GT)-[A-Z0-9]+$/i;

export function googleAnalyticsId() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();
  if (!id || !googleAnalyticsIdPattern.test(id)) return undefined;
  return id;
}
