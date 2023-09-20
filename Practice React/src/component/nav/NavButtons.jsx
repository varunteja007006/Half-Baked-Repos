import React from "react";
import { Link } from "react-router-dom";

function NavButtons({ path, pathName }) {
  return (
    <li>
      <Link
        className="btn font-bold  bg-orange-400 text-black hover:bg-orange-500"
        to={path}
      >
        {pathName}
      </Link>
    </li>
  );
}

export default NavButtons;
