import { communityKnowledge } from "@/lib/community-knowledge";
import { getSiteUrl, siteDescription, siteName, sitePlace, socialUrls } from "@/lib/site";
import { studyTracks } from "@/lib/study-tracks";

const faqQuestions: Record<string, string> = {
  identidade: "O que é a Tech Missões?",
  participar: "Como faço parte?",
  areas: "Quais são as áreas de estudo?",
  eventos: "Tem eventos?",
  kit: "Tem kit da comunidade?",
};

export function siteJsonLd() {
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

  return {
    "@context": "https://schema.org",
    "@graph": [
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
        knowsAbout: [...studyTracks.map(track => track.name), "Programação"],
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
        "@type": "WebPage",
        "@id": `${siteUrl}/eventos`,
        url: `${siteUrl}/eventos`,
        name: "Eventos",
        description: "Agenda da Tech Missões em Cerro Largo e na região das Missões: grupos de estudo, encontros e apresentações da comunidade.",
        inLanguage: "pt-BR",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#areas`,
        name: "Áreas de estudo da Tech Missões",
        itemListElement: studyTracks.map((track, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: track.name,
        })),
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faq,
        isPartOf: { "@id": websiteId },
      },
    ],
  };
}
