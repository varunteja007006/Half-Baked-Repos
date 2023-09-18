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
    <CodeBlock heading={"Learn UseState 🧡"} explanation={``}>
      <div className="flex flex-col gap-4">
        <p>
          This should change on button click {"->"}{" "}
          <span className="w-fit p-2 m-2 bg-white rounded-full text-center items-center align-baseline border-2 border-black font-semibold">
            {value}
          </span>
        </p>

        <button
          className=" w-fit border-2 bg-black text-white p-2 hover:bg-gray-900 rounded-md"
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
