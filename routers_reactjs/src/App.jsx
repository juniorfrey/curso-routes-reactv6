import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

//Import Pages
import ContactoPage from './pages/ContactoPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import UserPages from './pages/UserPages';

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
      setUser({
        id:1,
        name:'Fredy',
        permiso: ['analisis'],
      })
  }

  const logout =() => {
    setUser(null);
  }

  return (
    <BrowserRouter className="App">
      <Navbar />

      {user ? (
        <button onClick={logout}>Salir</button>
      ) : (
        <button onClick={login}>Entrar</button>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />} >
          <Route path="/dashboard/*" element={<DashboardPage />}>
            <Route path="welcome" element={<div>WELCOME !!!</div>} />
            <Route path="goodby" element={<div>GOOG BY !!!</div>} />
          </Route>
        </Route>
        <Route path="/contacto" element={
          <ProtectedRoute 
                isAllowed={!!user && user.permiso.includes('analisis')}
                redirectTo="/dashboard"
                > 
            <ContactoPage />
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={<Navigate to="/contacto" />} />
        <Route path="/users/:id" element={<UserPages />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
