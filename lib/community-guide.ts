import { communityKnowledge, knowledgePrompt, type KnowledgeDoc } from "./community-knowledge";

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
  [/\b(zap|wpp|whats)\b/g, "whatsapp"],
  [/\b(entrar|juntar|inscrever|membro|participar)\b/g, "fazer parte"],
  [/\b(preco|valor|quanto custa|loja)\b/g, "kit"],
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
  const best = ranked.filter(item => item.score >= 4).slice(0, 2);
  return best.map(item => item.doc);
}

function compose(docs: KnowledgeDoc[], query: string) {
  if (docs.length === 0) {
    return "Consigo responder o que está na comunidade Tech Missões: quem somos, onde nascemos, as três áreas de estudo, como participar, as tecnologias e o kit. Reformule com um desses assuntos, ou percorra o site — a conversa da comunidade também começa na seção Faça parte.";
  }
  if (docs.length === 1 || docs[0].id === docs[1]?.id) return docs[0].answer;
  const folded = fold(query);
  if (folded.includes("area") || folded.includes("trilha") || folded.includes("estud")) {
    return docs.map(doc => doc.answer).join(" ");
  }
  return `${docs[0].answer} ${docs[1].answer}`;
}

export function answerFromKnowledge(messages: ChatTurn[]) {
  const latest = messages.at(-1);
  if (!latest || latest.role !== "user") return "Envie uma pergunta sobre a Tech Missões para começarmos.";
  const query = latest.content.trim();
  const folded = fold(query);
  if (greetings.test(folded)) {
    return "Olá. Sou o guia da Tech Missões. Pergunte sobre a comunidade, as áreas de estudo, como participar ou o kit.";
  }
  if (thanks.test(folded)) {
    return "Que bom. Se quiser, posso falar de outra área, de como entrar no grupo ou do kit da comunidade.";
  }
  return compose(retrieve(query, messages), query);
}

export function systemPrompt() {
  return `Você é o guia da comunidade Tech Missões, em Cerro Largo, na região das Missões, RS.
Responda em português brasileiro, com tom próximo, claro e fiel ao site. Frases curtas. Sem emojis.
Use somente os fatos abaixo. Se a pergunta sair desse conteúdo, diga o que você cobre e convide a pessoa a reformular.
Não invente eventos, preços, links, nomes de pessoas, parcerias ou datas que não estejam no material.

${knowledgePrompt()}`;
}
