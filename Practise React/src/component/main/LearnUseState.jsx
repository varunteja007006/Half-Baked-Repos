import React, { useState } from "react";
import CodeBlock from "./CodeBlock";

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
    <CodeBlock>
      <div className="flex flex-col">
        <h1>
          This should change on button click {"->"} {value}
        </h1>
        <button
          className=" w-fit border-2 border-pink-500 p-2 hover:bg-pink-300 rounded-md"
          // onClick={handleClick}
          onClick={handleNewClick}
        >
          Click me 😇{" "}
        </button>
      </div>
    </CodeBlock>
  );
}

export default LearnUseState;
