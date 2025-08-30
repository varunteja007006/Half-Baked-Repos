"use client";
import React from "react";

import { motion } from "framer-motion";

import { CloudMoonRain } from "lucide-react";

export default function Icon() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-wrap items-center gap-2 text-lg border border-white dark:border-gray-900 p-1.5 pr-2.5 rounded-full bg-white text-black dark:bg-gray-900 dark:text-white"
    >
      <CloudMoonRain className="size-7 rounded-full border-orange-600 border-2 dark:border-white" />
      <span className="text-base">Weather-Today</span>
    </motion.div>
  );
}
