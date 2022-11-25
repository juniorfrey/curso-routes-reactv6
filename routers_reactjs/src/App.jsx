import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

//Import Pages
import ContactoPage from './pages/ContactoPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import UserPages from './pages/UserPages';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<DashboardPage />}>
          <Route path="welcome" element={<div>WELCOME !!!</div>} />
          <Route path="goodby" element={<div>GOOG BY !!!</div>} />
        </Route>
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/usuarios" element={<Navigate to="/contacto" />} />
        <Route path="/users/:id" element={<UserPages />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
