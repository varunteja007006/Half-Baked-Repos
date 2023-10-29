import React from "react";
import ChildrenProp from "../subcomponents/ChildrenProp";
import CodeBlock from "../CodeBlock";
import CustomBadge from "../subcomponents/CustomBadge";

function LearnChildrenProp() {
  return (
    <>
      {/* I don't want to render the below paragraph for this component LearnChildrenProp */}
      {/* <p>Hi there, How are you? 😃</p> */}
      <CodeBlock
        heading={"Learn Children Props 🖤"}
        explanation={`props.children is used to display
          whatever you include between the opening and closing tags when
          invoking a component.`}
      >
        <ChildrenProp
          title={"No Children Props"}
          subtitle={
            "We did not pass any children prop between the opening and closing tags of this component <ChildrenProp>"
          }
        ></ChildrenProp>
        <ChildrenProp
          title={"There is a Children Props"}
          subtitle={
            "We passed a children prop between the opening and closing tags of the component"
          }
        >
          <span className="text-center items-center flex flex-col gap-4 mb-4">
            <p className="bg-green-600 text-white font-semibold p-3">
              Hi there, How are you? 😃. I am passed as a child prop.
            </p>
            <CustomBadge customClass={'bg-pink-200'} label={"Hi this is child Component 😉"}></CustomBadge>
          </span>
        </ChildrenProp>
      </CodeBlock>
    </>
  );
}

export default LearnChildrenProp;
