import React, { useReducer } from "react";

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

  console.log(counter);
  return (
    <>
      <h1>Learn UseReducer</h1>
      <p>
        Below is the small funcitonality you can build to learn useReducer....
        {counter.emoji}.
      </p>
      <div className="result">{counter.count}</div>
      <div className="clickbtns">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>
    </>
  );
}

export default LearnUseReducer;
