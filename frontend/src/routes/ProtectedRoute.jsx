import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <p className="route-status">Checking session...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
