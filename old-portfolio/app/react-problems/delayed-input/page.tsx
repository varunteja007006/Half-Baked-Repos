"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

export default function DelayedChild() {
  const [value, setValue] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");

  React.useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedValue(value);
    }, 3000);

    return () => clearTimeout(timerID);
  }, [value]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh]">
      <Card className="space-y-3 min-w-[300px] border-purple-900 text-lg">
        <CardHeader className="pb-2">
          <CardTitle>Delayed Input</CardTitle>
          <CardDescription>A basic debounced input field.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>Actual value:</p>
            <p className="text-sm font-semibold">{value}</p>
          </div>
          <div>
            <p>Debounced value: </p>
            <p className="text-sm font-semibold">{debouncedValue}</p>
          </div>
          <Input
            placeholder="Enter something here..."
            value={value}
            onChange={(e) => setValue(e.target.value || "")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
