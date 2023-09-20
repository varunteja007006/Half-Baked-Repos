import React, { useState } from "react";
import CodeBlock from "../CodeBlock";

function LearnDaisyUI() {
  const [itemStatus, setItemStatus] = useState(false);
  const handleItemStatus = () => {
    setItemStatus(!itemStatus);
  };
  return (
    <CodeBlock
      heading={"Learn Daisy UI 🧡"}
      explanation={`Component library for Tailwind CSS`}
    >
      <details className="dropdown mb-32">
        <summary
          onClick={handleItemStatus}
          className="m-1 mb-0 btn  bg-cyan-400 hover:bg-cyan-300 rounded-full"
        >
          Dropdown - Click to open or close {itemStatus ? "🔺" : "🔻"}
        </summary>
        <ul className="p-2 menu dropdown-content z-[1] bg-transparent rounded-box w-52">
          <li className="bg-cyan-200 border border-black rounded-full mb-1">
            <a>Dropdown item 1</a>
          </li>
          <li className="bg-cyan-200 border border-black rounded-full">
            <a>Dropdown item 2</a>
          </li>
        </ul>
      </details>
    </CodeBlock>
  );
}

export default LearnDaisyUI;
