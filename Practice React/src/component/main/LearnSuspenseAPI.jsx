import React, { Suspense, lazy, useState } from "react";
import CodeBlock from "./CodeBlock";
const SlowFunctionTwo = lazy(() => import("../subcomponents/SlowFunctionTwo"));

function LearnSuspenseAPI() {
  const [show, setShow] = useState(false);
  return (
    <CodeBlock
      heading={"Learn Suspense API 💚"}
      explanation={`Allows you to manage the loading state of components. It suspends rendering of a component until some data required by the component is fetched. An alternative fallback UI is displayed in meantime. Makes it easy to handle asynchronous data loading and provide smooth user experience in React application.`}
    >
      <button
        className="my-3 bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-500 hover:text-black p-2"
        onClick={() => setShow(!show)}
      >
        Toggle to show the slow component
      </button>
      {show && (
        <Suspense fallback={<p>Loading....</p>}>
          <SlowFunctionTwo></SlowFunctionTwo>
        </Suspense>
      )}
    </CodeBlock>
  );
}

export default LearnSuspenseAPI;
