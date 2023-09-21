import React from "react";
import { navlinks } from "./navlinks";
import NavButton from "./NavButton";
import NavMenuButton from "./NavMenuButton";
import { UseThemeContext } from "../../context/ThemeContext";
import { navMenuLinks } from "./navMenuLinks";

function Nav() {
  const { theme, setTheme } = UseThemeContext();

  return (
    <nav className="flex flex-wrap flex-row bg-orange-200 items-center dark:bg-slate-500">
      <ul className="flex flex-row gap-5 text-2xl p-5 ">
        {navlinks.map((item, index) => {
          return (
            <NavButton
              key={index}
              path={item.path}
              pathName={item.pathName}
            ></NavButton>
          );
        })}
        <li>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={
              theme === "light"
                ? `btn text-black hover:bg-yellow-400 bg-yellow-300 border-2 border-yellow-600 hover:border-yellow-500`
                : `btn text-black hover:bg-gray-400 bg-gray-300`
            }
          >
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
      <div>
        <details className="dropdown">
          <summary className="m-1 btn font-bold bg-orange-400 text-black hover:bg-orange-500">More ...</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            {navMenuLinks.map((item, index) => {
              return (
                <NavMenuButton
                  key={index}
                  path={item.path}
                  pathName={item.pathName}
                ></NavMenuButton>
              );
            })}
          </ul>
        </details>
      </div>
    </nav>
  );
}

export default Nav;
