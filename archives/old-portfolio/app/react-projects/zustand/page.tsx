/*
 * This code is for understanding the zustand state management library
 */

import React from "react";
import BasicZustand from "./_components/basic-zustand";
import AdvancedZustand from "./_components/advanced-zustand";

export default function Page() {
  return (
    <div>
      <h1 className="mb-3 text-2xl">Zustand Demo</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <BasicZustand />
        <AdvancedZustand />
      </div>
    </div>
  );
}
