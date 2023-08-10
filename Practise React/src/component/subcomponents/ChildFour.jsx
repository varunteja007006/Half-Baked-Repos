import React from "react";

function ChildFour({ item }) {
  console.log("render");
  return (
    <>
      <p className="p-1 border-2 border-black border-r-0 bg-white text-black font-semibold">
        {item.toUpperCase()}
      </p>
    </>
  );
}

export default ChildFour;
