import { streamText, UIMessage, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "moonshotai/kimi-k2.7-code",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}