import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getProtectedRequest, loginRequest } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const bootstrapAuth = useCallback(async () => {
    try {
      const response = await getProtectedRequest();
      setUser(response.data?.user || null);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsBootstrapping(false);
    }
  }, []);

  const login = useCallback(async (payload) => {
    const response = await loginRequest(payload);
    setUser(response.data?.user || null);
    setIsAuthenticated(true);
    return response;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isBootstrapping,
      bootstrapAuth,
      login,
      logout,
    }),
    [user, isAuthenticated, isBootstrapping, bootstrapAuth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
