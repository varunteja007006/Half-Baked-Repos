import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../features/counterSlice';

function LearnUseRedux() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Learn Redux</h1>
      <p>
        Below is the small funcitonality you can build to learn Redux....{" "}
        {counter.emoji}
      </p>
      <div className="result"> {counter.count} </div>
      <div className="clickbtns">
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default LearnUseRedux
