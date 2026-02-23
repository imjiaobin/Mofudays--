import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleProtectedError = (error, fallbackValue = null) => {
  const errorMsg = error.response?.data;
  if (
    typeof errorMsg === "string" &&
    errorMsg.includes("reference to the owner id")
  ) {
    console.warn("API 攔截：資料庫中找不到對應 userId 的資料，回傳預設值。");
    return fallbackValue;
  }
  if (error.response?.status === 401) {
    console.error("Token 失效，請重新登入");
  }
  throw error;
};

/**
 * 取得當前登入會員的所有訂單（含內嵌的 subscriptions）
 * GET /600/orders?userId=:userId
 */
export const getUserOrders = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(
      `${API_BASE_URL}/600/orders?userId=${userId}`,
      { headers: getAuthHeader() },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};

/**
 * 取消訂單內的指定 subscriptions
 * PATCH /600/orders/:orderId
 * 將選取的 subscriptionId 對應的 subscriptionStatus 改為「已取消」
 */
export const cancelSubscriptions = async (orderId, subscriptionIdsToCancel) => {
  try {
    // 先取得該筆訂單完整資料
    const orderRes = await axios.get(`${API_BASE_URL}/600/orders/${orderId}`, {
      headers: getAuthHeader(),
    });
    const order = orderRes.data;

    // 更新 subscriptions 陣列中指定項目的 subscriptionStatus
    const updatedSubscriptions = order.subscriptions.map((sub) =>
      subscriptionIdsToCancel.includes(sub.subscriptionId)
        ? { ...sub, subscriptionStatus: "已取消" }
        : sub,
    );

    const response = await axios.patch(
      `${API_BASE_URL}/600/orders/${orderId}`,
      { subscriptions: updatedSubscriptions },
      { headers: getAuthHeader() },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};
