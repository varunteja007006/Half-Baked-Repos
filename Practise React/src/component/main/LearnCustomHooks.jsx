import React from "react";
import CodeBlock from "./CodeBlock";
import UseToggle from "../../custom_hooks/UseToggle";

function LearnCustomHooks() {
  const { show, toggle } = UseToggle(false);
  return (
    <CodeBlock>
      <h1 className="text-2xl mb-4">Learn Custom Hooks 🤎</h1>
      <div className="flex flex-row gap-4 items-center">
        <button onClick={toggle} className="bg-purple-400 text-black p-2">
          Toggle
        </button>
        {show && <p className="bg-black text-white p-2">🎇 Surprise 🎁</p>}
      </div>
    </CodeBlock>
  );
}

export default LearnCustomHooks;
