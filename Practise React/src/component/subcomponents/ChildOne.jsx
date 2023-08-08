import React from "react";
import ChildTwo from "./ChildTwo";

function ChildOne({ sampleData }) {
  return (
    <>
      {sampleData.map((data, index) => (
        <div key={index}>
          <ChildTwo index={index} data={data}></ChildTwo>
        </div>
      ))}
    </>
  );
}

export default ChildOne;
