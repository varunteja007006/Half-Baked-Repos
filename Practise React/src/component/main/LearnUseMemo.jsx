import React, { useMemo, useState } from "react";
import CodeBlock from "./CodeBlock";
import SlowFunction from "../subcomponents/SlowFunction";

function LearnUseMemo() {
  const [count, setcount] = useState(0);

  const handleClick = () => {
    setcount(count + 1);
  };

  //   // The below line will run everytime the state changes since the react re-renders the functions
  //   const value = SlowFunction();
  //   console.log(value);

  //   Solution is to wrap the SlowFunction in a useMemo
  //   Note the function that is getting wrapped in UseMemo should return something
  const value = useMemo(() => SlowFunction(), []);
  console.log(value);

  return (
    <CodeBlock>
      <h1 className="text-2xl mb-3">Learn UseMemo 💜 </h1>
      <p> {count} </p>
      <button className="text-black bg-blue-300 p-2 mt-3" onClick={handleClick}>
        Click me
      </button>
    </CodeBlock>
  );
}

export default LearnUseMemo;
