"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useChat } from "@ai-sdk/react";

import {
  ErrorMessage,
  LoadingDiv,
  RenderOutput,
  SendButton,
  StopButton,
} from "./components";
import { BotIcon, User } from "lucide-react";

export default function Chatbot({
  selectedModel,
}: Readonly<{
  selectedModel: string | undefined;
}>) {
  const [input, setInput] = React.useState<string | undefined>();
  const [addSystemPrompt, setAddSystemPrompt] = React.useState(false);

  const { messages, sendMessage, status, stop, error } = useChat();

  const isProcessing = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(
      { text: input || "" },
      {
        body: {
          modelName: selectedModel,
          addSystemPrompt,
        },
      }
    );
    setInput("");
  };


  return (
    <div className="space-y-6">
      <div className="flex mt-2 items-center space-x-2">
        <Switch
          checked={addSystemPrompt}
          onCheckedChange={(val) => setAddSystemPrompt(val)}
          id="system-prompt"
        />
        <Label htmlFor="system-prompt">System Prompt</Label>
      </div>

      {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}

      {messages.map((message) => {
        return (
          <React.Fragment key={message.id}>
            <ChatBubble role={message.role}>
              {message.parts.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div key={index}>
                        <RenderOutput>{part.text}</RenderOutput>
                      </div>
                    );
                  case "file":
                    break;
                  default:
                    break;
                }
              })}
            </ChatBubble>
          </React.Fragment>
        );
      })}

      {isProcessing && (
        <div className="flex flex-row items-center justify-start gap-4">
          <LoadingDiv className="animate-pulse items-start w-fit mx-0" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Thinking...
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={input || ""} onChange={(e) => setInput(e.target.value)} />

        {status === "ready" ? (
          <SendButton disabled={isProcessing} />
        ) : (
          <StopButton onClick={stop} />
        )}
      </form>
    </div>
  );
}

const ChatBubble = ({
  role,
  children,
}: {
  role: "user" | "assistant" | "system";
  children: React.ReactNode;
}) => {
  if (role === "user") {
    return (
      <div className="flex flex-col gap-3 items-end justify-start">
        <div className="p-2 bg-secondary text-secondary-foreground rounded-full">
          <User className="size-6" />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      <div className="p-2 bg-secondary text-secondary-foreground rounded-full">
        <BotIcon className="size-6" />
      </div>
      {children}
    </div>
  );
};
