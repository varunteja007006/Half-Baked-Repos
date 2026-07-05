import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(() => import("./Editor"));

export default function Main() {
  return <Editor />;
}
