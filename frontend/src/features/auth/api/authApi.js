import apiClient from "../../../lib/apiClient";

export const registerRequest = (payload) => apiClient.post("/api/auth/register", payload);

export const loginRequest = (payload) => apiClient.post("/api/auth/login", payload);

export const verifyEmailRequest = (token) => apiClient.get(`/api/auth/verify/${token}`);

export const getProtectedRequest = () => apiClient.get("/api/protected");
