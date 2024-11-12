
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <NoteState>
    <Router>
      <div>
      <Navbar /> 
      <Alert message="Test msg" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
      
        </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
