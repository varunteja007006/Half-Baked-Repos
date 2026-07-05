import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: {} as Dispatch<SetStateAction<"light" | "dark">>,
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const themeData = localStorage.getItem("theme");
    if (themeData) {
      setTheme(themeData as "light" | "dark");
    }
  }, [theme]);

  const valueProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={valueProps}>{children}</ThemeContext.Provider>
  );
};

export const UseThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw Error("Context must be used inside an Context Provider !!");
  }
  return themeContext;
};
