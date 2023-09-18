import { useState, createContext, useContext } from "react";

// First create a state context or state container
export const LearnContext = createContext();

// Second create a provider to supply the state context or state container
export const LearnContextProvider = ({ children }) => {
  const [sampleProp, setSampleProp] = useState("Nothing! here 🐤");

  return (
    <LearnContext.Provider value={{ sampleProp, setSampleProp }}>
      {children}
    </LearnContext.Provider>
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
