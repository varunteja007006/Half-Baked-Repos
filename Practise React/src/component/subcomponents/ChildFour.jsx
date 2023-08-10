import React from "react";

function ChildFour({ item }) {
  console.log("render");
  return (
    <>
      <p className="border p-1 border-2 border-black border-r-0">
        {item.toUpperCase()}
      </p>
    </>
  );
}

export default ChildFour;
