import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

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
 * [james新增] 同步根據取消後的結果推算 orderStatus，讓後台欄位一起更新
 */
export const cancelSubscriptions = async (orderId, subscriptionIdsToCancel) => {
  try {
    const orderRes = await axios.get(`${API_BASE_URL}/600/orders/${orderId}`, {
      headers: getAuthHeader(),
    });
    const order = orderRes.data;

    // 更新 subscriptions 的 subscriptionStatus
    const updatedSubscriptions = order.subscriptions.map((sub) =>
      subscriptionIdsToCancel.includes(sub.subscriptionId)
        ? { ...sub, subscriptionStatus: "已取消" }
        : sub,
    );

    // [新增] 根據更新後的 subscriptions 推算後台 orderStatus
    // 全部取消 → 已取消
    // 部分取消 → 處理中（還有進行中的訂閱）
    const total = updatedSubscriptions.length;
    const cancelledCount = updatedSubscriptions.filter(
      (s) => s.subscriptionStatus === "已取消",
    ).length;

    const newOrderStatus = cancelledCount === total ? "已取消" : "處理中";

    const response = await axios.patch(
      `${API_BASE_URL}/600/orders/${orderId}`,
      {
        subscriptions: updatedSubscriptions,
        orderStatus: newOrderStatus, // [james新增] 一併更新後台 orderStatus
      },
      { headers: getAuthHeader() },
    );
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};

/**
 * 取得當前登入會員的所有狗狗資料
 * GET /600/dogs?ownerId=:userId
 */

//後續改成/dogs?ownerId=:userId直接查，600會牽涉userId/ownerId問題所以先不使用
export const getUserDogs = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs?ownerId=${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return handleProtectedError(error, []);
  }
};

/**
 * 將訂閱方案加入購物車
 * POST /600/carts
 *
 * @param {object} sub      - order.subscriptions 中的單一 subscription
 * @param {object} dog      - 使用者選擇的狗狗資料（來自 /dogs）
 * @param {number} month    - order.month，訂閱期數
 */
export const addToCart = async (sub, dog, month) => {
  const userId = localStorage.getItem("userId");
  const now = new Date().toISOString();

  const payload = {
    userId,
    dogId: dog.id,
    planName: sub.planName,
    planPrice: sub.planPrice,
    planQty: sub.planQty,
    totalCycles: month,
    pet: {
      name: dog.name,
      gender: dog.gender,
      size: dog.size,
      allergy: dog.allergies?.join("、") ?? "",
    },
    status: "pending",
    createdAt: now,
    updatedAt: now,
    content: sub.content,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/600/carts`, payload, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return handleProtectedError(error, null);
  }
};
