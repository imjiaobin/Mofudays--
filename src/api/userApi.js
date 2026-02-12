import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // 請根據你 json-server 跑的 port 修改

// 1. 確認會員登入狀態 (檢查 localStorage 是否有 token)
export const checkLoginStatus = () => {
  const token = localStorage.getItem("accessToken");
  // 簡單判斷：若 token 存在則視為已登入（進階做法會打 API 驗證 token 是否過期）
  return !!token;
};

// 2. 取得會員資料
export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId"); // 登入時通常會存下 userId

  if (!token || !userId) return null;

  try {
    // json-server-auth 預設保護路由為 /660/users/id 或 /users/id
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("取得會員資料失敗:", error);
    return null;
  }
};
