"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function LearnUseRefDemo() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  function submit() {
    toast({
      title: "InputRef",
      description: `The message has been updated by InputRef! ${inputRef.current?.value}`,
      duration: 3000,
    });
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <p>Enter text below and click submit.</p>
      <Input
        ref={inputRef}
        name="IamAInputRef"
        placeholder="I am a InputRef and uncontrolled but being tracked by react ref hook"
        className="w-2/3"
      />
      <Button variant={"secondary"} onClick={submit}>
        Submit
      </Button>
    </div>
  );
}
