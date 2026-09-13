import { siteJsonLd } from "@/lib/site-json-ld";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
    />
  );
}
