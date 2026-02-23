import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getCurrentUserId = () => {
  // 開發期間假裝以王鬢角身分登入，接上 auth 後只剩這一行
  return (
    localStorage.getItem("userId") || "32ad2039-0085-4c22-9483-dbecf01ab18c"
  );
};

// 建立毛孩
export const createDog = async (dogData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dogs`, dogData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "建立毛孩失敗";
  }
};

// 取得某位主人的所有毛孩
export const getDogsByOwnerId = async (ownerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs?ownerId=${ownerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "取得毛孩資料失敗";
  }
};

// 新增到購物車
export const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/carts`, cartData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "加入購物車失敗";
  }
};

// 取得購物車清單
export const getCarts = async (userId) => {
  try {
    const url =
      userId !== undefined
        ? `${API_BASE_URL}/carts?userId=${userId}`
        : `${API_BASE_URL}/carts`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || "取得購物車失敗";
  }
};

// 更新整筆購物車（選不同方案時使用）
export const updateCart = async (cartId, cartData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/carts/${cartId}`,
      cartData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "更新購物車失敗";
  }
};

// 刪除購物車項目
export const deleteCart = async (cartId) => {
  try {
    await axios.delete(`${API_BASE_URL}/carts/${cartId}`);
  } catch (error) {
    throw error.response?.data || "刪除失敗";
  }
};

// 更新數量
export const updateCartQty = async (cartId, planQty) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/carts/${cartId}`, {
      planQty,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "更新數量失敗";
  }
};

// 取得所有訂單（用來產生訂單 ID 的流水號）
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "取得訂單失敗";
  }
};

// 建立訂單
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "建立訂單失敗";
  }
};

// 更新期數
export const updateCartCycles = async (cartId, totalCycles) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/carts/${cartId}`, {
      totalCycles,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "更新期數失敗";
  }
};

// 取得單筆訂單
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "取得訂單失敗";
  }
};
