import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import ToggleComponent from "../subcomponents/ToggleComponent";

function LearnUseEffectCleanup() {
  const [toggle, setToggle] = useState(false);
  const togglebtn = () => {
    setToggle(!toggle);
  };
  return (
    <CodeBlock>
      <div className="flex flex-row gap-4 align-middle items-center">
        <h1 className="text-2xl">Learn UseEffect Cleanup 💚</h1>
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
