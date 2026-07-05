"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/features/counterSlice";
import { Button } from "@/components/ui/button";
import Instructions from "./Instructions";

export default function Page() {
  const { count, emoji } = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <p>Count: {count}</p>
        <p>Emoji: {emoji}</p>
      </div>
      <div className="flex gap-5">
        <Button variant={"warning"} onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button variant={"warning"} onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </div>
      <div>
        <Instructions />
      </div>
    </div>
  );
}
