
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children, user, redirectTo="/"}) => {

  if(!user){
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;

}

export default ProtectedRoute
