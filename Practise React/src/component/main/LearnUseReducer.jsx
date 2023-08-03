import React, { useReducer } from "react";
import CodeBlock from "./CodeBlock";

function LearnUseReducer() {
  function handleClick(counter, action) {
    switch (action.type) {
      case "increment":
        return { count: counter.count + 1, emoji: "🤣" };
      case "decrement":
        return { count: counter.count - 1, emoji: "😭" };
      default:
        return counter;
    }
  }

  const [counter, dispatch] = useReducer(handleClick, {
    count: 0,
    emoji: "🤣",
  });

  const handleIncrement = () => {
    dispatch({ type: "increment" });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  // console.log(counter);
  return (
    <CodeBlock>
      <>
        <h1 className="text-2xl">Learn UseReducer ❤</h1>
        <p>
          Below is the small funcitonality you can build to learn useReducer....
          {counter.emoji}.
        </p>
        <div className="w-1/2 p-2 m-2 rounded-full text-center items-center align-baseline border-2 border-black font-semibold">
          {counter.count}
        </div>
        <div className="p-2 m-2 w-1/2 flex flex-row gap-4 justify-center">
          <button
            className=" font-semibold border-2 border-black rounded-full p-2 items-center align-baseline text-xl w-10 bg-green-500"
            onClick={handleIncrement}
          >
            +
          </button>
          <button
            className=" font-semibold border-2 border-black rounded-full p-2 items-center align-baseline text-xl w-10 bg-red-500"
            onClick={handleDecrement}
          >
            -
          </button>
        </div>
      </>
    </CodeBlock>
  );
}

export default LearnUseReducer;
