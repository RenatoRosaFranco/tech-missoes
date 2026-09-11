import { communityLinks } from "@/app/community-links";

export const siteName = "Tech Missões";
export const siteTagline = "Juntos, construímos o futuro.";
export const siteTitle = "Tech Missões | Comunidade de tecnologia em Cerro Largo, RS";
export const siteDescription =
  "Comunidade de estudo e desenvolvimento em Cerro Largo, na região das Missões (RS). Engenharia de software, inteligência artificial e robótica, na prática e em comunidade.";

export const sitePlace = {
  locality: "Cerro Largo",
  region: "RS",
  regionName: "Rio Grande do Sul",
  country: "BR",
  area: "Região das Missões",
  latitude: -28.1333,
  longitude: -54.7333,
} as const;

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

export function sitemapImages(siteUrl: string) {
  return [
    `${siteUrl}/opengraph-image`,
    `${siteUrl}/illustrations/community-developer.png`,
    `${siteUrl}/illustrations/mousepad.png`,
    `${siteUrl}/illustrations/camisa.png`,
    `${siteUrl}/illustrations/copo.png`,
  ];
}

export function socialUrls() {
  return [communityLinks.whatsapp, communityLinks.facebook, communityLinks.instagram, communityLinks.youtube, communityLinks.tiktok].filter(Boolean);
}
