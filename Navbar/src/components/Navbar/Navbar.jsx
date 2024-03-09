import { useNavbarContext } from "../../context/NavbarContext";
import { FaBars } from "react-icons/fa";
import logo from "./images/logo.svg";

function Navbar() {
  const { openSidebar } = useNavbarContext();
  return (
    <nav className="nav" style={{ padding: "1rem" }}>
      <div className="nav-center" style={{ width: "100%", maxWidth: "none" }}>
        <div className="nav-header">
          <img src={logo} className="nav-logo" alt="" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul style={{ display: "flex", gap: "0.8rem", justifyContent: "end" }}>
          <li>link</li>
          <ul style={{ display: "none" }}>
            <li>Sub-Links</li>
            <li>Sub-Links</li>
            <li>Sub-Links</li>
            <li>Sub-Links</li>
            <li>Sub-Links</li>
          </ul>
          <li>link</li>
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
        <div style={{ marginLeft: "1rem" }}>Some btn here</div>
      </div>
    </nav>
  );
}

export default Navbar;
