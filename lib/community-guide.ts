import { communityKnowledge, knowledgePrompt, type KnowledgeDoc } from "./community-knowledge";
import { chatCopy, siteName, sitePlace, studyTracks } from "@/lib/app-config";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const greetings = /^(oi+|ola+|ol[aá]|eai|e ai|hey|hi|hello|bom dia|boa tarde|boa noite|opa)\b/;
const thanks = /^(obrigad[oa]|valeu|vlw|thanks|agradec)/;
const stopwords = new Set([
  "a", "o", "os", "as", "um", "uma", "de", "da", "do", "das", "dos", "e", "em", "no", "na", "nos", "nas",
  "para", "por", "com", "que", "se", "eu", "me", "minha", "meu", "voces", "voce", "tem", "ter", "sao",
  "ser", "esta", "esse", "essa", "isso", "qual", "quais", "como", "sobre", "mais",
]);

const aliases: [RegExp, string][] = [
  [/\b(ia|ai|ml)\b/g, "inteligencia artificial"],
  [/\b(dev|devs|programar|programacao|codigo)\b/g, "software"],
  [/\b(robo|robos)\b/g, "robotica"],
  [/\b(ci\/cd|pipeline|infra|deploy)\b/g, "devops"],
  [/\b(script|scripts|rpa|automatizar)\b/g, "automacao"],
  [/\b(negocio|startup|empreender|produto)\b/g, "empreendedorismo"],
  [/\b(zap|wpp|whats)\b/g, "whatsapp"],
  [/\b(entrar|juntar|inscrever|membro|participar)\b/g, "fazer parte"],
  [/\b(preco|valor|quanto custa|loja)\b/g, "kit"],
  [/\b(artigo|artigos|post|posts|caderno|blog)\b/g, "blog"],
  [/\b(cidade|onde fica|localizacao)\b/g, "cerro largo"],
];

function fold(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function tokenize(value: string) {
  return fold(value)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(token => token.length > 1 && !stopwords.has(token));
}

function expand(query: string) {
  let expanded = fold(query);
  for (const [pattern, replacement] of aliases) expanded = expanded.replace(pattern, ` ${replacement} `);
  return expanded;
}

function previousUserTopics(messages: ChatTurn[]) {
  const users = messages.filter(message => message.role === "user");
  return users.length >= 2 ? users[users.length - 2].content : "";
}

function scoreDoc(doc: KnowledgeDoc, query: string, tokens: string[]) {
  const haystack = fold(`${doc.title} ${doc.keywords.join(" ")} ${doc.answer}`);
  let score = 0;
  if (haystack.includes(fold(query)) && query.length > 12) score += 8;
  for (const keyword of doc.keywords) {
    if (fold(query).includes(keyword) || haystack.includes(fold(query).slice(0, 24))) {
      if (fold(query).includes(keyword)) score += 5;
    }
  }
  for (const token of tokens) {
    if (doc.keywords.some(keyword => keyword.includes(token) || token.includes(keyword.split(" ")[0] ?? ""))) score += 3;
    if (haystack.includes(token)) score += 1;
  }
  return score;
}

function retrieve(query: string, history: ChatTurn[]) {
  const docs = communityKnowledge();
  const expanded = expand(query);
  const tokens = tokenize(expanded);
  const followUp = tokens.length <= 3 || /^(e |e a |e o |essa|esse|disso|daí|dai|entao|e sobre)/.test(fold(query));
  const prior = followUp ? expand(previousUserTopics(history)) : "";
  const ranked = docs
    .map(doc => ({ doc, score: scoreDoc(doc, `${expanded} ${prior}`, tokenize(`${expanded} ${prior}`)) }))
    .sort((left, right) => right.score - left.score);
  const best = ranked.filter(item => item.score >= 4)[0];
  return best ? [best.doc] : [];
}

function compose(docs: KnowledgeDoc[]) {
  if (docs.length === 0) return chatCopy.fallback;
  return docs[0].answer;
}

export function answerFromKnowledge(messages: ChatTurn[]) {
  const latest = messages.at(-1);
  if (!latest || latest.role !== "user") return "Envie uma pergunta sobre a Tech Missões para começarmos.";
  const query = latest.content.trim();
  const folded = fold(query);
  if (greetings.test(folded)) {
    return chatCopy.greeting;
  }
  if (thanks.test(folded)) {
    return chatCopy.thanks;
  }
  return compose(retrieve(query, messages));
}

function trackPromptName(name: string) {
  return `**${/[a-z][A-Z]/.test(name) ? name : name.toLowerCase()}**`;
}

export function systemPrompt() {
  const tracks = studyTracks.map(track => trackPromptName(track.name));
  const trackList = tracks.length <= 1
    ? tracks[0] ?? ""
    : `${tracks.slice(0, -1).join(", ")} e ${tracks[tracks.length - 1]}`;
  return `Você é o guia da comunidade ${siteName}, em ${sitePlace.locality}, na ${sitePlace.area}, ${sitePlace.region}.
Responda em português brasileiro, com tom próximo, claro e fiel ao site. No máximo três frases. Sem emojis.
Use somente os fatos abaixo. Responda só o que foi perguntado, sem juntar assuntos vizinhos.
Se a pergunta sair desse conteúdo, diga o que você cobre e convide a pessoa a reformular.
Não invente eventos, artigos, preços, links, nomes de pessoas, parcerias ou datas que não estejam no material.
Não cite coordenadas geográficas.
Quando citar um endereço, use markdown [texto curto](url). Nunca cole a URL completa no meio da frase.
Ao nomear as áreas de estudo, escreva ${trackList}.

${knowledgePrompt()}`;
}
