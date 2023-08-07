import {
  LearnCheckboxes,
  LearnChildrenProp,
  LearnFramer,
  LearnUseEffectCleanup,
  LearnUseReducer,
  LearnUseRedux,
  LearnUseState,
  RandomJsTopics,
} from "./component/main";
import LearnFormData from "./component/main/LearnFormData";
import LearnMultipleInputs from "./component/main/LearnMultipleInputs";
import LearnUseRef from "./component/main/LearnUseRef";
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
      {/* 
      Try to learn useCallback
      Try to learn useMemo
      Try to learn Memo
      Try to learn Transition
      Try to learn Suspence
      */}
      <LearnUseRef></LearnUseRef>
      <LearnFormData></LearnFormData>
      {/* random topics */}
      <RandomJsTopics></RandomJsTopics>
    </div>
  );
}

export default App;
