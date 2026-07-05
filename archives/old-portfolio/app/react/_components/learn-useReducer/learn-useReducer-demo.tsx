"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function LearnUseReducerDemo() {
  function handleClick(count: number, action: { type: string }) {
    switch (action.type) {
      case "increment":
        return count + 1;
      case "decrement":
        return count - 1;
      default:
        return count;
    }
  }

  function handleIncrement() {
    dispatch({ type: "increment" });
  }

  function handleDecrement() {
    dispatch({ type: "decrement" });
  }

  const [count, dispatch] = React.useReducer(handleClick, 0);

  return (
    <div className="flex flex-col gap-5 items-center md:flex-row">
      <Button variant={"outline"} onClick={handleIncrement}>
        Increment
      </Button>
      <div> Count - {count} </div>
      <Button variant={"outline"} onClick={handleDecrement}>
        Decrement
      </Button>
    </div>
  );
}
