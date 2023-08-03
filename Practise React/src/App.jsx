import {
  CodeBlock,
  LearnCheckboxes,
  LearnChildrenProp,
  LearnFramer,
  LearnUseEffectCleanup,
  LearnUseReducer,
  LearnUseRedux,
  LearnUseState,
  RandomJsTopics,
} from "./component/main";
//importing all the components from one file - index.jsx in main folder inside src/components.

function App() {
  return (
    <div className="app p-5 flex flex-col gap-5 bg-emerald-100">
      {/* I dont want to render the below paragraph for this component LearnChildrenProp */}
      {/* <p>Hi there, How are you? 😃</p> */}
      <CodeBlock>
        <LearnChildrenProp
          title={"No Children Props"}
          subtitle={
            "We did not pass any children prop between the opening and closing tags of the component"
          }
        ></LearnChildrenProp>
        <span>{`-`.repeat(60)}</span>
        <span>{` **** `}</span>
        <span>{`-`.repeat(60)}</span>
        <LearnChildrenProp
          title={"There is a Children Props"}
          subtitle={
            "We passed a children prop between the opening and closing tags of the component"
          }
        >
          <p className="p-2 bg-green-300 w-fit my-5">
            Hi there, How are you? 😃. This line is child prop
          </p>
        </LearnChildrenProp>
      </CodeBlock>

      <LearnFramer></LearnFramer>

      {/* Learn Reducer concept */}
      <LearnUseReducer></LearnUseReducer>

      <LearnUseRedux></LearnUseRedux>

      <LearnCheckboxes></LearnCheckboxes>

      <LearnUseState></LearnUseState>

      <LearnUseEffectCleanup></LearnUseEffectCleanup>

      {/* 
      Try to learn useCallback
      Try to learn useMemo
      Try to learn Memo
      Try to learn useRef
      Try to learn Transition
      Try to learn Suspence
      */}

      {/* random topics */}
      <RandomJsTopics></RandomJsTopics>
    </div>
  );
}

export default App;
