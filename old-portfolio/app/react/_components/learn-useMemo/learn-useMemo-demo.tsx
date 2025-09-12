"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function slowFunction() {
  return (
    (Math.random() * Math.random()) ^
    Math.random() ^
    (Math.random() * 9999999999)
  );
}

export default function LearnUseMemoDemo() {
  const [count, setCount] = React.useState(0);

  // This value will change on every render
  const valueSlow = slowFunction();

  // This value will not change on every render
  const valueFast = React.useMemo(() => slowFunction(), []);

  return (
    <div className="space-y-4">
      <div>Count: {count}</div>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <div></div>
      <div>
        Value not wrapped in useMemo: {valueSlow} (This value will change on
        every button click)
      </div>
      <div>Value wrapped in useMemo: {valueFast}</div>
    </div>
  );
}
