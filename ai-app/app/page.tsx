"use client";

import React from "react";

import { Combobox } from "@/components/combo-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Stream from "./_components/Stream";
import Chat from "./_components/Chat";

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

      <div className="mb-10">
        <Tabs defaultValue="chat" className="max-w-4xl">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="stream">Stream</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Chat selectedModel={selectedModel} />
          </TabsContent>
          <TabsContent value="stream">
            <Stream selectedModel={selectedModel} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
