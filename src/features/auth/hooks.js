import { useState, useEffect } from "react";

export const useAuth = () => {
  // 1. 初始化狀態：直接從 localStorage 讀取
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user"); // 假設隊友會把整包 user JSON 存進來
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. 判斷是否已登入
  const isAuthed = !!token;

  // 3. 監聽狀態變化（選配，確保同步）
  useEffect(() => {
    const currentToken = localStorage.getItem("accessToken");
    if (currentToken !== token) {
      setToken(currentToken);
    }
  }, []);

  return {
    isAuthed,
    user,
    token,
  };
};
