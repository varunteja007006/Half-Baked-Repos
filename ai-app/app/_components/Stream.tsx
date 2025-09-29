"use client";

import React from "react";

import { Input } from "@/components/ui/input";

import { useCompletion } from "@ai-sdk/react";

import {
  ErrorMessage,
  LoadingDiv,
  RenderOutput,
  SendButton,
  StopButton,
} from "./components";

export default function Stream({
  selectedModel,
}: Readonly<{
  selectedModel: string | undefined;
}>) {
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
    body: {
      modelName: selectedModel,
    },
  });

  return (
    <div className="space-y-6">
      {isStreamLoading && <LoadingDiv />}

      {streamError?.message && (
        <ErrorMessage>{streamError.message}</ErrorMessage>
      )}

      <RenderOutput>{completion}</RenderOutput>

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
          <StopButton onClick={stop} />
        ) : (
          <SendButton disabled={isStreamLoading} />
        )}
      </form>
    </div>
  );
}
