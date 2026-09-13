/**
 * Default Open Graph image (`/opengraph-image`).
 *
 * @packageDocumentation
 */

import { ImageResponse } from "next/og";
import { siteName, siteTagline } from "@/lib/site";

/** Accessible description of the generated image. */
export const alt = "Tech Missões — comunidade de tecnologia em Cerro Largo, na região das Missões.";

/** Social-card dimensions in pixels. */
export const size = { width: 1200, height: 630 };

/** MIME type of the generated PNG. */
export const contentType = "image/png";

/**
 * Renders the 1200×630 social preview used by Open Graph and Twitter.
 *
 * @returns Edge `ImageResponse` for the default share card.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#faf9f6",
          color: "#252623",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#9b2635",
              color: "#faf9f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            TM
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 28, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05 }}>
            <span>tech</span>
            <span>
              missões<span style={{ color: "#9b2635" }}>.</span>
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 500, letterSpacing: -2, lineHeight: 1.1, maxWidth: 920 }}>
            {siteTagline}
          </div>
          <div style={{ fontSize: 26, color: "#65665f", maxWidth: 820 }}>
            Comunidade de estudo em software, IA, robótica, DevOps, automação e empreendedorismo. Cerro Largo, região das Missões, RS.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 2, color: "#9b2635", textTransform: "uppercase" }}>
          {siteName} · Cerro Largo · RS
        </div>
      </div>
    ),
    size,
  );
}
