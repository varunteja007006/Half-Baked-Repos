import { useNavbarContext } from "../../context/NavbarContext";
import { FaBars } from "react-icons/fa";
import logo from "./images/logo.svg";
import { useEffect, useRef, useState } from "react";

const Dropdown = () => {
  const { activeSubmenu, location, openSubmenu, closeSubmenu } =
    useNavbarContext();
  const [center, setCenter] = useState("0px");
  const [bottom, setBottom] = useState("0px");
  useEffect(() => {
    const { center, bottom } = location;
    setCenter(`${center - 20}px`);
    setBottom(`${bottom + 5}px`);
  }, [location, activeSubmenu]);
  const handleMouseOver = (event) => {
    openSubmenu(activeSubmenu, { center, bottom });
  };

  switch (activeSubmenu) {
    case "Link1":
      return (
        <aside
          style={{ left: center, top: bottom }}
          className={`dropdown ${activeSubmenu === "Link1" ? "show" : ""}`}
          onMouseOver={handleMouseOver}
          onMouseLeave={closeSubmenu}
        >
          <ul className="custom-ul">
            <li className="custom-li">Sub-Links 1</li>
            <li className="custom-li">Sub-Links 1</li>
            <li className="custom-li">Sub-Links 1</li>
            <li className="custom-li">Sub-Links 1</li>
            <li className="custom-li">Sub-Links 1</li>
          </ul>
        </aside>
      );
    case "Link2":
      return (
        <aside
          style={{ left: center, top: bottom }}
          className={`dropdown ${activeSubmenu === "Link2" ? "show" : ""}`}
          onMouseOver={handleMouseOver}
          onMouseLeave={closeSubmenu}
        >
          <ul className="custom-ul">
            <li className="custom-li">Sub-Links 2</li>
            <li className="custom-li">Sub-Links 2</li>
            <li className="custom-li">Sub-Links 2</li>
            <li className="custom-li">Sub-Links 2</li>
            <li className="custom-li">Sub-Links 2</li>
          </ul>
        </aside>
      );
    case "Link3":
      return (
        <aside
          style={{ left: center, top: bottom }}
          className={`dropdown ${activeSubmenu === "Link3" ? "show" : ""}`}
          onMouseOver={handleMouseOver}
          onMouseLeave={closeSubmenu}
        >
          <ul className="custom-ul">
            <li className="custom-li">Sub-Links 3</li>
            <li className="custom-li">Sub-Links 3</li>
            <li className="custom-li">Sub-Links 3</li>
            <li className="custom-li">Sub-Links 3</li>
            <li className="custom-li">Sub-Links 3</li>
          </ul>
        </aside>
      );
    case "Link4":
      return (
        <aside
          style={{ left: center, top: bottom }}
          className={`dropdown ${activeSubmenu === "Link4" ? "show" : ""}`}
          onMouseOver={handleMouseOver}
          onMouseLeave={closeSubmenu}
        >
          <ul className="custom-ul">
            <li className="custom-li">Sub-Links 4</li>
            <li className="custom-li">Sub-Links 4</li>
            <li className="custom-li">Sub-Links 4</li>
            <li className="custom-li">Sub-Links 4</li>
            <li className="custom-li">Sub-Links 4</li>
          </ul>
        </aside>
      );
    default:
      return <></>;
  }
};

function Navbar() {
  const { openSidebar, openSubmenu, closeSubmenu } = useNavbarContext();
  const handleMouseOver = (event) => {
    const page = event.target.textContent; // This gives the name of the button/ Link
    const btnBoundValues = event.target.getBoundingClientRect();
    const center = (btnBoundValues.left + btnBoundValues.right) / 2;
    const bottom = btnBoundValues.bottom - 3;
    openSubmenu(page, { center, bottom });
  };
  return (
    <>
      <nav
        className="nav"
        style={{ padding: "0rem 1rem" }}
        onMouseLeave={closeSubmenu}
      >
        <div
          className="nav-center"
          style={{ width: "100%", maxWidth: "none", height: "100%" }}
        >
          <div className="nav-header">
            <img src={logo} className="nav-logo" alt="" />
            <button className="btn toggle-btn" onClick={openSidebar}>
              <FaBars />
            </button>
          </div>
          <ul
            style={{
              display: "flex",
              gap: "0.8rem",
              justifyContent: "end",
              alignItems: "center",
              height: "100%",
            }}
          >
            <li
              style={{ width: "10px", height: "100%" }}
              onMouseOver={closeSubmenu}
            ></li>
            <li className="myLinks" onMouseOver={handleMouseOver}>
              Link1
            </li>
            <li className="myLinks" onMouseOver={handleMouseOver}>
              Link2
            </li>
            <li className="myLinks" onMouseOver={handleMouseOver}>
              Link3
            </li>
            <li className="myLinks" onMouseOver={handleMouseOver}>
              Link4
            </li>
            <li
              style={{ width: "10px", height: "100%" }}
              onMouseOver={closeSubmenu}
            ></li>
          </ul>
          <div style={{ marginLeft: "1rem" }}>Some btn here</div>
        </div>
      </nav>
      <Dropdown />
    </>
  );
}

export default Navbar;
