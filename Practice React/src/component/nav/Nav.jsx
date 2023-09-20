import React from "react";
import { navlinks } from "./navlinks";
import NavButtons from "./NavButtons";
import { UseThemeContext } from "../../context/ThemeContext";
function Nav() {
  const { theme, setTheme } = UseThemeContext();

  return (
    <nav>
      <ul className="flex flex-row gap-5 text-2xl p-5 bg-orange-200 items-center dark:bg-slate-500">
        {navlinks.map((item, index) => {
          return (
            <NavButtons
              key={index}
              path={item.path}
              pathName={item.pathName}
            ></NavButtons>
          );
        })}
        <li>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={theme === 'light' ? `btn text-black hover:bg-yellow-400 bg-yellow-300 border-2 border-yellow-600 hover:border-yellow-500`: `btn text-black hover:bg-gray-400 bg-gray-300`}
          >
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
