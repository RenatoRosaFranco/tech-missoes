import type { MetadataRoute } from "next";
import { blogPostPath } from "@/lib/blog";
import { blogPosts } from "@/lib/app-config";
import { getSiteUrl, sitemapImages } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    {
      ...pageEntry(siteUrl, "", 1),
      images: sitemapImages(siteUrl),
    },
    pageEntry(siteUrl, "/eventos", 0.8),
    pageEntry(siteUrl, "/blog", 0.8),
    ...blogPosts.map(post => pageEntry(siteUrl, blogPostPath(post.slug), 0.6, new Date(`${post.date}T12:00:00`))),
  ];
}
