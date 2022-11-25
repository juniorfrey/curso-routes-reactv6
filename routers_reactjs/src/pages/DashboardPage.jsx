import { useNavigate, Link, Outlet } from "react-router-dom";

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
      <br />
      <Link to="welcome">Welcome</Link> <br />
      <Link to="goodby">Good By</Link>
      <br />
      <br />
      <Outlet />
    </div>
  );
};

export default DashboardPage;
