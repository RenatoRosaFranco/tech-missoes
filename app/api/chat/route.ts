/**
 * Community chat API (`POST /api/chat`).
 *
 * Validates the history and answers with ChatGPT via {@link answerWithChatGPT}.
 *
 * @packageDocumentation
 */

import { answerWithChatGPT, type ChatTurn } from "@/lib/community-guide";

const maxMessageLength = 500;
const maxHistory = 16;

/**
 * Parses and sanitizes a chat history payload.
 *
 * Keeps the last 16 turns, caps each message, and requires
 * the final turn to come from the user.
 *
 * @param value - Unknown `messages` field from the request body.
 * @returns Valid {@link ChatTurn} list, or `null` when the payload is unusable.
 */
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

/**
 * Answers a community question with ChatGPT.
 *
 * @param request - JSON body `{ messages: ChatTurn[] }`.
 * @returns `{ reply }` or a 400/503 error payload in Portuguese.
 */
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
    const reply = await answerWithChatGPT(messages);
    return Response.json({ reply });
  } catch {
    return Response.json({ error: "O guia está indisponível no momento." }, { status: 503 });
  }
}
