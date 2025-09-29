"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { LoadingDiv, RenderOutput, SendButton } from "./components";

export default function Chat({
  selectedModel,
}: Readonly<{
  selectedModel: string | undefined;
}>) {
  const [prompt, setPrompt] = React.useState<string | undefined>();
  const [aiResponse, setAiResponse] = React.useState<string | undefined>();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const sendPrompt = async () => {
    try {
      setIsProcessing(true);

      if (!selectedModel) {
        throw new Error("Model not selected!!");
      }

      if (!prompt) {
        throw new Error("Prompt is empty!!");
      }

      const payload = {
        prompt,
        modelName: selectedModel,
      };

      const res = await fetch("http://localhost:3000/api/open-router/chat", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      setPrompt("");
      if (data.success) {
        setAiResponse(data.data);
        return;
      }
      toast.error("Something went wrong");
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {isProcessing && <LoadingDiv />}

      {aiResponse && <RenderOutput>{aiResponse || ""}</RenderOutput>}

      <Input value={prompt ?? ""} onChange={(e) => setPrompt(e.target.value)} />

      <SendButton onClick={sendPrompt} />
    </div>
  );
}
