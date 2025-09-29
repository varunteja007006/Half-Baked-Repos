import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export type PostBody = {
  prompt: string;
  modelName: string;
};

export async function POST(request: Request) {
  const { prompt, modelName }: PostBody = await request.json();

  console.log(
    "\nPrompt: ",
    prompt,
    "\nModel Name:",
    modelName,
    "\n==========================\n"
  );

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  const response = streamText({
    prompt,
    model: openrouter(modelName),
  });

  response.usage.then((usage) => {
    console.log(JSON.stringify(usage));
  });

  return response.toUIMessageStreamResponse();
}
