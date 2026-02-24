import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getUserProfile } from "../api/userApi";
import { toast } from "react-toastify";

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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(() => getStorage("token"));

  useEffect(() => {
    const initAuth = async () => {
      const currentToken = getStorage("token");

      if (!currentToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile();
        if (userData) {
          setUser(userData);
        } else {
          clearStorage("token", "userId", "userName", "userRole");
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth 驗證發生錯誤:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token]);

  const login = (userData, accessToken, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", accessToken);
    storage.setItem("userId", String(userData.id));
    storage.setItem("userName", userData.name || "");
    storage.setItem("userRole", userData.role || "user");
    setToken(accessToken);
    setUser(userData);
  };

  const logout = async () => {
    const userId = getStorage("userId");
    const currentToken = getStorage("token");

    if (userId && currentToken) {
      try {
        await axios.patch(
          `${API_BASE_URL}/users/${userId}`,
          { isLoggedIn: false, updatedAt: new Date().toISOString() },
          { headers: { Authorization: `Bearer ${currentToken}` } },
        );
      } catch (err) {
        console.error("登出狀態同步失敗：", err);
      }
    }

    clearStorage("token", "userId", "userName", "userRole");
    setToken(null);
    setUser(null);

    toast.success("您已成功登出", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthed: !!token && (isLoading || !!user),
        user,
        isLoading,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
