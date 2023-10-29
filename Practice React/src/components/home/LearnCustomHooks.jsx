import React from "react";
import CodeBlock from "../CodeBlock";
import UseToggle from "../../custom_hooks/UseToggle";
import YellowBtn from "../subcomponents/YellowBtn";
import CustomBadge from "../subcomponents/CustomBadge";

function LearnCustomHooks() {
  const { show, toggle } = UseToggle(false);

  return (
    <CodeBlock
      heading={"Learn Custom Hooks 🤎"}
      explanation={`Creating and using of custom hooks`}
    >
      <div className="flex flex-row gap-4 items-center">
        <YellowBtn handleButton={toggle} label={"Toggle"}></YellowBtn>

        {show && <CustomBadge label={"🎇 Surprise 🎁"}></CustomBadge>}
      </div>
    </CodeBlock>
  );
}

export default LearnCustomHooks;
