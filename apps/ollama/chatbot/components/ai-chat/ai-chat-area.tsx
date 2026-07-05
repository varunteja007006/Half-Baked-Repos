import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from "lucide-react";
import { Button } from "../ui/button";

export default function AIChatArea() {
  const [response, setResponse] = React.useState("");

  const [prompt, setPrompt] = React.useState("");

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value);
  }

  const fetchResponse = async (data: string) => {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llava:13b",
        prompt: prompt,
      }),
    });

    if (response !== null) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true && reader) {
        const { done, value } = await reader.read();
        if (done) {
          setResponse((prev) => prev + "\n");
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        setResponse((prev) => prev + JSON.parse(chunk)?.response);
      }
    }
  };
  return (
    <div className="min-h-[calc(100vh-10rem)]">
      <ScrollArea className="h-[calc(100vh-18rem)] w-full p-4 m-8 border">
        {/* <Bot />
        <div
          dangerouslySetInnerHTML={{
            __html: response.replace(/\n/g, "<br />"),
          }}
        ></div> */}
        <p>Work in progress...</p>
      </ScrollArea>
      <div className="px-8 flex items-start gap-2">
        <Textarea
          placeholder="Type your prompt here"
          onChange={onChange}
          value={prompt}
        />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => fetchResponse("")}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
