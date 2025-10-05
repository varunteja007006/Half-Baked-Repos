import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, stepCountIs, streamText, tool } from "ai";
import type { InferUITools, UIDataTypes, UIMessage } from "ai";
import { z } from "zod";

const tools = {
  getWeather: tool({
    description: "Get the weather of a location",
    inputSchema: z.object({
      city: z.string().describe("The city to get weather information for"),
    }),
    execute: async ({ city }) => {
      switch (city) {
        case "chennai":
          return "It is 30C and cool";
        case "hyderabad":
          return "It is 20C and cool";
        case "tokyo":
          return "It is 10C and cool";

        default:
          return "Not found";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessages = UIMessage<never, UIDataTypes, ChatTools>;

export type PostBody = {
  messages: ChatMessages[];
  modelName: string;
  addSystemPrompt?: boolean;
};

export async function POST(request: Request) {
  const { messages, modelName, addSystemPrompt }: PostBody =
    await request.json();

  console.log(
    "\nModel Name:",
    modelName,
    addSystemPrompt,
    "\n==========================\n"
  );

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  const response = streamText({
    tools,
    messages: [
      {
        role: "system",
        content: addSystemPrompt
          ? "Stick to practical examples and small explanations."
          : "",
      },
      ...convertToModelMessages(messages),
    ],
    model: openrouter(modelName),
    stopWhen: stepCountIs(2),
  });

  response.usage.then((usage) => {
    console.log(JSON.stringify(usage));
  });

  return response.toUIMessageStreamResponse();
}
