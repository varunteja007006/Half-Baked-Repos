import {
  LearnCheckboxes,
  LearnChildrenProp,
  LearnUseEffectCleanup,
  LearnUseReducer,
  LearnUseRedux,
  LearnUseState,
  LearnCustomHooks,
  LearnFormData,
  LearnMultipleInputs,
  LearnUseRef,
  LearnMemo,
  LearnCallback,
  LearnUseMemo,
  LearnUseTransition,
  LearnUseContext,
  LearnSuspenseAPI,
} from "../components/home";
//Above we are importing all the components from one file - index.jsx in home folder inside src/components.

import { LearnContextProvider } from "../context/LearnContext";

import React from "react";

function Home() {
  return (
    <>
      {/* <LearnFramer></LearnFramer> */}

      <LearnCallback></LearnCallback>

      <LearnCheckboxes></LearnCheckboxes>

      <LearnChildrenProp></LearnChildrenProp>

      <LearnCustomHooks></LearnCustomHooks>

      <LearnFormData></LearnFormData>

      {/* random topics */}
      {/* <RandomJsTopics></RandomJsTopics> */}

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
