import React from "react";
import CodeBlock from "./CodeBlock";
import UseToggle from "../../custom_hooks/UseToggle";

function LearnCustomHooks() {
  const { show, toggle } = UseToggle(false);
  return (
    <CodeBlock heading={'Learn Custom Hooks 🤎'} explanation={`Creating and using of custom hooks`}>
      <h1 className="text-2xl mb-4"></h1>
      <div className="flex flex-row gap-4 items-center">
        <button onClick={toggle} className="bg-purple-600 font-semibold text-white p-2">
          Toggle
        </button>
        {show && <p className="bg-black font-semibold text-white p-2">🎇 Surprise 🎁</p>}
      </div>
    </CodeBlock>
  );
}

export default LearnCustomHooks;
