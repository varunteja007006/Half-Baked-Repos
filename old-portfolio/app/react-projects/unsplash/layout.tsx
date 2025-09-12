"use client";

import React from "react";
import { UnsplashGlobalContextProvider } from "./context/unsplash-context";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UnsplashGlobalContextProvider>{children}</UnsplashGlobalContextProvider>
    </div>
  );
}
