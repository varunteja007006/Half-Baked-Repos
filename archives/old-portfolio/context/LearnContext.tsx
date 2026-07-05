import { useState, createContext, useContext, useMemo, ReactNode } from "react";

// First create a state context or state container
export const LearnContext = createContext({
  sampleProp: "",
});

// Second create a provider to supply the state context or state container
export const LearnContextProvider = ({ children }: { children: ReactNode }) => {
  const [sampleProp, setSampleProp] = useState("Nothing! here 🐤");

  const valueProps = useMemo(
    () => ({
      sampleProp,
      setSampleProp,
    }),
    [sampleProp]
  );

  return (
    <LearnContext.Provider value={valueProps}>{children}</LearnContext.Provider>
  );
};

// Third use the context by using UseContext
export const UseLearnContext = () => {
  const context = useContext(LearnContext);
  if (!context) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return context;
};
