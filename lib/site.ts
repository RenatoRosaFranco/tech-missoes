/**
 * Public site-identity facade.
 *
 * Re-exports name, copy, and environment helpers from `ui/site/site`
 * and `lib/site-env`, and builds lists used for SEO.
 *
 * @packageDocumentation
 */

import { communityLinks, sitemapImagePaths, siteDescription, siteName, sitePlace, siteTagline, siteTitle } from "@/ui/site/site";
import { getAmpUrl, getSiteUrl, googleAnalyticsId, googleSiteVerification } from "@/lib/site-env";

export {
  siteDescription,
  siteName,
  sitePlace,
  siteTagline,
  siteTitle,
};

export { getAmpUrl, getSiteUrl, googleAnalyticsId, googleSiteVerification };

/**
 * Turns relative sitemap paths into absolute URLs.
 *
 * @param siteUrl - Canonical origin, without a trailing slash.
 * @returns Image URLs for the XML sitemap.
 */
export function sitemapImages(siteUrl: string) {
  return sitemapImagePaths.map(path => `${siteUrl}${path}`);
}

/**
 * Official social URLs, omitting empty entries.
 *
 * @returns Profile URLs for `sameAs` in JSON-LD.
 */
export function socialUrls() {
  return [communityLinks.whatsapp, communityLinks.facebook, communityLinks.instagram, communityLinks.youtube, communityLinks.tiktok].filter(Boolean);
}
