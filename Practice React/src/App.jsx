import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Unsplash from "./pages/Unsplash";
import Nav from "./component/nav/Nav";
import { UseThemeContext } from "./context/ThemeContext";
import Cms from "./pages/Cms";
import Menu from "./pages/Menu";

function App() {
  const { theme } = UseThemeContext();
  return (
    <BrowserRouter>
      <span className={`${theme}`}>
        <Nav></Nav>

        <div className={`app p-5 bg-emerald-100 dark:bg-slate-300`}>
          <Routes>
            {/* react concepts and hooks */}
            <Route path="/" index element={<Home></Home>}></Route>

            {/* unsplash - React Query tutorial */}
            <Route
              path="/unsplash-project"
              index
              element={<Unsplash></Unsplash>}
            ></Route>

            {/* cms project - Content Management System */}
            <Route path="/cms-project" element={<Cms></Cms>}></Route>

            {/* menu project - hotel menu*/}
            <Route path="/menu-project" element={<Menu></Menu>}></Route>
          </Routes>
        </div>
      </span>
    </BrowserRouter>
  );
}

export default App;
