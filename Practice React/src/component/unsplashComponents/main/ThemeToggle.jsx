import React from "react";
import { CodeBlock } from "../../main";
import { UseThemeContext } from "../../../context/ThemeContext";

function ThemeToggle() {
  const { theme } = UseThemeContext();
  return (
    <div>
      <CodeBlock
        heading={"Theme Toggle"}
        explanation={
          "Using React Context API we switch the themes. Use the Theme button in Nav bar to switch the theme from light to dark mode."
        }
      >
        <div className=" bg-white text-black dark:bg-gray-600 dark:text-white dark:transition-all">
          <p className="p-2 text-lg text-center">
            {theme === "light" ? "This is Light Theme" : "This is Dark Theme"}
          </p>
        </div>
      </CodeBlock>
    </div>
  );
}

export default ThemeToggle;
