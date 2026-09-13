/**
 * Robots policy (`/robots.txt`).
 *
 * @packageDocumentation
 */

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * Allows public pages and blocks `/api/`.
 *
 * @returns Robots directives consumed by Next.js.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
