import { createContext, useContext, useState, useEffect } from "react";
import { users } from "../data/seeder";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // First, try to find in seeded users
    let user = users.find(
      (u) => u.email === email && u.password === password
    );
    
    // If not found in seeded users, check localStorage for registered users
    if (!user) {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const registeredUsers = JSON.parse(storedUsers);
        user = registeredUsers.find(
          (u) => u.email === email && u.password === password
        );
      }
    }

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, role: user.role };
    }
    return { success: false, message: "Email atau kata sandi salah." };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
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
