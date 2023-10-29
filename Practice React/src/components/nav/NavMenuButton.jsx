import React from "react";
import { Link } from "react-router-dom";

function NavMenuButtons({ path, pathName }) {
  return (
    <li className="mb-1">
      <Link
        className="font-bold bg-orange-400 text-black hover:bg-orange-300 dark:hover:bg-gray-400 dark:bg-gray-300"
        to={path}
      >
        {pathName}
      </Link>
    </li>
  );
}

export default NavMenuButtons;
