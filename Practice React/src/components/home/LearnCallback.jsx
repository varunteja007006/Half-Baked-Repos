import CodeBlock from "../CodeBlock";
import ChildThree from "../subcomponents/ChildThree";
import { useCallback, useState } from "react";
import { sampleData } from "../../data/sampleData";
import { toast } from "react-toastify";
import Yellowbtn from "../subcomponents/YellowBtn";

function LearnCallback() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState(sampleData);

  const handleClick = () => {
    setValue(value + 1);
  };

  const handleReset = () => {
    toast.success(`Records restored 😉`);
    setData(sampleData);
  };

  // // The below code will cause re-render because react re-renders function since it is passed as prop to a Component.
  // const removeItem = (id) => {
  //   console.log(id);
  //   const newData = data.filter((item, index) => index !== id);
  //   setData(newData);
  // };

  const removeItem = useCallback(
    (id) => {
      toast(`Deleted the record ${id + 1}`);
      const newData = data.filter((_, index) => index !== id);
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
      <div className="flex flex-col gap-3 w-fit">
        {/* Solution 1 - Separate the useState logic into different component 
        as shown below */}
        {/* <ClickMe></ClickMe> */}

        {/* Solution 2 - Add lower state */}

        {/* Solution 3 - Use Memo and useCallback function */}
        <div className="flex flex-row gap-3 w-fit items-center">
          <Yellowbtn type={"button"} handleButton={handleClick}></Yellowbtn>
          <p className="btn bg-white border-2 border-black dark:text-black hover:border-black hover:bg-white cursor-default">
            {value}
          </p>
        </div>

        {/* reset data button */}
        <Yellowbtn
          handleButton={handleReset}
          type={"button"}
          label={"Reset the list"}
        ></Yellowbtn>

        {/* data rendering component */}
        <ChildThree data={data} removeItem={removeItem}></ChildThree>
      </div>
    </CodeBlock>
  );
}

export default LearnCallback;
