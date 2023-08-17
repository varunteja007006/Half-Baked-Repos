import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Unsplash from "./pages/Unsplash";
import Nav from "./component/nav/Nav";
import { UseThemeContext } from "./context/ThemeContext";
import Cms from "./pages/Cms";

function App() {
  const { theme } = UseThemeContext();
  return (
    <BrowserRouter>
      <Nav></Nav>
      <div className={`app p-5 bg-emerald-100 ${theme}`}>
        <Routes>
          <Route path="/" index element={<Home></Home>}></Route>
          <Route
            path="/unsplash-project"
            index
            element={<Unsplash></Unsplash>}
          ></Route>
          <Route path="/cms-project" element={<Cms></Cms>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
