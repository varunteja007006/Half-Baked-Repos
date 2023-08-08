import {
  LearnCheckboxes,
  LearnChildrenProp,
  LearnFramer,
  LearnUseEffectCleanup,
  LearnUseReducer,
  LearnUseRedux,
  LearnUseState,
  RandomJsTopics,
  LearnCustomHooks,
  LearnFormData,
  LearnMultipleInputs,
  LearnUseRef,
  SampleComponent,
  LearnMemo,
} from "./component/main";
import { LearnContextProvider } from "./context/LearnContext";

//importing all the components from one file - index.jsx in main folder inside src/components.

function App() {
  return (
    <div className="app p-5 flex flex-col gap-5 bg-emerald-100">
      <LearnChildrenProp></LearnChildrenProp>

      <LearnFramer></LearnFramer>

      {/* Learn Reducer concept */}
      <LearnUseReducer></LearnUseReducer>

      <LearnUseRedux></LearnUseRedux>

      <LearnCheckboxes></LearnCheckboxes>

      <LearnUseState></LearnUseState>

      <LearnUseEffectCleanup></LearnUseEffectCleanup>

      <LearnMultipleInputs></LearnMultipleInputs>

      <LearnMemo></LearnMemo>
      {/* 
      Try to learn useCallback
      Try to learn useMemo
      Try to learn Memo
      Try to learn Transition
      Try to learn Suspence
      */}
      <LearnUseRef></LearnUseRef>

      <LearnFormData></LearnFormData>

      <LearnCustomHooks></LearnCustomHooks>

      <LearnContextProvider>
        <SampleComponent></SampleComponent>
        {/* random topics */}
      </LearnContextProvider>

      <RandomJsTopics></RandomJsTopics>
    </div>
  );
}

export default App;
