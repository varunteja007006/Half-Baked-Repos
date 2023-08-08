import React from "react";
import { CodeBlock } from "../main";
import { UseLearnContext } from "../../context/LearnContext";

function SampleComponent() {
  const { sampleProp, setSampleProp } = UseLearnContext();
  return (
    <CodeBlock>
      <h1 className="text-2xl mb-3">Learn UseContext 💙</h1>
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

export default SampleComponent;
