"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function LearnUseCallbackHook() {
  const [count, setCount] = React.useState(0);

  const optimizedFunc = React.useCallback((value?: number) => {
    if (!value) {
      return 0;
    }
    return value * 100;
  }, []);

  return (
    <div className="flex gap-5 items-center">
      <div>Count: {count}</div>
      <Button onClick={() => setCount(count + 1)}>Click Me</Button>
      <div className="p-3 rounded border">
        Optimized Function:
        <div>{optimizedFunc(count)}</div>
      </div>
    </div>
  );
}
