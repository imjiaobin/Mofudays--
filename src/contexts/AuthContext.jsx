import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUserProfile } from "../api/userApi"; // 路徑依你的專案調整

const API_BASE_URL = "http://localhost:3000";
const AuthContext = createContext(null);

function getStorage(key) {
  return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
}

function clearStorage(...keys) {
  keys.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); //0223 vivian新增
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(() => getStorage("token"));

  // 每次 token 變動時，呼叫 API 驗證身分並還原 user
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsAuthed(true);
      // 這裡可以選擇透過 API 獲取最新的使用者資料
    }
    setIsLoading(false); //0223 vivian新增
  }, []);

  const login = (userData, accessToken, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("token", accessToken);
    storage.setItem("userId", String(userData.id));
    storage.setItem("userName", userData.name || "");
    storage.setItem("userRole", userData.role || "user");

    setToken(accessToken); // 觸發 useEffect 重新驗證
    setUser(userData);
  };

  const logout = async () => {
    const userId = getStorage("userId");
    const currentToken = getStorage("token");

    if (userId && currentToken) {
      try {
        await axios.patch(
          `${API_BASE_URL}/users/${userId}`,
          {
            isLoggedIn: false,
            updatedAt: new Date().toISOString(),
          },
          { headers: { Authorization: `Bearer ${currentToken}` } },
        );
      } catch (err) {
        console.error("登出狀態同步失敗：", err);
      }
    }

    clearStorage("token", "userId", "userName", "userRole");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
