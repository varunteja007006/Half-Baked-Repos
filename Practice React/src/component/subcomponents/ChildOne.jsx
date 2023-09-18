import React, { memo } from "react";
import ChildTwo from "./ChildTwo";

function ChildOne({ data }) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <ChildTwo index={index} item={item}></ChildTwo>
        </div>
      ))}
    </>
  );
}

export default memo(ChildOne);
