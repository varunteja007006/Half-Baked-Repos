"use client";

import { Combobox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { PostBody } from "./api/open-router/chat/route";
import { Input } from "@/components/ui/input";

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
    <div className="max-w-xl flex flex-col gap-3">
      {isProcessing && (
        <div>
          <Loader2 className="animate-spin size-6" />
        </div>
      )}

      <pre>{aiResponse && JSON.stringify(aiResponse ?? "", null, 2)}</pre>
      <Combobox
        options={modelOptions}
        onSelect={(selectedItem) => setSelectedModel(selectedItem)}
      />

      <Input value={prompt ?? ""} onChange={(e) => setPrompt(e.target.value)} />

      <Button
        disabled={isProcessing}
        type="button"
        onClick={sendPrompt}
        size={"sm"}
      >
        <Send className="mr-2 size-4" />
        Send
      </Button>
    </div>
  );
}
