import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Sidebar from './components/Sidebar/index'
import Contact from './components/Contact'
import Content from './components/Content'

function App() {
  const bodyEnd = '</body>'
  const htmlEnd = '</html>'
  const bodyStart = '<body>'
  const htmlStart = '<html>'

  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />;
        <div className="page">
          <div className="top-tags">
            <h3>{bodyStart} </h3>
            <h3>{htmlStart} </h3>
          </div>
          <Routes>
            <Route index path="/" element={<Content />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
          <div className="bottom-tags">
            <h3>{bodyEnd} </h3>
            <h3>{htmlEnd} </h3>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
