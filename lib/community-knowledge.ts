/**
 * Knowledge base for the community chatbot.
 *
 * Turns site configuration into retrievable documents whose answers stay
 * faithful to published content.
 *
 * @packageDocumentation
 */

import { chatCopy } from "@/ui/componentes/chat/chat";
import areas from "@/ui/componentes/areas/areas.json";
import community from "@/ui/componentes/community/community.json";
import hero from "@/ui/componentes/hero/hero.json";
import how from "@/ui/componentes/how/how.json";
import join from "@/ui/componentes/join/join.json";
import membership from "@/ui/componentes/membership/membership.json";
import partnersCopy from "@/ui/componentes/partners/partners.json";
import principles from "@/ui/componentes/principles/principles.json";
import kit from "@/ui/componentes/starter-kit/starter-kit.json";
import technologiesCopy from "@/ui/componentes/technologies/technologies.json";
import { studyTracks, type StudyTrack, type TrackIcon } from "@/ui/componentes/trilhas/tracks";
import type { CommunityEvent } from "@/ui/componentes/agenda/agenda";
import { blogPage, blogPosts } from "@/ui/paginas/blog/posts";
import eventosPage from "@/ui/paginas/eventos/eventos.json";
import hackatonsPage from "@/ui/paginas/hackatons/hackatons.json";
import { communityLinks, showPartnersSection, siteName, sitePlace, socialProfiles } from "@/ui/site/site";

const homeCopy = {
  hero,
  principles,
  areas,
  community,
  how,
  join,
  membership,
  kit,
  partners: partnersCopy,
  technologies: technologiesCopy,
};
const howSteps = how.steps;
const kitProducts = kit.products;
const starterKit = { price: kit.price, purchaseUrl: kit.purchaseUrl };
const partners = partnersCopy.items;
const technologies = technologiesCopy.items;
const communityEvents = eventosPage.items as CommunityEvent[];
const communityHackatons = hackatonsPage.items as CommunityEvent[];
const pageCopy = {
  events: eventosPage,
  hackatons: hackatonsPage,
  blog: blogPage,
};

/** Indexable document used when retrieving answers. */
export type KnowledgeDoc = {
  /** Stable topic id, aligned with `ChatTopic.id`. */
  id: string;
  title: string;
  /** Terms that raise the retrieval score. */
  keywords: string[];
  /** Markdown answer ready for the assistant. */
  answer: string;
  related?: string[];
};

/** Maps a track icon to the matching chat-topic `id`. */
const TRACK_TOPIC: Record<TrackIcon, string> = {
  code: "software",
  ai: "inteligencia",
  robot: "robotica",
  devops: "devops",
  automation: "automacao",
  venture: "empreendedorismo",
};

/** Collapses line breaks into a single paragraph. */
function flat(text: string) {
  return text.replace(/\n/g, " ");
}

/**
 * Joins items as Portuguese prose (`a, b e c`).
 *
 * @param items - Words or phrases to enumerate.
 */
