import { useNavigate, Route, Routes, Router } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleClick}>Salir</button>
      <br />
      <Routes>
        <Route path="welcome" element={<div>WELCOME</div>}/>
      </Routes>
    </div>
  );
};

export default DashboardPage;
