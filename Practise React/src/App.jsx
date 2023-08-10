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
  LearnMemo,
  LearnCallback,
  LearnDaisyUI,
  LearnUseMemo,
  LearnUseTransition,
  LearnUseContext,
} from "./component/main";
import { LearnContextProvider } from "./context/LearnContext";

//importing all the components from one file - index.jsx in main folder inside src/components.

function App() {
  return (
    <div className="app p-5 bg-emerald-100">
      <LearnDaisyUI></LearnDaisyUI>

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

      <LearnCallback></LearnCallback>

      <LearnContextProvider>
        <LearnUseContext></LearnUseContext>
        {/* random topics */}
      </LearnContextProvider>

      <RandomJsTopics></RandomJsTopics>

      <LearnUseMemo></LearnUseMemo>

      <LearnUseTransition></LearnUseTransition>
    </div>
  );
}

export default App;
