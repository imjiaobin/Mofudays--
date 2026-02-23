import axios from "axios";

// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = import.meta.env.VITE_API_BASE;

// 輔助函式：取得 Auth Header
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 錯誤處理輔助函式：專門對付 json-server-auth 的 owner id 錯誤
const handleProtectedError = (error, fallbackValue = null) => {
  const errorMsg = error.response?.data;

  // 如果是 json-server-auth 特有的權限/資料缺失錯誤
  if (
    typeof errorMsg === "string" &&
    errorMsg.includes("reference to the owner id")
  ) {
    console.warn("API 攔截：資料庫中找不到對應 userId 的資料，回傳預設值。");
    return fallbackValue;
  }

  // 如果是 401 Unauthorized，通常是 Token 過期
  if (error.response?.status === 401) {
    console.error("Token 失效，請重新登入");
    // 這裡可以選擇是否要自動清除 localStorage
  }

  throw error; // 其他錯誤繼續往外丟，讓 UI 決定怎麼辦
};

// 1. 註冊
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "註冊失敗";
  }
};

// 2. 登入
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // 包含 accessToken 和 user 物件
  } catch (error) {
    throw error.response?.data || "登入失敗";
  }
};

// 3. 確認會員登入狀態 (簡易判斷)
export const checkLoginStatus = () => {
  return !!localStorage.getItem("accessToken");
};

// 4. 取得會員詳細資料 (/600)
export const getUserProfile = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/600/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};

// 5. 取得會員訂單資料 (/600)
export const getUserOrders = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/600/orders?userId=${userId}`,
      {
        headers: getAuthHeader(),
      },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};

// 6. 取得會員購物車 (/600)
export const getUserCart = async () => {
  const userId = localStorage.getItem("userId");
  try {
    // 假設你的購物車 table 叫 carts 或 cart
    const response = await axios.get(
      `${API_BASE_URL}/600/carts?userId=${userId}`,
      {
        headers: getAuthHeader(),
      },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};
