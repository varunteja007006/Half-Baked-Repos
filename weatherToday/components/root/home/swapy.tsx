"use client";
import { useEffect } from "react";
import { createSwapy } from "@/lib/swapy";
import WeatherComp from "./weather";
import SearchBox from "./search-box";
import TempGraph from "../graphs/temp-graph";

const DEFAULT = {
  "1": "a",
  "3": "c",
  "4": "d",
  "2": "b",
} as const;

function A() {
  return (
    <div data-swapy-item="a">
      <WeatherComp />
    </div>
  );
}

function B() {
  return <div className="w-full  h-[20rem]" data-swapy-item="b"></div>;
}

function C() {
  return (
    <div data-swapy-item="c">
      <SearchBox />
    </div>
  );
}

function D() {
  return (
    <div data-swapy-item="d">
      <TempGraph />
    </div>
  );
}

function getItemById(itemId: "a" | "c" | "d" | "b" | null) {
  switch (itemId) {
    case "a":
      return <A />;
    case "c":
      return <C />;
    case "d":
      return <D />;
    case "b":
      return <B />;
  }
}

export default function Swapy() {
  useEffect(() => {
    const container = document.querySelector(".container")!;

    const swapy = createSwapy(container, {
      swapMode: "hover",
      continuousMode: false,
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div className="container grid grid-cols-1 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">
        <div className="space-y-2">
          <div data-swapy-slot="1">{getItemById(DEFAULT["1"])}</div>
          <div data-swapy-slot="2">{getItemById(DEFAULT["2"])}</div>
        </div>
        <div className="space-y-2">
          <div data-swapy-slot="3">{getItemById(DEFAULT["3"])}</div>
          <div data-swapy-slot="4">{getItemById(DEFAULT["4"])}</div>
        </div>
      </div>
    </div>
  );
}
