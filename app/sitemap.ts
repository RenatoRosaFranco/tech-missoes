/**
 * XML sitemap for crawlers (`/sitemap.xml`).
 *
 * @packageDocumentation
 */

import type { MetadataRoute } from "next";
import { blogPostPath } from "@/lib/blog";
import { blogPosts } from "@/ui/paginas/blog/posts";
import { getSiteUrl, sitemapImages } from "@/lib/site";

/**
 * Builds a weekly sitemap entry with language alternates.
 *
 * @param siteUrl - Canonical origin, without a trailing slash.
 * @param path - Path from the site root, or `""` for home.
 * @param priority - Crawl priority from `0` to `1`.
 * @param lastModified - Last-modified timestamp; defaults to now.
 */
function pageEntry(siteUrl: string, path: string, priority: number, lastModified = new Date()): MetadataRoute.Sitemap[number] {
  const url = path ? `${siteUrl}${path}` : siteUrl;
  return {
    url,
    lastModified,
    changeFrequency: "weekly",
    priority,
    alternates: {
      languages: {
        "pt-BR": url,
        "x-default": url,
      },
    },
  };
}

/**
 * Sitemap covering home, agendas, the notebook, and each article.
 *
 * @returns Entries consumed by Next.js `MetadataRoute.Sitemap`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    {
      ...pageEntry(siteUrl, "", 1),
      images: sitemapImages(siteUrl),
    },
    pageEntry(siteUrl, "/eventos", 0.8),
    pageEntry(siteUrl, "/hackatons", 0.8),
    pageEntry(siteUrl, "/blog", 0.8),
    ...blogPosts.map(post => pageEntry(siteUrl, blogPostPath(post.slug), 0.6, new Date(`${post.date}T12:00:00`))),
  ];
}
