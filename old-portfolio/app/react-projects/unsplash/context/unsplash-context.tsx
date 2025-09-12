import * as React from "react";

type UnsplashGlobalContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const unsplashGlobalContext = React.createContext<UnsplashGlobalContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const UnsplashGlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = React.useState("cat");

  const obj = React.useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
    }),
    [searchTerm]
  );

  return (
    <unsplashGlobalContext.Provider value={obj}>
      {children}
    </unsplashGlobalContext.Provider>
  );
};

export const useUnsplashGlobalContext = () => {
  const context = React.useContext(unsplashGlobalContext);
  if (!context) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return context;
};
