import API from "../API/apiClient";

export const login = async (data) =>
  API.post("/auth/login", data, {
    withCredentials: true,
  });
export const logout = async (data) =>
  API.get("/auth/logout", data, {
    withCredentials: true,
  });
export const register = async (data) => API.post("/auth/register", data);
export const verifyEmail = async (data) =>
  API.get(`/auth/email/verify/${data}`);
export const forgotPassword = async (data) =>
  API.post("/auth/password/forgot", data);
export const resetPassword = async (data) =>
  API.post(`/auth/password/reset/`, data);
export const checkResetCode = async (data) =>
  API.get(`/auth/password/check?code=${data.code}&exp=${data.exp}`);
export const userSessions = async () =>
  API.get(`/user`, { withCredentials: true });
export const refreshAuthToken = async () =>
  API.get("/auth/refresh", { withCredentials: true });  
export const findUserSession = async (data) =>
  API.get(`/sessions?userId=${data}`, {
    withCredentials: true,
  });
