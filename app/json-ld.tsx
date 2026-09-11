import { communityKnowledge } from "@/lib/community-knowledge";
import { getSiteUrl, siteDescription, siteName, sitePlace, socialUrls } from "@/lib/site";

const faqQuestions: Record<string, string> = {
  identidade: "O que é a Tech Missões?",
  participar: "Como faço parte?",
  areas: "Quais são as áreas de estudo?",
  kit: "Tem kit da comunidade?",
};

export function JsonLd() {
  const siteUrl = getSiteUrl();
  const organizationId = `${siteUrl}/#organizacao`;
  const websiteId = `${siteUrl}/#website`;
  const docs = communityKnowledge();
  const sameAs = socialUrls();
  const faq = Object.entries(faqQuestions).flatMap(([id, name]) => {
    const doc = docs.find(item => item.id === id);
    if (!doc) return [];
    return [{
      "@type": "Question",
      name,
      acceptedAnswer: {
        "@type": "Answer",
        text: doc.answer.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1"),
      },
    }];
  });

  const graph = [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": organizationId,
      name: siteName,
      alternateName: ["Tech Missoes", "Techmissoes"],
      url: siteUrl,
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/apple-icon.png`,
        width: 180,
        height: 180,
      },
      image: `${siteUrl}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: sitePlace.locality,
        addressRegion: sitePlace.region,
        addressCountry: sitePlace.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: sitePlace.latitude,
        longitude: sitePlace.longitude,
      },
      areaServed: [sitePlace.locality, sitePlace.area, sitePlace.regionName, "Brasil"],
      knowsAbout: ["Engenharia de software", "Inteligência artificial", "Robótica", "Programação"],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "pt-BR",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#inicio`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "pt-BR",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: `${siteUrl}/opengraph-image`,
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#areas`,
      name: "Áreas de estudo da Tech Missões",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Engenharia de software" },
        { "@type": "ListItem", position: 2, name: "Inteligência artificial" },
        { "@type": "ListItem", position: 3, name: "Robótica" },
      ],
      isPartOf: { "@id": websiteId },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faq,
      isPartOf: { "@id": websiteId },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
