
import { NavLink } from "react-router-dom";
import './navbar.css'
const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacto"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Contacto
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar
