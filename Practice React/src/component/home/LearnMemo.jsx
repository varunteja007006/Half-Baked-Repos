import CodeBlock from "../CodeBlock";
import ChildOne from "../subcomponents/ChildOne";
import { useState } from "react";
import { sampleData as data } from "../../../data/sampleData";
import YellowBtn from "../subcomponents/YellowBtn";

function LearnMemo() {
  const [value, setValue] = useState(0);
  // const [data, setData] = useState(sampleData);

  const handleClick = () => {
    setValue(value + 1);
  };

  return (
    <CodeBlock heading={"Learn Memo 💙"} explanation={``}>
      <h1 className="text-2xl mb-3"></h1>
      {/* Solution 1 - Separate the useState logic into different component 
        as shown below */}

      {/* <ClickMe></ClickMe> */}

      {/* Solution 2 - Add lower state */}

      {/* Solution 3 - Use Memo */}
      <div className="flex flex-row gap-3 w-fit items-center">
        <YellowBtn type={"button"} handleButton={handleClick}></YellowBtn>
        <p className="btn bg-white hover:bg-white border-2 border-black hover:border-black cursor-default">
          {value}
        </p>
      </div>
      <ChildOne data={data}></ChildOne>
    </CodeBlock>
  );
}

export default LearnMemo;
