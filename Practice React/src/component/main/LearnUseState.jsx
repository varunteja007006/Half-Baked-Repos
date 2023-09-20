import React, { useState } from "react";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";

function LearnUseState() {
  const [value, setValue] = useState(0);
  // This updates the old value not the current value
  const handleClick = () => {
    setValue(value + 1);
    console.log("Old Value:", value);
  };

  // To update the current value
  const handleNewClick = () => {
    setValue((currentState) => {
      const newValue = currentState + 1;
      console.log(newValue);
      return newValue;
    });
  };
  return (
    <CodeBlock
      heading={"Learn UseState 🧡"}
      explanation={`useState react hook is used to update the state of the page. Click the button to update the state of the value.`}
    >
      <div className="flex flex-row gap-4 mt-5 items-center">
        <YellowBtn handleButton={handleNewClick} type={"button"}></YellowBtn>
        <p className="btn bg-white hover:bg-white border-2 border-black hover:border-black cursor-default">
          {value}
        </p>
      </div>
    </CodeBlock>
  );
}

export default LearnUseState;
