import CodeBlock from "./CodeBlock";
import ChildOne from "../subcomponents/ChildOne";
// import ClickMe from "../subcomponents/ClickMe";
import { useState } from "react";
import { sampleData as data } from "../../data/sampleData";

function LearnMemo() {
  const [value, setValue] = useState(0);
  // const [data, setData] = useState(sampleData);
  const handleClick = () => {
    setValue(value + 1);
  };
  return (
    <CodeBlock heading={'Learn Memo 💙'} explanation={``}>
      <h1 className="text-2xl mb-3"></h1>
      <div className="flex flex-col gap-3 w-fit items-center">
        {/* Solution 1 - Seperate the useState logic into different component 
        as shown below */}
        {/* <ClickMe></ClickMe> */}

        {/* Solution 2 - Add lowerstate */}

        {/* Solution 3 - Use Memo */}
        <p> {value} </p>
        <button className="text-black bg-blue-300 p-2" onClick={handleClick}>
          Click me
        </button>
        <ChildOne data={data}></ChildOne>
      </div>
    </CodeBlock>
  );
}

export default LearnMemo;
