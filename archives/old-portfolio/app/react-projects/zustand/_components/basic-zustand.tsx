"use client";
import React, { useState } from "react";
import { TBearStore, useBearStore } from "../store/bearStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BasicZustand() {
  const { bears, increasePopulation, removeAllBears, updateBears }: TBearStore =
    useBearStore();

  const [updateByVal, setUpdateByVal] = useState<string>("");
  const handleUpdateBears = () => {
    const updateByVal_int = Number(updateByVal);
    if (updateByVal_int >= 0) {
      updateBears(updateByVal_int);
    } else {
      updateBears(0);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Basic Implementation </CardTitle>
        <CardDescription>
          This is a zustand example. This includes just simple creation of
          zustand store and use that store
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p>Bears count: {bears}</p>
        <Button
          className="bg-purple-300 dark:bg-purple-700 hover:bg-purple-400/[0.8]"
          onClick={increasePopulation}
        >
          Increase Population by 1 😁
        </Button>
        <div>
          <Label htmlFor="updateByVal">Enter a random number</Label>
          <div className="flex flex-row gap-3 justify-start items-center">
            <Input
              type="text"
              id="updateByVal"
              placeholder="Enter a number to update the bears population"
              onChange={(e) => setUpdateByVal(e.target.value)}
            />
            <Button
              className="bg-purple-300 dark:bg-purple-700 hover:bg-purple-400/[0.8] w-fit"
              onClick={handleUpdateBears}
            >
              Update 😉
            </Button>
          </div>
        </div>
        <Button variant={"destructive"} onClick={removeAllBears}>
          Remove all bears 😢
        </Button>
      </CardContent>
      <CardFooter>
        Checkout the documentation for zustand here: {/* */}
        <a
          href="https://docs.pmnd.rs/zustand/getting-started/introduction"
          className="text-blue-800 underline ms-2"
        >
          Link
        </a>
      </CardFooter>
    </Card>
  );
}
