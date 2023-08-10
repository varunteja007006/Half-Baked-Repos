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
  LearnSuspenseAPI,
} from "./component/main";
import { LearnContextProvider } from "./context/LearnContext";

//importing all the components from one file - index.jsx in main folder inside src/components.

function App() {
  return (
    <div className="app p-5 bg-emerald-100">
      <LearnDaisyUI></LearnDaisyUI>

      <LearnFramer></LearnFramer>
      
      <LearnSuspenseAPI></LearnSuspenseAPI>

      <LearnChildrenProp></LearnChildrenProp>

      {/* Learn Reducer concept */}
      <LearnUseReducer></LearnUseReducer>

      <LearnUseRedux></LearnUseRedux>

      <LearnCheckboxes></LearnCheckboxes>

      <LearnUseState></LearnUseState>

      <LearnUseEffectCleanup></LearnUseEffectCleanup>

      <LearnMultipleInputs></LearnMultipleInputs>

      <LearnMemo></LearnMemo>

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
