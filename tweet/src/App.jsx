import Navbar from "./components/ui/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <main className="min-w-[400px] bg-blue-100 min-h-screen">
        <Routes>
          <Route index path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
