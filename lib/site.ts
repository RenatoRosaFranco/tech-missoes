import { communityLinks, sitemapImagePaths } from "@/lib/app-config";
import { getAmpUrl, getSiteUrl, googleAnalyticsId, googleSiteVerification } from "@/lib/site-env";

export {
  siteDescription,
  siteName,
  sitePlace,
  siteTagline,
  siteTitle,
} from "@/lib/app-config";

export { getAmpUrl, getSiteUrl, googleAnalyticsId, googleSiteVerification };

export function sitemapImages(siteUrl: string) {
  return sitemapImagePaths.map(path => `${siteUrl}${path}`);
}

export function socialUrls() {
  return [communityLinks.whatsapp, communityLinks.facebook, communityLinks.instagram, communityLinks.youtube, communityLinks.tiktok].filter(Boolean);
}
