import { useNavbarContext } from "../../context/NavbarContext";
import { FaTimes } from "react-icons/fa";

function SideBar() {
  const { isSidebarOpen, closeSidebar } = useNavbarContext();
  return (
    <>
      <div
        className={`${
          isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
        }`}
      >
        <aside className="sidebar">
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
          <div className="sidebar-links">
            <article>
              <h4>Article 1</h4>
              <div className="sidebar-sublinks">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
              </div>
            </article>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SideBar;
