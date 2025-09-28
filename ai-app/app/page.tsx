"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loader2, Send, StopCircle } from "lucide-react";

import { toast } from "sonner";

import { PostBody } from "./api/open-router/chat/route";
import { useCompletion } from "@ai-sdk/react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type ModelItem = {
  id: string;
  name: string;
};

export type ModelResponse = {
  data: Array<ModelItem>;
};

const getModels = async (): Promise<ModelResponse | undefined> => {
  try {
    const url = "https://openrouter.ai/api/v1/models";
    const options = { method: "GET" };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [models, setModels] = React.useState<ModelResponse | undefined>();
  const [selectedModel, setSelectedModel] = React.useState<
    string | undefined
  >();

  const [prompt, setPrompt] = React.useState<string | undefined>();
  const [aiResponse, setAiResponse] = React.useState<string | undefined>();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading: isStreamLoading,
    error: streamError,
    stop,
    setInput,
  } = useCompletion({
    api: "/api/open-router/stream",
  });

  const getInitialData = async () => {
    const res = await getModels();
    setModels(res);
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  const modelOptions = React.useMemo(() => {
    return (
      models?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? []
    );
  }, [models]);

  const sendPrompt = async () => {
    try {
      setIsProcessing(true);

      if (!selectedModel) {
        throw new Error("Model not selected!!");
      }

      if (!prompt) {
        throw new Error("Prompt is empty!!");
      }

      const payload: PostBody = {
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
    <div className="max-w-xl flex flex-col gap-8 mx-auto">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          Select the Model {`(Free Models Only)`}
        </p>
        <Combobox
          options={modelOptions}
          onSelect={(selectedItem) => setSelectedModel(selectedItem)}
        />
      </div>

      <div>
        <Tabs defaultValue="chat" className="max-w-4xl">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="stream">Stream</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            {isProcessing && (
              <div>
                <Loader2 className="animate-spin size-6" />
              </div>
            )}

            <div className="max-w-4xl wrap-break-word text-wrap font-mono">
              <Markdown remarkPlugins={[remarkGfm]}>
                {aiResponse || ""}
              </Markdown>
            </div>

            <Input
              value={prompt ?? ""}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              disabled={isProcessing}
              type="button"
              onClick={sendPrompt}
              size={"sm"}
            >
              <Send className="mr-2 size-4" />
              Send
            </Button>
          </TabsContent>
          <TabsContent value="stream" className="space-y-4">
            {isStreamLoading && (
              <div className="mx-auto">
                <Loader2 className="animate-spin size-6" />
              </div>
            )}

            {streamError?.message && (
              <p className="text-red-400 text-sm">{streamError.message}</p>
            )}

            <div className="max-w-4xl wrap-break-word text-wrap font-mono">
              <Markdown remarkPlugins={[remarkGfm]}>{completion}</Markdown>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                setInput("");
              }}
              className="space-y-4"
            >
              <Input value={input} onChange={handleInputChange} />
              {isStreamLoading ? (
                <Button type="button" size={"sm"} onClick={stop}>
                  <StopCircle className="mr-2 size-4" />
                  Stop
                </Button>
              ) : (
                <Button disabled={isStreamLoading} type="submit" size={"sm"}>
                  <Send className="mr-2 size-4" />
                  Send
                </Button>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
