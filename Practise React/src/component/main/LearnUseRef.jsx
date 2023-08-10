import React, { useEffect, useRef, useState } from "react";
import CodeBlock from "./CodeBlock";

function LearnUseRef() {
  const [value, setValue] = useState(0);
  const refInputContainer = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    // What if I dont want to run certain functionality after initial render
    if (!isMounted.current) {
      isMounted.current = true;
    //   console.log("Initial Render");
      return;
    }
    // You can see that above code in "if" is not running during re-render
    // console.log("Re-Render");
    // Note: Dont check isMounted since it is an object and will always be true
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can get the value of an input using UseRef
    // console.log(refInputContainer.current.value);
  };

  return (
    <CodeBlock heading={'Learn UseRef 🖤'} explanation={``}>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 p-2 border-black"
          placeholder="Type Anything and check console"
          ref={refInputContainer}
        />
        <button className="bg-yellow-400 p-2 m-3" type="submit">
          Submit
        </button>
      </form>
      <p className="w-fit p-2 my-2 bg-white rounded-full text-center items-center align-baseline border-2 border-black font-semibold">{value}</p>
      <button
        className="p-2 bg-yellow-400 text-black"
        onClick={() => {
          setValue(value + 1);
        }}
      >
        click me!!
      </button>
    </CodeBlock>
  );
}

export default LearnUseRef;
