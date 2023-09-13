import { useState, useEffect, createContext } from "react";
interface ThemeType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeType | null>(null);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    //we get json format from local storage so we parse it into objects for JavaScript
    const theme = localStorage.getItem("theme");
    //check if we got theme from local storage, if yes then set the theme
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
