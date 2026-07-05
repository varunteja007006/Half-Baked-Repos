import Navbar from './Navbar'; 
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar-top">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
