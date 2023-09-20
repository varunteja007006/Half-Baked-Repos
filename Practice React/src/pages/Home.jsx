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
} from "../component/main";
//Above we are importing all the components from one file - index.jsx in main folder inside src/components.

import { LearnContextProvider } from "../context/LearnContext";
import React from "react";

function Home() {
  return (
    <div>
      <LearnDaisyUI></LearnDaisyUI>

      <LearnFramer></LearnFramer>

      <LearnChildrenProp></LearnChildrenProp>

      <LearnSuspenseAPI></LearnSuspenseAPI>

      <LearnCheckboxes></LearnCheckboxes>

      <LearnUseEffectCleanup></LearnUseEffectCleanup>

      <LearnMultipleInputs></LearnMultipleInputs>

      <LearnMemo></LearnMemo>

      <LearnFormData></LearnFormData>

      <LearnCustomHooks></LearnCustomHooks>

      <LearnCallback></LearnCallback>

      <LearnContextProvider>
        <LearnUseContext></LearnUseContext>
      </LearnContextProvider>

      {/* random topics */}
      <RandomJsTopics></RandomJsTopics>

      <LearnUseMemo></LearnUseMemo>

      {/* Learn Reducer concept */}
      <LearnUseReducer></LearnUseReducer>

      <LearnUseRedux></LearnUseRedux>

      <LearnUseRef></LearnUseRef>

      <LearnUseState></LearnUseState>

      <LearnUseTransition></LearnUseTransition>
    </div>
  );
}

export default Home;
