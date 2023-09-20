import React, { useMemo, useState } from "react";
import CodeBlock from "../CodeBlock";
import SlowFunction from "../subcomponents/SlowFunction";
import YellowBtn from "../subcomponents/YellowBtn";

function LearnUseMemo() {
  const [count, setcount] = useState(0);

  const handleClick = () => {
    setcount(count + 1);
  };

  //   // The below line will run every time the state changes since the react re-renders the functions
  //   const value = SlowFunction();
  //   console.log(value);

  //   Solution is to wrap the SlowFunction in a useMemo
  //   Note the function that is getting wrapped in UseMemo should return something
  const value = useMemo(() => SlowFunction(), []);
  // console.log(value);

  return (
    <CodeBlock heading={"Learn UseMemo 💜 "} explanation={``}>
      <div className="flex flex-row gap-4 mt-3">
        <YellowBtn handleButton={handleClick} type={"button"}></YellowBtn>
        <div className="btn font-semibold border-2 border-black bg-white hover:bg-white hover:border-black">
          {count}
        </div>
      </div>
    </CodeBlock>
  );
}

export default LearnUseMemo;
