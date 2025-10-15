import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const tkn = sessionStorage.getItem('authToken');
  const location = useLocation();

  if (!tkn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}