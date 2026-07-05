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
import { BotIcon, Paperclip, User } from "lucide-react";
import { toast } from "sonner";
import { DefaultChatTransport } from "ai";
import Image from "next/image";

export default function MultiModalChatbot({
  selectedModel,
}: Readonly<{
  selectedModel: string | undefined;
}>) {
  const [input, setInput] = React.useState<string | undefined>();
  const [addSystemPrompt, setAddSystemPrompt] = React.useState(false);
  const [files, setFiles] = React.useState<FileList | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/open-router/multi-modal",
    }),
  });

  const isProcessing = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel) {
      toast.error("Please select the model");
      return;
    }

    if (!input) {
      toast.error("Please enter the prompt");
      return;
    }

    let payload: {
      text: string;
      files?: FileList;
    } = { text: input || "" };

    if (files) {
      payload["files"] = files;
    }

    sendMessage(payload, {
      body: {
        modelName: selectedModel,
        addSystemPrompt,
      },
    })
      .then((res) => console.log(res))
      .catch((e) => toast.error("Something went wrong"))
      .finally(() => {
        setInput("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
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
                      <div key={`${message.id} - ${index} - text`}>
                        <RenderOutput>{part.text}</RenderOutput>
                      </div>
                    );
                  case "file":
                    if (part.mediaType?.startsWith("image/")) {
                      return (
                        <Image
                          key={`${message.id} - ${index} - image`}
                          src={part.url}
                          alt={
                            part.filename ??
                            `attachment ${message.id} - ${index}`
                          }
                          width={250}
                          height={250}
                          objectFit="contain"
                        />
                      );
                    }

                    if (part.mediaType?.startsWith("application/pdf")) {
                      return (
                        <iframe
                          key={`${message.id} - ${index} - pdf`}
                          src={part.url}
                          width={"500"}
                          height={"500"}
                          title={`${part.filename}`}
                        />
                      );
                    }
                    return null;
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

        <div className="flex flex-row gap-4 items-center justify-between">
          {status === "ready" || status === "error" ? (
            <SendButton disabled={isProcessing} />
          ) : (
            <StopButton onClick={stop} />
          )}

          <Label htmlFor="file-upload">
            {!files || files?.length === 0 ? (
              <>
                <Paperclip /> Attach your file here
              </>
            ) : (
              <>Attached files: {files?.length}</>
            )}
          </Label>
          <Input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files) {
                setFiles(e.target.files);
              }
            }}
            className="hidden"
            multiple
          />
        </div>
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
