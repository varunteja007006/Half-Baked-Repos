import React from "react";
import { UseLearnContext } from "../../context/LearnContext";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";

function LearnUseContext() {
  const { sampleProp, setSampleProp } = UseLearnContext();

  const handleClick = () =>
    setSampleProp(
      sampleProp === "Awesome you changed it 😉"
        ? "Nothing! here 🐤"
        : "Awesome you changed it 😉"
    );

  return (
    <CodeBlock heading={"Learn UseContext 💙"} explanation={``}>
      <div className="flex flex-row gap-5 items-center mt-3">
        <YellowBtn
          type={"button"}
          handleButton={handleClick}
          label={"Click me to change the state"}
        ></YellowBtn>
        <p className="badge p-5 text-xl border-2 border-black">{sampleProp}</p>
      </div>
    </CodeBlock>
  );
}

export default LearnUseContext;
