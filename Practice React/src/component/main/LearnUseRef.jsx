import React, { useEffect, useRef, useState } from "react";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";

function LearnUseRef() {
  const [value, setValue] = useState(0);
  const refInputContainer = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    // What if I don't want to run certain functionality after initial render? Then the below code will help.
    if (!isMounted.current) {
      isMounted.current = true;
      //   console.log("Initial Render");
      return;
    }
    // You can see that above code in "if" is not running during re-render
    // console.log("Re-Render");
    // Note: Don't check isMounted since it is an object and will always be true
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can get the value of an input using UseRef
    console.log(refInputContainer.current.value);
  };

  const handleClick = () => {
    setValue(value + 1);
  };

  return (
    <CodeBlock heading={"Learn UseRef 🖤"} explanation={``}>
      <form
        action=""
        onSubmit={handleSubmit}
        className="mt-3 flex flex-row gap-3"
      >
        <input
          type="text"
          className="border-2 p-2 border-black w-96"
          placeholder="Type anything and check the console"
          ref={refInputContainer}
        />
        <YellowBtn label={"Submit"} type={"submit"}></YellowBtn>
      </form>
      <div className="flex flex-row gap-4 mt-3">
        <p className="btn bg-white hover:bg-white border-2 border-black hover:border-black cursor-default">
          {value}
        </p>
        <YellowBtn handleButton={handleClick} type={"button"}></YellowBtn>
      </div>
    </CodeBlock>
  );
}

export default LearnUseRef;
