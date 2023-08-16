import { useState, createContext, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const UseThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return themeContext;
};
