import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export type PostBody = {
  prompt: string;
  modelName: string;
};

export async function POST(request: Request) {
  const body: PostBody = await request.json();
  const { prompt, modelName } = body;

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  const response = streamText({
    prompt,
    model: openrouter(modelName ?? "x-ai/grok-4-fast:free"),
  });

  return response.toUIMessageStreamResponse();
}
