import "server-only";
import raw from "@/db/app_config/techmissoes.json";
import {
  FEATURES,
  KIT_PRODUCT_TYPES,
  TRACK_ICONS,
  type AppConfig,
  type FeatureName,
} from "@/lib/app-config-types";

function isOneOf<T extends string>(value: string, allowed: readonly T[]): value is T {
  return (allowed as readonly string[]).includes(value);
}

function parseConfig(value: typeof raw): AppConfig {
  for (const track of value.tracks) {
    if (!isOneOf(track.icon, TRACK_ICONS)) {
      throw new Error(`Ícone de trilha inválido: ${track.icon}`);
    }
  }
  for (const product of value.starterKit.products) {
    if (!isOneOf(product.type, KIT_PRODUCT_TYPES)) {
      throw new Error(`Tipo de produto do kit inválido: ${product.type}`);
    }
  }
  for (const item of [...value.navigation.links, ...value.home.sections]) {
    if (item.feature && !isOneOf(item.feature, FEATURES)) {
      throw new Error(`Feature desconhecida: ${item.feature}`);
    }
  }
  return value as unknown as AppConfig;
}

const config = parseConfig(raw);

function enabled<T extends { feature?: FeatureName }>(items: T[]) {
  return items.filter(item => !item.feature || config.features[item.feature]);
}

export const appConfig = config;
export const siteName = config.site.name;
export const siteTagline = config.site.tagline;
export const siteTitle = config.site.title;
export const siteDescription = config.site.description;
export const sitePlace = config.site.place;
export const locationBarLabel = config.site.locationBar;
export const sitemapImagePaths = config.site.sitemapImages;
export const communityLinks = config.links;
export const showPartnersSection = config.features.partners;
export const starterKit = {
  price: config.starterKit.price,
  purchaseUrl: config.starterKit.purchaseUrl,
};
export const kitProducts = config.starterKit.products;
export const homeTyped = config.home.typed;
export const homeCopy = config.home.copy;
export const howSteps = config.home.howSteps;
export const studyTracks = config.tracks;
export const technologies = config.technologies;
export const techMobilePositions = config.technologyLayout.mobilePositions;
export const partners = config.partners;
export const blogPosts = config.blog;
export const communityEvents = config.events;
export const pageCopy = config.pages;
export const suggestedQuestions = config.chat.suggestedQuestions;
export const welcomeMessage = config.chat.welcome;
export const chatCopy = config.chat;
export const siteFooter = config.site.footer;
export const navCta = config.navigation.cta;
export const navLinks = enabled(config.navigation.links);
export const homeSections = enabled(config.home.sections);

export const socialProfiles = [
  { name: "Facebook" as const, href: config.links.facebook },
  { name: "Instagram" as const, href: config.links.instagram },
  { name: "YouTube" as const, href: config.links.youtube },
  { name: "TikTok" as const, href: config.links.tiktok },
];

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
