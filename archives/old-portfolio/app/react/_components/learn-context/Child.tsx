"use client";

import React from "react";
import { LearnContextProvider } from "./learn-context-api";
import InnerChild from "./InnerChild";

const Child = () => {
  return (
    <LearnContextProvider>
      <InnerChild />
    </LearnContextProvider>
  );
};

export default Child;
