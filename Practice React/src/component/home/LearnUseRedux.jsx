import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../features/counterSlice";
import CodeBlock from "../CodeBlock";

function LearnUseRedux() {
  const counter = useSelector((store) => store.counter);
  const dispatch = useDispatch();
  return (
    <CodeBlock
      heading={`Learn Redux 💜 ${counter.emoji}`}
      explanation={`Redux is a state management library or tool for react. We can create a global state management for the app.Below is the small functionality you can build to learn Redux.`}
    >
      <>
        <div className="w-1/2 flex flex-row gap-4 justify-start items-center">
          <button
            className="btn font-semibold border-2 border-black items-center text-xl bg-green-500 hover:bg-green-600 hover:border-black"
            onClick={() => {
              dispatch(increment());
            }}
          >
            +
          </button>
          <div className="btn border-2 border-black bg-white hover:bg-white hover:border-black">
            {counter.count}
          </div>
          <button
            className="btn font-semibold border-2 border-black items-center text-xl bg-red-500 hover:bg-red-600 hover:border-black"
            onClick={() => {
              dispatch(decrement());
            }}
          >
            -
          </button>
        </div>
      </>
    </CodeBlock>
  );
}

export default LearnUseRedux;
