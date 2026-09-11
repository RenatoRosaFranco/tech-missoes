import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "./google-analytics";
import { JsonLd } from "./json-ld";
import { getSiteUrl, googleAnalyticsId, googleSiteVerification, siteDescription, siteName, sitePlace, siteTitle } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();
const googleVerification = googleSiteVerification();
const gaId = googleAnalyticsId();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "education",
  keywords: [
    "Tech Missões",
    "Tech Missoes",
    "Cerro Largo",
    "região das Missões",
    "Rio Grande do Sul",
    "comunidade de tecnologia",
    "engenharia de software",
    "inteligência artificial",
    "robótica",
    "estudo de programação",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "x-default": "/",
    },
    types: {
      "application/xml": "/sitemap.xml",
    },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    countryName: "Brazil",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  other: {
    "geo.region": "BR-RS",
    "geo.placename": sitePlace.locality,
    "geo.position": `${sitePlace.latitude};${sitePlace.longitude}`,
    ICBM: `${sitePlace.latitude}, ${sitePlace.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#191a18" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href={`${siteUrl}/sitemap.xml`} />
        {gaId ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        ) : null}
        <JsonLd />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tech-missoes-theme");document.documentElement.dataset.theme=t==="dark"||t==="light"?t:matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}catch(e){}})();`,
          }}
        />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
