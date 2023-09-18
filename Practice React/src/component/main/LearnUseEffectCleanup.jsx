import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import ToggleComponent from "../subcomponents/ToggleComponent";

function LearnUseEffectCleanup() {
  const [toggle, setToggle] = useState(false);
  const togglebtn = () => {
    setToggle(!toggle);
  };
  return (
    <CodeBlock heading={"Learn UseEffect Cleanup 💚"} explanation={``}>
      <div className="flex flex-row gap-4 align-middle items-center">
        <button
          className="bg-yellow-500 text-black p-2 hover:bg-yellow-400"
          onClick={togglebtn}
        >
          Toggle Button
        </button>
        {/* The re-render is going to run the UseEffect everytime the component (ToggleComponent) is shown.  */}
        {toggle && <ToggleComponent></ToggleComponent>}
      </div>
    </CodeBlock>
  );
}

export default LearnUseEffectCleanup;
