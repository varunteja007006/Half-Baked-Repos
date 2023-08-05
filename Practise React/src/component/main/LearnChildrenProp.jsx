import React from "react";
import ChildrenProp from "../subcomponents/ChildrenProp";
import DivisionLine from "../subcomponents/DivisionLine";
import CodeBlock from "./CodeBlock";

function LearnChildrenProp() {
  return (
    <>
      {/* I dont want to render the below paragraph for this component LearnChildrenProp */}
      {/* <p>Hi there, How are you? 😃</p> */}
      <CodeBlock>
        <h1 className="text-2xl">Learn Children Props 🖤</h1>
        <ChildrenProp
          title={"No Children Props"}
          subtitle={
            "We did not pass any children prop between the opening and closing tags of the component"
          }
        ></ChildrenProp>
        <DivisionLine></DivisionLine>
        <ChildrenProp
          title={"There is a Children Props"}
          subtitle={
            "We passed a children prop between the opening and closing tags of the component"
          }
        >
          <p className="p-2 bg-green-300 w-fit my-5">
            Hi there, How are you? 😃. This line is child prop
          </p>
        </ChildrenProp>
      </CodeBlock>
    </>
  );
}

export default LearnChildrenProp;
