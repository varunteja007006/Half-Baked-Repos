"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

import { Combobox, type OptionType } from "@/components/combo-box";
import {
  ErrorMessage,
  RenderOutput,
  SendButton,
  StopButton,
} from "./components";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { programming_languages_schema } from "../_schema/programming_languages.schema";

const languages: OptionType[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
];

export default function ProgrammingLanguageChat({
  selectedModel,
}: Readonly<{
  selectedModel: string | undefined;
}>) {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
    null
  );

  const handleSelect = (value: string) => {
    setSelectedLanguage(value);
  };

  const { submit, isLoading, error, stop, object } = useObject({
    api: "/api/open-router/structured-data/programming-language",
    schema: programming_languages_schema,
    onFinish: () => {
      setSelectedLanguage(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel) {
      toast.error("Please select the model");
      return;
    }

    if (!selectedLanguage) {
      toast.error("Please select the language");
      return;
    }

    submit({ selectedLanguage, modelName: selectedModel, addSystemPrompt: "" });
  };

  return (
    <div className="space-y-6">
      {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Select Programming Language:</p>
          <Combobox options={languages} onSelect={handleSelect} />
        </div>

        <div className="space-y-2">
          <div className="flex flex-row items-center justify-between gap-2">
            {object?.programming_language && (
              <p className="text-lg font-bold">
                {object?.programming_language}
              </p>
            )}
            {object?.code?.version && (
              <span className="py-2 px-4 bg-secondary text-secondary-foreground rounded-4xl">
                <p className="text-xs">version : {object?.code?.version}</p>
              </span>
            )}
          </div>
          {object?.companies_using && (
            <div className="flex flex-row gap-2 items-center justify-start">
              {object?.companies_using?.map((item) => {
                return <Badge key={item}>{item}</Badge>;
              })}{" "}
            </div>
          )}

          {object?.description && (
            <p className="text-sm">{object?.description}</p>
          )}
          <div className="p-2 border bg-accent text-accent-foreground">
            {object?.code?.code_snippet && (
              <RenderOutput>{object?.code?.code_snippet}</RenderOutput>
            )}
          </div>
          {object?.code?.what_this_code_does && (
            <p className="text-sm">{object?.code?.what_this_code_does}</p>
          )}
        </div>

        {isLoading ? (
          <StopButton type="button" onClick={stop} />
        ) : (
          <SendButton type="submit" />
        )}
      </form>
    </div>
  );
}
