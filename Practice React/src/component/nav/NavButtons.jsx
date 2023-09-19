import React from "react";
import { Link } from "react-router-dom";

function NavButtons({ path, pathName }) {
  return (
    <li>
      <Link
        className="btn font-bold  bg-orange-700 text-white hover:bg-orange-600"
        to={path}
      >
        {pathName}
      </Link>
    </li>
  );
}

export default NavButtons;
