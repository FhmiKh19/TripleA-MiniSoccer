import { createContext, useContext, useState, useEffect } from "react";
import { apiLogin, apiLogout } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const login = async (email, password) => {
    try {
      const res = await apiLogin(email, password);
      if (res && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        setCurrentUser(res.user);
        return { success: true, role: res.user.role };
      }
      return { success: false, message: res?.message || "Email atau kata sandi salah." };
    } catch (err) {
      return { success: false, message: "Tidak dapat terhubung ke server. Coba lagi." };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      // ignore network errors on logout
    }
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
