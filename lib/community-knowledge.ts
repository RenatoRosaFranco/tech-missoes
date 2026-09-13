import {
  blogPosts,
  chatCopy,
  communityEvents,
  communityLinks,
  homeCopy,
  howSteps,
  kitProducts,
  pageCopy,
  partners,
  showPartnersSection,
  siteName,
  sitePlace,
  socialProfiles,
  starterKit,
  studyTracks,
  technologies,
} from "@/lib/app-config";
import type { StudyTrack, TrackIcon } from "@/lib/app-config-types";

export type KnowledgeDoc = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  related?: string[];
};

const TRACK_TOPIC: Record<TrackIcon, string> = {
  code: "software",
  ai: "inteligencia",
  robot: "robotica",
  devops: "devops",
  automation: "automacao",
  venture: "empreendedorismo",
};

function flat(text: string) {
  return text.replace(/\n/g, " ");
}

function list(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function strongList(items: string[]) {
  return list(items.map(item => `**${item}**`));
}

function tagsToProse(tags: string) {
  return list(tags.split("·").map(tag => tag.trim().toLowerCase()));
}

function stepsToProse(steps: string[]) {
  return steps.map(step => step.replace(/\.$/, "")).join("; ") + ".";
}

function trackByTopic(id: string) {
  const icon = (Object.keys(TRACK_TOPIC) as TrackIcon[]).find(key => TRACK_TOPIC[key] === id);
  return studyTracks.find(track => track.icon === icon);
}

function trackAnswer(track: StudyTrack) {
  return `${track.description} Os temas passam por ${tagsToProse(track.tags)}. Um primeiro caminho: ${stepsToProse(track.steps)}`;
}

function whatsappLine() {
  return communityLinks.whatsapp
    ? `O convite oficial está neste [grupo do WhatsApp](${communityLinks.whatsapp}).`
    : "O convite para o grupo do WhatsApp ainda não foi publicado no site. Quando estiver pronto, o botão em Faça parte da comunidade leva direto para o grupo.";
}

function kitPriceLine() {
  return starterKit.price ? `O preço de exibição agora é ${starterKit.price}.` : "O preço ainda não foi publicado.";
}

function kitBuyLine() {
  return starterKit.purchaseUrl
    ? `As vendas estão abertas neste endereço: ${starterKit.purchaseUrl}.`
    : "As vendas ainda não começaram. O site avisa quando o kit estiver disponível.";
}

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
    case "blog":
      return `${flat(pageCopy.blog.lead)} Os artigos publicados agora são: ${list(blogPosts.map(item => item.title))}. A lista completa está em Blog.`;
    default:
      return copy.hero.lead;
  }
}

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

export function knowledgePrompt() {
  return communityKnowledge()
    .map(doc => `## ${doc.title}\n${doc.answer}`)
    .join("\n\n");
}
