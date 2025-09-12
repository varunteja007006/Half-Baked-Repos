import React from "react";
import { react_data } from "./react_data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const LANGUAGE = "jsx";

const Main = () => {
  return (
    <div>
      <div className="mt-5 space-y-8">
        {react_data.map((item, index) => {
          return (
            <section key={index} id={item.id}>
              <Card className="w-full mx-auto md:w-2/3">
                <CardHeader className="md:pb-1 md:px-10">
                  <CardTitle className="flex gap-2 items-center">
                    <Link href={`#${item.id}`}>{item.title}</Link>
                    <a href={item.githubLink}>
                      <FaGithub />
                    </a>
                  </CardTitle>
                  <ul className="space-y-1">
                    {item.explanation?.map((point) => (
                      <li key={point}>
                        <CardDescription>{point}</CardDescription>
                      </li>
                    ))}
                  </ul>
                </CardHeader>
                <CardContent className="p-2 m-3 mt-0 rounded-md border md:mx-10 md:my-5">
                  <p className="py-1 font-semibold">Code Demo:</p>
                  <div className="h-[1px] bg-zinc-500 w-full mb-3"></div>
                  {item?.Component ?? null}
                </CardContent>
                <CardContent className="overflow-hidden p-0 m-3 bg-gray-50 rounded border border-gray-600 md:mx-10 md:my-5">
                  <ScrollArea className="min-h-[200px] min-w-[350px] flex">
                    <SyntaxHighlighter
                      style={atomDark}
                      language={LANGUAGE}
                      customStyle={{ margin: 0 }}
                    >
                      {item.CodeSnippet || ""}
                    </SyntaxHighlighter>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center items-center w-full">
                  <Button variant={"outline"} asChild>
                    <a href={item.href}>
                      <FaChevronDown className="w-4 h-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
