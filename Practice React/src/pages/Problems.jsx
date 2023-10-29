import React from "react";
import TimerProblem from "../component/problems/problemStatements/TimerProblem";

function Problems() {
  return (
    <>
      <details className="collapse bg-base-200">
        <summary className="collapse-title text-xl font-medium">
          Timer Problem
        </summary>
        <div className="collapse-content">
          <TimerProblem></TimerProblem>
        </div>
      </details>
      <details className="collapse bg-base-200">
        <summary className="collapse-title text-xl font-medium">
          Click to open/close
        </summary>
        <div className="collapse-content">
          <p>content</p>
        </div>
      </details>
    </>
  );
}

export default Problems;
