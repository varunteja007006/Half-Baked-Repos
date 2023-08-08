import React from "react";
import CodeBlock from "./CodeBlock";
import ChildOne from "../subcomponents/ChildOne";

function LearnMemo() {
  const sampleData = [
    "person 1",
    "person 2",
    "person 3",
    "person 4",
    "person 5",
  ];

  return (
    <CodeBlock>
      <h1 className="text-2xl mb-3">Learn Memo 💙</h1>
      <div className="flex flex-col gap-3">
        <ChildOne sampleData={sampleData}></ChildOne>
      </div>
    </CodeBlock>
  );
}

export default LearnMemo;
