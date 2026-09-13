/**
 * Web app manifest (`/manifest.webmanifest`).
 *
 * @packageDocumentation
 */

import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/site";

/**
 * PWA identity, colors, and icons.
 *
 * @returns Manifest consumed by Next.js `MetadataRoute.Manifest`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#9b2635",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
