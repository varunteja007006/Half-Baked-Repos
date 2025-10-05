"use client";

import React from "react";

import { Combobox } from "@/components/combo-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Stream from "./_components/Stream";
import Chat from "./_components/Chat";
import Chatbot from "./_components/Chatbot";
import ProgrammingLanguageChat from "./_components/ProgrammingLanguageChat";
import MultiModalChatbot from "./_components/MultiModalChatbot";
import ToolChat from "./_components/ToolChat";

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

const renderSection = (
  activeSection: string,
  selectedModel: string | undefined
) => {
  switch (activeSection) {
    case "chat":
      return <Chat selectedModel={selectedModel} />;
    case "stream":
      return <Stream selectedModel={selectedModel} />;
    case "chat-bot":
      return <Chatbot selectedModel={selectedModel} />;
    case "programming-language-guru":
      return <ProgrammingLanguageChat selectedModel={selectedModel} />;
    case "multi-modal-bot":
      return <MultiModalChatbot selectedModel={selectedModel} />;
    case "tool-chat":
      return <ToolChat selectedModel={selectedModel} />;
    default:
      return null;
  }
};

const buttons = [
  { id: "chat", label: "Chat" },
  { id: "stream", label: "Stream" },
  { id: "chat-bot", label: "Chat Bot" },
  { id: "programming-language-guru", label: "Programming Guru" },
  { id: "multi-modal-bot", label: "Multi Modal Bot" },
  { id: "tool-chat", label: "Tools Chat" },
];

export default function Home() {
  const [models, setModels] = React.useState<ModelResponse | undefined>();
  const [selectedModel, setSelectedModel] = React.useState<
    string | undefined
  >();
  const [activeSection, setActiveSection] = React.useState("chat");

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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">
          Select the Model {`(Free Models Only)`}
        </p>
        <Combobox
          options={modelOptions}
          onSelect={(selectedItem) => setSelectedModel(selectedItem)}
        />
      </div>

      {/* Button Section */}
      <div className="flex flex-wrap gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveSection(btn.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all 
              ${
                activeSection === btn.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Active Section */}
      <div className="mt-6">{renderSection(activeSection, selectedModel)}</div>
    </div>
  );
}
