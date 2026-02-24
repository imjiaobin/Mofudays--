/**
 * 根據訂單內的 subscriptions 陣列推導訂單狀態
 *
 * 規則：
 * - 全部 subscriptionStatus === "已取消" → "已取消"
 * - 部分 subscriptionStatus === "已取消"  → "部分取消"
 * - 全部 subscriptionStatus === "訂閱中"  → "進行中"
 * - 其餘（如已完成）                      → "已完成"
 */
export const deriveOrderStatus = (subscriptions = []) => {
  if (!subscriptions.length) return "已完成";

  const total = subscriptions.length;
  const cancelledCount = subscriptions.filter(
    (s) => s.subscriptionStatus === "已取消",
  ).length;

  if (cancelledCount === total) return "已取消";
  if (cancelledCount > 0) return "部分取消";

  const allActive = subscriptions.every(
    (s) => s.subscriptionStatus === "訂閱中",
  );
  if (allActive) return "進行中";

  return "已完成";
};

/**
 * 將 deriveOrderStatus 的結果對應到 statusType（用於 className）
 */
export const getStatusType = (statusLabel) => {
  const map = {
    已取消: "cancelled",
    部分取消: "partial",
    進行中: "processing",
    已完成: "completed",
  };
  return map[statusLabel] ?? "completed";
};

/**
 * Tab 篩選邏輯
 * activeTab "all" 回傳全部，其餘比對 deriveOrderStatus 結果
 */
export const filterOrdersByTab = (orders, activeTab) => {
  if (activeTab === "all") return orders;
  const statusMap = {
    completed: "已完成",
    processing: "進行中",
    cancelled: "已取消",
    partial: "部分取消",
  };
  return orders.filter(
    (order) => deriveOrderStatus(order.subscriptions) === statusMap[activeTab],
  );
};

/**
 * 組裝「再次訂閱」要帶去 /cart 的資料
 * 過濾掉 subscriptionStatus === "已取消" 的項目
 */
export const buildResubscribePayload = (order) => {
  const activeSubscriptions = order.subscriptions.filter(
    (s) => s.subscriptionStatus !== "已取消",
  );
  return {
    orderId: order.id,
    month: order.month, // ✅ 修正：perCycleAmount → month（API 無 perCycleAmount）
    subscriptions: activeSubscriptions.map((s) => ({
      subscriptionId: s.subscriptionId,
      planName: s.planName, // ✅ 修正：subscriptionPlan → planName
      planPrice: s.planPrice, // ✅ 修正：新增 planPrice
      planQty: s.planQty, // ✅ 修正：subscriptionQuantity → planQty
      content: s.content, // ✅ 修正：planContent → content
    })),
  };
};
