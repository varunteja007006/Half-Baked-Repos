import { createContext, useContext, useState } from "react";

const UnsplashGlobalContext = createContext();

export const UnsplashGlobalContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("cat");
  return (
    <UnsplashGlobalContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </UnsplashGlobalContext.Provider>
  );
};

export const UseUnsplashGlobalContext = () => {
  const unsplashGlobalContext = useContext(UnsplashGlobalContext);
  if (!unsplashGlobalContext) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return unsplashGlobalContext;
};
