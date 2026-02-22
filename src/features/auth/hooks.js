import { useState, useEffect } from "react";
import { getUserProfile } from "../../api/userApi"; // 確保路徑正確

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // 1. 如果完全沒有 Token，直接結束讀取狀態，並確保 user 是 null
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // 2. 有 Token，呼叫 API 驗證身分
      try {
        const userData = await getUserProfile();

        if (userData) {
          // 驗證成功：存入使用者資料 (包含 role: "admin" 或 "user")
          setUser(userData);
        } else {
          // 驗證失敗：API 回傳 null (可能是 Token 過期或資料被刪除)
          // 清除所有相關資訊，強制登出
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth Hook 驗證發生非預期錯誤:", error);
        // 發生錯誤時也視為登入無效，保護路由
        setUser(null);
      } finally {
        // 無論成功或失敗，最後都要關閉 Loading 狀態
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token]); // 當 token 改變時（例如登入或登出），重新執行驗證

  return {
    isAuthed: !!token, // 這裡反應最新的 token 狀態
    user, // 這裡反應最新的會員資料 (含權限)
    isLoading, // 路由守衛會根據這個來決定是否顯示「載入中」
    token,
  };
};
