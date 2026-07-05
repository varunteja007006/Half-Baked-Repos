import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { problems_data } from "../problems_data";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import MyTooltip from "@/components/custom/MyTooltip";

const Main = () => {
  return (
    <Card className="p-5 pt-2 space-y-2">
      <h1 className="mt-2 text-2xl font-semibold underline">
        Machine Coding Problem Statements:
      </h1>
      <Accordion type="single" collapsible>
        {problems_data.map((item, index) => {
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b-2"
            >
              <AccordionTrigger className="text-lg font-semibold">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                {item.statement.map((statement, index) => {
                  return (
                    <p key={index} className="text-base">
                      {statement}
                    </p>
                  );
                })}
                <div className="flex gap-2 justify-start items-center">
                  <MyTooltip text="Check it out">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      asChild={true}
                      className="mt-5"
                    >
                      <Link href={item.url || ""}>
                        <ArrowUpRight className="size-6" />
                      </Link>
                    </Button>
                  </MyTooltip>

                  {item.githubURL && (
                    <MyTooltip text="View source code on github">
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        asChild={true}
                        className="mt-5"
                      >
                        <a href={item.githubURL || ""} target="_blank">
                          <FaGithub className="size-6" />
                        </a>
                      </Button>
                    </MyTooltip>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default Main;
