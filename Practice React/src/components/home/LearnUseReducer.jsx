import React, { useReducer } from "react";
import CodeBlock from "../CodeBlock";

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
    <CodeBlock
      heading={`Learn UseReducer ❤ ${counter.emoji}`}
      explanation={`Below is the small functionality you can build to learn useReducer.`}
    >
      <div className="flex flex-row gap-4 justify-start">
        <button
          className="btn font-semibold border-2 border-black text-xl bg-green-500 hover:bg-green-600 hover:border-black"
          onClick={handleIncrement}
        >
          +
        </button>
        <div className="btn font-semibold border-2 border-black bg-white hover:bg-white hover:border-black">
          {counter.count}
        </div>
        <button
          className="btn font-semibold border-2 border-black text-xl bg-red-500 hover:bg-red-600 hover:border-black"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
    </CodeBlock>
  );
}

export default LearnUseReducer;
