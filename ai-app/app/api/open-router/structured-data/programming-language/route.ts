import { programming_languages_schema } from "@/app/_schema/programming_languages.schema";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";

export type PostBody = {
  selectedLanguage: string;
  modelName: string;
  addSystemPrompt?: boolean;
};

export async function POST(request: Request) {
  const { selectedLanguage, modelName, addSystemPrompt }: PostBody = await request.json();

  console.log(
    "\nPrompt: ",
    selectedLanguage,
    "\nModel Name:",
    modelName,
    "\n==========================\n"
  );

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY,
  });

  const response = streamObject({
    model: openrouter(modelName),
    prompt: `Explain the following programming language if it exists - ${selectedLanguage}. 
    If it does not exist just decline`,
    schema: programming_languages_schema,
  });

  response.usage.then((usage) => {
    console.log(JSON.stringify(usage));
  });

  return response.toTextStreamResponse();
}
