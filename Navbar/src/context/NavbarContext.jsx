import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [location, setLocation] = useState({});
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (name, coordinates) => {
    setIsSubmenuOpen(true);
    setActiveSubmenu(name);
    setLocation(coordinates);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
    setActiveSubmenu("");
  };
  return (
    <NavbarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        activeSubmenu,
        location,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw Error("NavbarContext: Context out of bounds");
  }
  return context;
};
