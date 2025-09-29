import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export type PostBody = {
  messages: UIMessage[];
  modelName: string;
};

export async function POST(request: Request) {
  const { messages, modelName }: PostBody = await request.json();

  console.log("\nModel Name:", modelName, "\n==========================\n");

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  const response = streamText({
    messages: convertToModelMessages(messages),
    model: openrouter(modelName),
  });

  response.usage.then((usage) => {
    console.log(JSON.stringify(usage));
  });

  return response.toUIMessageStreamResponse();
}
