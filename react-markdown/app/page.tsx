"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ConversationProps = { children: React.ReactNode };

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`
const markdown2 = `
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
`;

export function AiResponse({ children }: ConversationProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {typeof children === "string" ? children : ""}
    </ReactMarkdown>
  );
}
export default function Home() {
  return (
    <main>
      <div className="prose">
        <AiResponse>{markdown}</AiResponse>
        <AiResponse>{markdown2}</AiResponse>
      </div>
    </main>
  );
}
