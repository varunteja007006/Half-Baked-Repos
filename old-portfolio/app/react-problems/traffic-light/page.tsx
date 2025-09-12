"use client";
import { cn } from "@/lib/utils";
import React from "react";

const colors = ["bg-red-400", "bg-yellow-400", "bg-green-400"];

export default function TrafficLightPage() {
  const [active, setActive] = React.useState(0);
  const maxLen = colors.length - 1;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === maxLen ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full flex flex-col items-center">
      <div className="h-[330px] w-[120px] bg-black flex flex-col gap-2 items-center justify-between py-5 rounded">
        {colors.map((_, index) => {
          return (
            <div
              key={index}
              className={cn(
                `size-20 rounded-full bg-gray-500`,
                index === active && colors[index]
              )}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
