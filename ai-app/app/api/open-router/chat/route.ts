import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export type PostBody = {
  prompt: string;
  modelName: string;
  addSystemPrompt?: boolean;
};

export async function POST(request: Request) {
  const { prompt, modelName, addSystemPrompt }: PostBody = await request.json();

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

  try {
    const response = streamText({
      prompt,
      model: openrouter(modelName),
    });

    await response.consumeStream();

    response.usage.then((usage) => {
      console.log(JSON.stringify(usage));
    });

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
