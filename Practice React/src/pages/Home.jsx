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
    <>
      <LearnDaisyUI></LearnDaisyUI>

      <LearnFramer></LearnFramer>

      <LearnChildrenProp></LearnChildrenProp>

      <LearnCheckboxes></LearnCheckboxes>

      <LearnFormData></LearnFormData>

      <LearnCustomHooks></LearnCustomHooks>

      <LearnCallback></LearnCallback>

      {/* random topics */}
      <RandomJsTopics></RandomJsTopics>

      <LearnMemo></LearnMemo>

      <LearnMultipleInputs></LearnMultipleInputs>

      <LearnSuspenseAPI></LearnSuspenseAPI>

      <LearnContextProvider>
        <LearnUseContext></LearnUseContext>
      </LearnContextProvider>

      <LearnUseEffectCleanup></LearnUseEffectCleanup>

      <LearnUseMemo></LearnUseMemo>

      {/* Learn Reducer concept */}
      <LearnUseReducer></LearnUseReducer>

      <LearnUseRedux></LearnUseRedux>

      <LearnUseRef></LearnUseRef>

      <LearnUseState></LearnUseState>

      <LearnUseTransition></LearnUseTransition>
    </>
  );
}

export default Home;
