import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import SideBar from "./components/SideBar";
import NotesList from "./Pages/NotesList";
import NotePage from "./Pages/NotePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<NotesList/>}></Route>
            <Route path="/note/:id" element={<NotePage/>}></Route>
            <Route path="/about"></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
