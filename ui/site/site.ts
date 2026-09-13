import data from "./site.json";

export type FeatureName = keyof typeof data.features;

export const site = data;
export const siteName = data.name;
export const siteTagline = data.tagline;
export const siteTitle = data.title;
export const siteDescription = data.description;
export const sitePlace = data.place;
export const locationBarLabel = data.locationBar;
export const sitemapImagePaths = data.sitemapImages;
export const communityLinks = data.links;
export const showPartnersSection = data.features.partners;
export const siteKeywords = data.keywords;

export const socialProfiles = [
  { name: "Facebook" as const, href: data.links.facebook },
  { name: "Instagram" as const, href: data.links.instagram },
  { name: "YouTube" as const, href: data.links.youtube },
  { name: "TikTok" as const, href: data.links.tiktok },
];

export function enabled<T extends { feature?: FeatureName }>(items: T[]) {
  return items.filter(item => !item.feature || data.features[item.feature]);
}
