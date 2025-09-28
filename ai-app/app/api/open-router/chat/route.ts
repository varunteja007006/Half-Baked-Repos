import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export type PostBody = {
  prompt: string;
  modelName: string;
};

export async function POST(request: Request) {
  const { prompt, modelName }: PostBody = await request.json();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  try {
    const response = streamText({
      prompt,
      model: openrouter(modelName),
    });

    await response.consumeStream();

    const res = await response.text;

    return Response.json({
      success: true,
      message: "Ok",
      data: res,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      message: "Failed",
      data: "",
    });
  }
}
