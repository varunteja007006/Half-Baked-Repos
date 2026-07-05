"use client";

import React from "react";
import contactData from "@/app/_components/home/data/contactData";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "usehooks-ts";
import MyTooltip from "@/components/custom/MyTooltip";
import { useToast } from "@/hooks/use-toast";

export default function ContactIcons({
  className,
}: Readonly<{ className?: string }>) {
  const [copiedText, copy] = useCopyToClipboard();

  const { toast } = useToast();

  function handleCopy(text: string) {
    copy(text);
    toast({
      variant: "success",
      description: `Copied to your clipboard: ${text}`,
    });
  }

  return (
    <div className="flex gap-4 justify-center items-center">
      {contactData.map((item) => {
        return (
          <MyTooltip key={item.id} text={item.contact_value}>
            <Button
              size={"icon"}
              variant={"outline"}
              className={cn(
                "rounded-full ring-1 dark:ring-purple-300 shadow",
                className
              )}
              onClick={() => handleCopy(item.contact_value)}
              aria-label={item.contact_value}
            >
              <item.contact_icon className="size-5" />
            </Button>
          </MyTooltip>
        );
      })}
    </div>
  );
}
