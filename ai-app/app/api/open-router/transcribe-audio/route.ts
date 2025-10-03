// ! ISSUE with OPEN ROUTER 🥲, probably need open AI key, for audio transcription.

// import { createOpenRouter } from "@openrouter/ai-sdk-provider";
// import { convertToModelMessages, streamText, UIMessage, experimental_transcribe as transcribe } from "ai";

// export type PostBody = {
//   messages: UIMessage[];
//   modelName: string;
//   addSystemPrompt?: boolean;
// };

// export async function POST(request: Request) {
//   const { messages, modelName, addSystemPrompt }: PostBody =
//     await request.json();

//   console.log(
//     "\nModel Name:",
//     modelName,
//     addSystemPrompt,
//     "\n==========================\n"
//   );

//   const openrouter = createOpenRouter({
//     apiKey: process.env.OPEN_ROUTER_KEY,
//   });

//   const response = transcribe({
//     messages: [
//       {
//         role: "system",
//         content: addSystemPrompt
//           ? "Stick to practical examples and small explanations."
//           : "",
//       },
//       ...convertToModelMessages(messages),
//     ],
//     model: openrouter(modelName),
//   });

//   response.usage.then((usage) => {
//     console.log(JSON.stringify(usage));
//   });

//   return response.toUIMessageStreamResponse();
// }
