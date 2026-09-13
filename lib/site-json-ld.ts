/**
 * Schema.org structured data for the site.
 *
 * Builds a JSON-LD graph with organization, website, pages, study tracks,
 * and an FAQ derived from the chatbot knowledge base.
 *
 * @packageDocumentation
 */

import { studyTracks } from "@/ui/componentes/trilhas/tracks";
import { blogPage, blogPosts } from "@/ui/paginas/blog/posts";
import eventosPage from "@/ui/paginas/eventos/eventos.json";
import hackatonsPage from "@/ui/paginas/hackatons/hackatons.json";
import { blogPostPath } from "@/lib/blog";
import { communityKnowledge } from "@/lib/community-knowledge";
import { getSiteUrl, siteDescription, siteName, sitePlace, socialUrls } from "@/lib/site";

/** Canonical FAQ questions, keyed by knowledge-topic `id`. */
const faqQuestions: Record<string, string> = {
  identidade: "O que é a Tech Missões?",
  participar: "Como faço parte?",
  areas: "Quais são as áreas de estudo?",
  eventos: "Tem eventos?",
  hackatons: "Tem hackaton?",
  blog: "Tem blog?",
  kit: "Tem kit da comunidade?",
};

/**
 * Builds the JSON-LD graph embedded in `<head>`.
 *
 * Includes Organization, WebSite, internal pages, an ItemList of tracks,
 * and an FAQPage with markdown stripped from answers.
 *
 * @returns Object serializable as `application/ld+json`.
 */
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
        name: eventosPage.title,
        description: eventosPage.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/hackatons`,
        url: `${siteUrl}/hackatons`,
        name: hackatonsPage.title,
        description: hackatonsPage.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/blog`,
        url: `${siteUrl}/blog`,
        name: blogPage.title,
        description: blogPage.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: blogPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}${blogPostPath(post.slug)}`,
            name: post.title,
          })),
        },
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
