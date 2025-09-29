import React from "react";

import { Button } from "@/components/ui/button";

import { Loader2, Send, StopCircle } from "lucide-react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const LoadingDiv = () => {
  return (
    <div className="mx-auto w-full flex flex-col items-center justify-center">
      <Loader2 className="animate-spin size-6" />
    </div>
  );
};

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-red-400 text-sm">{children}</p>;
};

export const StopButton = ({
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button type="button" size={"sm"} {...props}>
      {children || (
        <>
          <StopCircle className="mr-2 size-4" />
          Stop
        </>
      )}
    </Button>
  );
};

export const SendButton = ({
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button type="submit" size={"sm"} {...props}>
      {children || (
        <>
          <Send className="mr-2 size-4" />
          Stop
        </>
      )}
    </Button>
  );
};

export const RenderOutput = ({ children }: { children: string }) => {
  return (
    <div className="max-w-4xl py-4 px-2 wrap-break-word text-wrap font-mono max-h-[calc(100dvh-20rem)] lg:max-h-[calc(100vh-20rem)] overflow-y-auto">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
};
