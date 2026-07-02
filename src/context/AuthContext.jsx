import { createContext, useContext, useState, useEffect } from "react";
import { apiLogin, apiLogout, apiMe } from "../services/api";

const AuthContext = createContext(null);

function mapUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [authLoading, setAuthLoading] = useState(() => !!localStorage.getItem("token"));

  const clearSession = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthLoading(false);
      return;
    }

    const restoreSession = async () => {
      try {
        const user = await apiMe();
        if (user?.id) {
          const mapped = mapUser(user);
          setCurrentUser(mapped);
          localStorage.setItem("currentUser", JSON.stringify(mapped));
        } else {
          clearSession();
        }
      } catch {
        const saved = localStorage.getItem("currentUser");
        if (saved) {
          setCurrentUser(JSON.parse(saved));
        } else {
          clearSession();
        }
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

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
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ currentUser, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
