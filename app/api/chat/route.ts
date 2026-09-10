import { answerFromKnowledge, systemPrompt, type ChatTurn } from "@/lib/community-guide";

const maxMessageLength = 500;
const maxHistory = 16;

function asTurns(value: unknown): ChatTurn[] | null {
  if (!Array.isArray(value)) return null;
  const turns: ChatTurn[] = [];
  for (const item of value.slice(-maxHistory)) {
    if (!item || (item.role !== "user" && item.role !== "assistant")) return null;
    if (typeof item.content !== "string") return null;
    const content = item.content.trim().slice(0, maxMessageLength);
    if (!content) return null;
    turns.push({ role: item.role, content });
  }
  return turns.length && turns.at(-1)?.role === "user" ? turns : null;
}

async function answerWithModel(messages: ChatTurn[]) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.3,
      messages: [{ role: "system", content: systemPrompt() }, ...messages],
    }),
  });
  if (!response.ok) return null;
  const payload = await response.json() as { choices?: { message?: { content?: string } }[] };
  const text = payload.choices?.[0]?.message?.content?.trim();
  return text || null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Não foi possível ler a pergunta." }, { status: 400 });
  }
  const messages = asTurns(typeof body === "object" && body ? (body as { messages?: unknown }).messages : null);
  if (!messages) {
    return Response.json({ error: "Envie uma pergunta sobre a comunidade." }, { status: 400 });
  }
  try {
    const reply = await answerWithModel(messages) ?? answerFromKnowledge(messages);
    return Response.json({ reply });
  } catch {
    return Response.json({ reply: answerFromKnowledge(messages) });
  }
}
