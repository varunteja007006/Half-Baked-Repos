"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import useToggleShow from "./useToggleShow";
import { Separator } from "@/components/ui/separator";

export default function LearnCustomHookDemo() {
  const { show, toggle } = useToggleShow();
  const { show: showTwo, toggle: toggleTwo } = useToggleShow(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <p>This is a custom hook (no default value)</p>
        <Button onClick={toggle} className="w-fit">
          Click me
        </Button>
        {show && <div> You clicked the button to see me!!!!!!</div>}
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <p>This is a custom hook (with default value as true)</p>
        <Button onClick={toggleTwo} className="w-fit">
          Click me
        </Button>
        {showTwo && <div> You can see me already !!!!</div>}
      </div>
    </div>
  );
}
