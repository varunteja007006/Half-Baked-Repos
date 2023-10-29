import React from "react";
import { Link } from "react-router-dom";

function NavButtons({ path, pathName }) {
  return (
    <li className="mb-1">
      <Link
        className="font-bold bg-orange-400 text-black hover:bg-orange-300"
        to={path}
      >
        {pathName}
      </Link>
    </li>
  );
}

export default NavButtons;
