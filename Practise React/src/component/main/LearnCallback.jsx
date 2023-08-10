import CodeBlock from "./CodeBlock";
import ChildThree from "../subcomponents/ChildThree";
// import ClickMe from "../subcomponents/ClickMe";
import { useCallback, useState } from "react";
import { sampleData } from "../../data/sampleData";

function LearnCallback() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState(sampleData);

  const handleClick = () => {
    setValue(value + 1);
  };

  // // The below code will cause re-render because react
  // // re-renders function and also it is passed as prop to a Component.
  // const removeItem = (id) => {
  //   console.log(id);
  //   const newData = data.filter((item, index) => index !== id);
  //   setData(newData);
  // };

  const removeItem = useCallback(
    (id) => {
      console.log(id);
      const newData = data.filter((item, index) => index !== id);
      setData(newData);
    },
    [data]
  );
  return (
    <CodeBlock
      heading={"Learn UseCallback 💙"}
      explanation={`It returns a memoized callback function. 
      Think of memoization as caching a value so that it does not need to be recalculated. 
      This allows us to isolate resource intensive functions so that they will not automatically run on every render. 
      The useCallback Hook only runs when one of its dependencies update. 
      This can improve performance.`}
    >
      <div className="flex flex-col gap-3 w-fit items-center">
        {/* Solution 1 - Seperate the useState logic into different component 
        as shown below */}
        {/* <ClickMe></ClickMe> */}

        {/* Solution 2 - Add lowerstate */}

        {/* Solution 3 - Use Memo */}
        <div className="flex flex-row gap-3 w-fit items-center">
          <button className="text-black bg-blue-300 p-2" onClick={handleClick}>
            Click me
          </button>{" "}
          <p className="w-fit p-2 m-2 bg-white rounded-full text-center items-center align-baseline border-2 border-black font-semibold">
            {" "}
            {value}{" "}
          </p>
        </div>

        <ChildThree data={data} removeItem={removeItem}></ChildThree>
      </div>
    </CodeBlock>
  );
}

export default LearnCallback;
