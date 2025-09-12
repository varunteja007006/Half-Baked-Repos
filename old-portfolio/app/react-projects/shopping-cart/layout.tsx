"use client";

import React from "react";
import { CartContextProvider } from "./context/cartContext";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CartContextProvider>{children}</CartContextProvider>
    </div>
  );
}
