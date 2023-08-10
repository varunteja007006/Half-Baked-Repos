import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../features/counterSlice";
import CodeBlock from "./CodeBlock";

function LearnUseRedux() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <CodeBlock heading={"Learn Redux 💜"} explanation={``}>
      <>
        <p>
          Below is the small funcitonality you can build to learn Redux....{" "}
          {counter.emoji}
        </p>
        <div className="w-1/2 p-2 m-2 bg-zinc-300 rounded-full text-center items-center align-baseline border-2 border-black font-semibold">
          {" "}
          {counter.count}{" "}
        </div>
        <div className=" p-2 m-2 w-1/2 flex flex-row gap-4 justify-center">
          <button
            className=" font-semibold border-2 border-black rounded-full p-2 items-center align-baseline text-xl w-10 bg-green-500"
            onClick={() => {
              dispatch(increment());
            }}
          >
            +
          </button>
          <button
            className=" font-semibold border-2 border-black rounded-full p-2 items-center align-baseline text-xl w-10 bg-red-500"
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
