import React from "react";
import { Link } from "react-router-dom";

function NavButton({ path, pathName }) {
  return (
    <li className="">
      <Link
        className="btn font-bold bg-orange-400 text-black hover:bg-orange-300"
        to={path}
      >
        {pathName}
      </Link>
    </li>
  );
}

export default NavButton;
