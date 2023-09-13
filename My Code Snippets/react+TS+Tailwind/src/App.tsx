import Example from "./Example";
import ThemeButton from "./components/theme/ThemeButton";
import { useThemeContext } from "./hook/theme/useThemeContext";

function App() {
  const { theme }: any = useThemeContext();
  return (
    <div className={theme}>
      <div className="main w-full h-screen m-0 p-0 dark:bg-black bg-amber-200">
        <h1 className="text-3xl font-bold underline text-red-600">
          Hello world!
        </h1>
        <ThemeButton></ThemeButton>
        <Example></Example>
      </div>
    </div>
  );
}

export default App;
