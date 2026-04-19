import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <p className="route-status">Checking session...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
