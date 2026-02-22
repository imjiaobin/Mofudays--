import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);

  // 初始化：檢查本地是否有 token
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsAuthed(true);
      // 這裡可以選擇透過 API 獲取最新的使用者資料
    }
  }, []);

  const login = (userData, token, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);
    setIsAuthed(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAuthed(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
