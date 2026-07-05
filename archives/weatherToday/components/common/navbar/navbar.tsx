"use client";

import React from "react";
import { ThemeToggle } from "../theme-toogle";
import { Toggle } from "@/components/ui/toggle";
import { useLocationStore } from "@/store/weather/base_store";
import {
  TbTemperatureFahrenheit,
  TbTemperatureCelsius,
  TbTemperatureOff,
} from "react-icons/tb";

import { cn } from "@/lib/utils";
import ToolTip from "../tooltip";
import { motion } from "framer-motion";
import Icon from "../icon/Icon";

export default function Navbar() {
  const store = useLocationStore((state) => state);
  return (
    <header className="px-6 mx-auto max-w-[1400px] flex-col gap-5 lg:flex-row py-4 flex items-center justify-between bg-orange-500 font-semibold dark:bg-blue-950">
      <Icon />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-wrap items-center gap-2"
      >
        <ToolTip content="Kelvin">
          <Toggle
            pressed={store.tempUnit === "kelvin"}
            onPressedChange={() => store.updateTempUnit("kelvin")}
            className={cn(
              "",
              store.tempUnit === "kelvin" && "bg-white text-black"
            )}
          >
            <TbTemperatureOff className="w-4 h-4" />
          </Toggle>
        </ToolTip>
        <ToolTip content="Celsius">
          <Toggle
            pressed={store.tempUnit === "celsius"}
            onPressedChange={() => store.updateTempUnit("celsius")}
            className={cn(
              "",
              store.tempUnit === "celsius" && "bg-white text-black"
            )}
          >
            <TbTemperatureCelsius className="w-4 h-4" />
          </Toggle>
        </ToolTip>
        <ToolTip content="Fahrenheit">
          <Toggle
            pressed={store.tempUnit === "fahrenheit"}
            onPressedChange={() => store.updateTempUnit("fahrenheit")}
            className={cn(
              "",
              store.tempUnit === "fahrenheit" && "bg-white text-black"
            )}
          >
            <TbTemperatureFahrenheit className="w-4 h-4" />
          </Toggle>
        </ToolTip>
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
