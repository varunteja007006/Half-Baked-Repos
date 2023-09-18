import React from "react";

function ChildTwo({ index, item }) {
  console.log("render");
  return (
    <>
      <p className="p-1 border-2 border-black bg-white text-black font-semibold">
        {item}
      </p>
    </>
  );
}

export default ChildTwo;
