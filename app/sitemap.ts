import type { MetadataRoute } from "next";
import { getSiteUrl, sitemapImages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          "x-default": siteUrl,
        },
      },
      images: sitemapImages(siteUrl),
    },
    {
      url: `${siteUrl}/eventos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}/eventos`,
          "x-default": `${siteUrl}/eventos`,
        },
      },
    },
  ];
}
