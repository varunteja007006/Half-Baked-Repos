import React, { useState } from "react";
import { navlinks, dropdownlinks } from "./navlinks";
import NavButtons from "./NavButtons";
import { UseThemeContext } from "../../context/ThemeContext";
function Nav() {
  const [itemStatus, setItemStatus] = useState(false);
  const { theme, setTheme } = UseThemeContext();
  const handleItemStatus = () => {
    setItemStatus(!itemStatus);
  };
  return (
    <nav>
      <ul className="flex flex-row gap-5 text-2xl p-5 bg-orange-200 items-center">
        {navlinks.map((item, index) => {
          return (
            <NavButtons
              key={index}
              path={item.path}
              pathName={item.pathName}
            ></NavButtons>
          );
        })}
        {/* <details className="dropdown">
          <summary
            onClick={handleItemStatus}
            className="btn font-bold  bg-orange-700 text-white hover:bg-orange-600"
          >
            React Topics {itemStatus ? "🔼" : "🔽"}
          </summary>
          <ul className="menu dropdown-content z-[1] bg-transparent m-0 mt-2 p-0">
            {dropdownlinks.map((item, index) => {
              return (
                <NavButtons
                  key={index}
                  path={item.path}
                  pathName={item.pathName}
                ></NavButtons>
              );
            })}
          </ul>
        </details> */}
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
