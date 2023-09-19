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
            className="btn hover:bg-gray-700 bg-black text-xl"
          >
            {theme === "light" ? "🌕" : "🌞"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
