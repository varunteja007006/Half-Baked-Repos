import React from "react";

function ChildTwo({ index, data }) {
  console.log("render");
  return (
    <>
      <p>{data}</p>
    </>
  );
}

export default ChildTwo;
