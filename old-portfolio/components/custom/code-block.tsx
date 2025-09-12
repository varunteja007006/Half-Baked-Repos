import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const LANGUAGE = "jsx";

export default function CodeBlock(props: Readonly<{ code: string }>) {
  const { code } = props;
  return (
    <ScrollArea className="min-h-[200px] min-w-[350px] flex">
      <SyntaxHighlighter
        style={atomDark}
        language={LANGUAGE}
        customStyle={{ margin: 0 }}
      >
        {code || ""}
      </SyntaxHighlighter>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
