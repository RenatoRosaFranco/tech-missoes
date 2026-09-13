/**
 * Conversational guide for the community.
 *
 * Loads the system prompt from `prompts/` and answers through ChatGPT.
 *
 * @packageDocumentation
 */

import "server-only";
import { knowledgePrompt } from "./community-knowledge";
import { communityGuidePrompt } from "@/prompts/community-guide";
import { studyTracks } from "@/ui/componentes/trilhas/tracks";
import { siteName, sitePlace } from "@/ui/site/site";

/** Single turn in a community chat conversation. */
export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

/** Formats a track name for the prompt, preserving camelCase. */
function trackPromptName(name: string) {
  return `**${/[a-z][A-Z]/.test(name) ? name : name.toLowerCase()}**`;
}

/**
 * Fills {@link communityGuidePrompt} with site facts and knowledge-base copy.
 *
 * @returns System message sent to ChatGPT.
 */
export function systemPrompt() {
  const tracks = studyTracks.map(track => trackPromptName(track.name));
  const trackList = tracks.length <= 1
    ? tracks[0] ?? ""
    : `${tracks.slice(0, -1).join(", ")} e ${tracks[tracks.length - 1]}`;

  return communityGuidePrompt
    .replaceAll("{{siteName}}", siteName)
    .replaceAll("{{locality}}", sitePlace.locality)
    .replaceAll("{{area}}", sitePlace.area)
    .replaceAll("{{region}}", sitePlace.region)
    .replaceAll("{{trackList}}", trackList)
    .replaceAll("{{knowledge}}", knowledgePrompt());
}

/**
 * Asks ChatGPT for a reply, using {@link systemPrompt} as context.
 *
 * Requires `OPENAI_API_KEY`. Optional `OPENAI_MODEL` defaults to `gpt-4o-mini`.
 *
 * @param messages - Sanitized conversation history ending on a user turn.
 * @returns Assistant text from the model.
 * @throws If the API key is missing, the request fails, or the reply is empty.
 */
export async function answerWithChatGPT(messages: ChatTurn[]) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not configured.");

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

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  const payload = await response.json() as { choices?: { message?: { content?: string } }[] };
  const text = payload.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("OpenAI returned an empty reply.");
  return text;
}
