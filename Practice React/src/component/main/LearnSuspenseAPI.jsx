import React, { Suspense, lazy, useState } from "react";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";
const SlowFunctionTwo = lazy(() => import("../subcomponents/SlowFunctionTwo"));

function LearnSuspenseAPI() {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <CodeBlock
      heading={"Learn Suspense API 💚"}
      explanation={`Allows you to manage the loading state of components. It suspends rendering of a component until some data required by the component is fetched. An alternative fallback UI is displayed in meantime. Makes it easy to handle asynchronous data loading and provide smooth user experience in React application.`}
    >
      <YellowBtn
        label={"Toggle to show the slow component"}
        handleButton={handleClick}
        type={"button"}
      ></YellowBtn>

      {show && (
        <Suspense fallback={<p>Loading....</p>}>
          <SlowFunctionTwo></SlowFunctionTwo>
        </Suspense>
      )}
    </CodeBlock>
  );
}

export default LearnSuspenseAPI;
