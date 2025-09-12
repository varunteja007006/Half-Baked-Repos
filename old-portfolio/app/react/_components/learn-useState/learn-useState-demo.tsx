"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const LearnUseStateDemo = () => {
  const [value, setValue] = React.useState(0);
  return (
    <div className="flex flex-row gap-4 items-center">
      <Button onClick={() => setValue(value + 1)} className="w-40">
        Click me
      </Button>
      <p className="p-2 w-40 text-center border-b-2 border-blue-800">{value}</p>
    </div>
  );
};

export default LearnUseStateDemo;
