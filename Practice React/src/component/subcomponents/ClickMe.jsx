import React, { useState } from "react";

function ClickMe() {
  const [value, setValue] = useState(0);
  const handleClick = () => {
    setValue(value + 1);
  };
  return (
    <>
      <p> {value} </p>
      <button className="text-black bg-blue-300 p-2" onClick={handleClick}>
        Click me
      </button>
    </>
  );
}

export default ClickMe;
