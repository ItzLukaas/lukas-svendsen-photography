import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai";
import { z } from "zod";

import { buildSystemPrompt } from "@/lib/assistant/prompt";
import { formatKnowledgeContext, retrieveKnowledge } from "@/lib/assistant/retrieve";
import { ruleBasedReply } from "@/lib/assistant/suggestions";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  messages: z.array(z.any()).max(40),
  pagePath: z.string().max(200).optional(),
});

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;
    const parts = message.parts ?? [];
    const text = parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

function hasAiCredentials() {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
  );
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return Response.json({ error: "Ugyldig forespørgsel" }, { status: 400 });
    }

    const messages = parsed.data.messages as UIMessage[];
    const pagePath = parsed.data.pagePath || "/";
    const userText = lastUserText(messages);

    if (!userText) {
      return Response.json({ error: "Tom besked" }, { status: 400 });
    }

    const knowledge = retrieveKnowledge(userText, pagePath, 6);
    const knowledgeContext = formatKnowledgeContext(knowledge);
    const system = buildSystemPrompt(knowledgeContext, pagePath);

    if (!hasAiCredentials()) {
      const reply = ruleBasedReply(userText);
      const stream = createUIMessageStream({
        execute: ({ writer }) => {
          const id = crypto.randomUUID();
          writer.write({ type: "text-start", id });
          writer.write({ type: "text-delta", id, delta: reply });
          writer.write({ type: "text-end", id });
        },
      });
      return createUIMessageStreamResponse({ stream });
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: "google/gemini-2.5-flash",
      system,
      messages: modelMessages,
      temperature: 0.4,
      maxOutputTokens: 700,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[assistant]", error);
    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        const id = crypto.randomUUID();
        const reply =
          "Ups — jeg kan ikke svare lige nu.\n\nDu kan stadig kontakte Lukas direkte via /booking eller /kontakt, så hjælper han dig videre.";
        writer.write({ type: "text-start", id });
        writer.write({ type: "text-delta", id, delta: reply });
        writer.write({ type: "text-end", id });
      },
    });
    return createUIMessageStreamResponse({ stream });
  }
}
