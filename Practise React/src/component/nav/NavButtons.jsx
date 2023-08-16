import React from "react";
import { Link } from "react-router-dom";

function NavButtons({ path, pathName }) {
  return (
    <li className="btn font-bold  bg-orange-700 text-white hover:bg-orange-600">
      <Link className="hover:bg-transparent bg-transparent" to={path}>
        {" "}
        {pathName}{" "}
      </Link>
    </li>
  );
}

export default NavButtons;
