import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hola mundo</div>} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
