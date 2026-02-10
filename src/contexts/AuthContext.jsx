import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null); // { name, ... }

  // ✅ 登入後：設定 token + 寫入 localStorage
  const login = (newToken, userData) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUser(userData);
  };

  // ✅ 登出：清 token / user
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ 重整頁面仍保持登入狀態：有 token 就去抓 user profile
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;

    setToken(t);

    // 這裡用你的 API 去抓會員資料（示意）
    // axios.get("/api/me", { headers: { Authorization: `Bearer ${t}` } })
    //   .then(res => setUser(res.data))
    //   .catch(() => logout());

    // 👉 如果你暫時還沒 API，可以先用假資料
    if (!user) setUser({ name: "使用者名稱" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthed: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
