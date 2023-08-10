import React from "react";
import { UseLearnContext } from "../../context/LearnContext";
import CodeBlock from "./CodeBlock";

function LearnUseContext() {
  const { sampleProp, setSampleProp } = UseLearnContext();

  return (
    <CodeBlock heading={"Learn UseContext 💙"} explanation={``}>
      <h1 className="text-2xl mb-3"></h1>
      <div className="flex flex-row gap-5 items-center">
        <p> {sampleProp} </p>
        <button
          onClick={() =>
            setSampleProp(
              sampleProp === "Awesome you changed it 😉"
                ? "Nothing! here 🐤"
                : "Awesome you changed it 😉"
            )
          }
          className="bg-purple-600 border text-white font-semibold border-black p-3"
        >
          Click me to change the state
        </button>
      </div>
    </CodeBlock>
  );
}

export default LearnUseContext;
