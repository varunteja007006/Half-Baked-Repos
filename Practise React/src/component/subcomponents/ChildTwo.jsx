import React from "react";

function ChildTwo({ index, item }) {
  console.log("render");
  return (
    <>
      <p>{item}</p>
    </>
  );
}

export default ChildTwo;
