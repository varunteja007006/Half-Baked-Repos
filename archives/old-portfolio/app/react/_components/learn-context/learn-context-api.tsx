"use client";
import React from "react";

const LearnContext = React.createContext<{
  incValue: number;
  setIncValue: React.Dispatch<React.SetStateAction<number>>;
}>({
  incValue: 0,
  setIncValue: () => {},
});

export const LearnContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [incValue, setIncValue] = React.useState(0);

  const obj = React.useMemo(
    () => ({
      incValue,
      setIncValue,
    }),
    [incValue, setIncValue]
  );

  return <LearnContext.Provider value={obj}>{children}</LearnContext.Provider>;
};

export const useLearnContext = () => {
  const context = React.useContext<{
    incValue: number;
    setIncValue: React.Dispatch<React.SetStateAction<number>>;
  }>(LearnContext);

  if (!context) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return context;
};
