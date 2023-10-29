import React from "react";
import { TimerProblem, SampleProblem } from "../components";

function Problems() {
  return (
    <>
    <p className="mb-3">Click to Open the problem statements</p>
      <details className="collapse bg-base-200">
        <summary className="collapse-title text-xl font-medium">
          Timer Problem
        </summary>
        <div className="collapse-content">
          <TimerProblem></TimerProblem>
        </div>
      </details>
      <details className="collapse bg-base-200 mt-3">
        <summary className="collapse-title text-xl font-medium">
          Click to open/close
        </summary>
        <div className="collapse-content">
          <SampleProblem />
        </div>
      </details>
    </>
  );
}

export default Problems;
