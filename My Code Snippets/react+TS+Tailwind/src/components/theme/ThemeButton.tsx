import { useThemeContext } from "../../hook/theme/useThemeContext";

function ThemeButton() {
  const { theme, setTheme } = useThemeContext();
  const setlocal = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <button
        className="dark:bg-gray-800 dark:text-white border-2 border-white bg-gray-300 rounded-lg p-2 my-2"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
          setlocal();
        }}
        aria-label={theme === "light" ? "Dark theme" : "Light theme"}
      >
        {theme === "light" ? <>Dark Theme</> : <>Light Theme</>}
      </button>
    </>
  );
}

export default ThemeButton;
