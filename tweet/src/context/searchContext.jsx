/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const searchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("varun");

  return (
    <searchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </searchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(searchContext);

  if (!context) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return context;
};
