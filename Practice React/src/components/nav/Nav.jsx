import React, { useState } from "react";
import { navlinks } from "./navlinks/navlinks";
import NavButton from "./NavButton";
import NavMenuButton from "./NavMenuButton";
import { UseThemeContext } from "../../context/ThemeContext";
import { navMenuLinks } from "./navlinks/navMenuLinks";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function Nav() {
  const { theme, setTheme } = UseThemeContext();
  const [menubtnState, setMenubtnState] = useState(false);
  return (
    <nav className="flex flex-wrap flex-row bg-orange-200 items-center dark:bg-slate-500">
      {/* nav buttons */}
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
          {/* theme button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`btn text-black hover:bg-yellow-400 bg-yellow-300 dark:hover:bg-gray-400 dark:bg-gray-300`}
          >
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
      <div>
        {/* dropdown menu for more projects */}
        <details className="dropdown">
          <summary
            onClick={() => setMenubtnState(!menubtnState)}
            className="m-1 btn font-bold bg-orange-400 text-black hover:bg-orange-500 dark:hover:bg-gray-400 dark:bg-gray-300"
          >
            More{" "}
            {menubtnState ? (
              <AiFillCaretUp></AiFillCaretUp>
            ) : (
              <AiFillCaretDown></AiFillCaretDown>
            )}
          </summary>
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