function list(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

/** Same as {@link list}, with each item in markdown bold. */
function strongList(items: string[]) {
  return list(items.map(item => `**${item}**`));
}

/** Turns a `a · b · c` tag string into prose. */
function tagsToProse(tags: string) {
  return list(tags.split("·").map(tag => tag.trim().toLowerCase()));
}

/** Joins track steps into a single sentence. */
function stepsToProse(steps: string[]) {
  return steps.map(step => step.replace(/\.$/, "")).join("; ") + ".";
}

/** Finds the study track whose chat topic matches `id`. */
function trackByTopic(id: string) {
  const icon = (Object.keys(TRACK_TOPIC) as TrackIcon[]).find(key => TRACK_TOPIC[key] === id);
  return studyTracks.find(track => track.icon === icon);
}

/** Default answer for a study track. */
function trackAnswer(track: StudyTrack) {
  return `${track.description} Os temas passam por ${tagsToProse(track.tags)}. Um primeiro caminho: ${stepsToProse(track.steps)}`;
}

/** WhatsApp invite line, or a notice if the link is missing. */
function whatsappLine() {
  return communityLinks.whatsapp
    ? `O convite oficial está neste [grupo do WhatsApp](${communityLinks.whatsapp}).`
    : "O convite para o grupo do WhatsApp ainda não foi publicado no site. Quando estiver pronto, o botão em Faça parte da comunidade leva direto para o grupo.";
}

/** Kit price sentence, or a pending notice. */
function kitPriceLine() {
  return starterKit.price ? `O preço de exibição agora é ${starterKit.price}.` : "O preço ainda não foi publicado.";
}

/** Kit purchase sentence, or an availability notice. */
function kitBuyLine() {
  return starterKit.purchaseUrl
    ? `As vendas estão abertas neste endereço: ${starterKit.purchaseUrl}.`
    : "As vendas ainda não começaram. O site avisa quando o kit estiver disponível.";
}

/**
 * Builds the canonical answer for a topic.
 *
 * @param id - Chat topic identifier.
 */
function answerFor(id: string) {
  const copy = homeCopy;
  const track = trackByTopic(id);
  if (track) return trackAnswer(track);

  switch (id) {
    case "identidade":
      return copy.hero.lead;
    case "essencia":
      return `${flat(copy.community.lead)} ${copy.community.paragraphs.join(" ")}`;
    case "local":
      return `${siteName} nasce em ${sitePlace.locality}, na ${sitePlace.area}, ${sitePlace.regionName}.`;
    case "principios":
      return `Três princípios guiam a comunidade: ${list(copy.principles.items.map(item => item.replace(/\.$/, "").toLowerCase()))}. ${copy.principles.kicker} ${copy.principles.emphasis}`;
    case "areas":
      return `Há ${studyTracks.length} áreas de estudo: ${strongList(studyTracks.map(item => item.name.toLowerCase()))}. ${flat(copy.areas.lead)}`;
    case "parceiras":
      if (!showPartnersSection) return copy.partners.pending;
      return `${flat(copy.partners.lead)} ${partners.map(item => `${item.name}, ${item.place}`).join("; ")}.`;
    case "como-funciona":
      return `${flat(copy.how.lead)} ${howSteps.map(step => `${step.title}: ${step.text}`).join(" ")}`;
    case "como-comecar":
      return `${copy.join.lead} ${studyTracks.map(item => `Em ${item.name.toLowerCase()}: ${item.steps[0]}`).join(" ")} ${copy.join.note}`;
    case "quem":
      return `${copy.join.lead} ${copy.join.openNote} O kit da comunidade é um conjunto de itens à parte e só entra à venda quando o endereço oficial for publicado.`;
    case "participar":
      return `${copy.membership.inviteTitle} ${copy.membership.inviteText} ${whatsappLine()} No site, a seção Faça parte da comunidade concentra esse convite.`;
    case "tecnologias":
      return `Ao redor de quem desenvolve, a comunidade explora ${list(technologies.map(item => item.name))}. Elas atravessam ${list([...new Set(technologies.map(item => item.area.toLowerCase()))])}. ${flat(copy.technologies.lead)}`;
    case "kit":
      return `${flat(copy.kit.lead)} O kit tem ${list(kitProducts.map(item => item.title.toLowerCase()))}. ${copy.kit.disclaimer} ${kitPriceLine()} ${kitBuyLine()}`;
    case "redes":
      return `As redes oficiais da ${siteName} no rodapé do site são ${list(socialProfiles.map(item => item.name))}. ${socialProfiles.map(item => (item.href ? `${item.name}: ${item.href}` : `${item.name}: ainda sem endereço oficial no site`)).join(" ")}`;
    case "eventos":
      if (communityEvents.length) {
        return `A agenda da ${siteName} tem ${list(communityEvents.map(item => `${item.title} (${item.dateLabel}, ${item.place})`))}. ${whatsappLine()}`;
      }
      return `${pageCopy.events.emptyText} ${whatsappLine()}`;
    case "hackatons":
      if (communityHackatons.length) {
        return `Os hackatons da ${siteName} agora são ${list(communityHackatons.map(item => `${item.title} (${item.dateLabel}, ${item.place})`))}. ${whatsappLine()}`;
      }
      return `${pageCopy.hackatons.emptyText} ${whatsappLine()}`;
    case "blog":
      return `${flat(pageCopy.blog.lead)} Os artigos publicados agora são: ${list(blogPosts.map(item => item.title))}. A lista completa está em Blog.`;
    default:
      return copy.hero.lead;
  }
}

/**
 * Knowledge documents derived from the current configuration.
 *
 * @returns One {@link KnowledgeDoc} per chat topic.
 */
export function communityKnowledge(): KnowledgeDoc[] {
  return chatCopy.topics.map(topic => ({
    id: topic.id,
    title: topic.title,
    keywords: topic.id === "parceiras"
      ? [...topic.keywords, ...partners.map(item => item.id)]
      : topic.keywords,
    related: topic.related,
    answer: answerFor(topic.id),
  }));
}

/**
 * Serializes the knowledge base for the assistant system prompt.
 *
 * @returns Markdown with one heading per topic.
 */
export function knowledgePrompt() {
  return communityKnowledge()
    .map(doc => `## ${doc.title}\n${doc.answer}`)
    .join("\n\n");
}
