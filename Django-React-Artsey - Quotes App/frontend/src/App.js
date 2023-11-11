import Header from "./Components/Header";
import "./App.scss";
import QuotesList from "./Components/QuotesList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quote from "./Components/Quote";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className="header">
          <Header></Header>
        </div>
        <Routes>
          <Route index element={<QuotesList />}></Route>
          <Route path="/quote/:name/" element={<Quote />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
