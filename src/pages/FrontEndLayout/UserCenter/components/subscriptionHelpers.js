/**
 * 根據訂單內的 subscriptions 陣列推導訂單狀態
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
 */
export const filterOrdersByTab = (orders, activeTab) => {
  if (activeTab === "all") return orders;
  const statusMap = {
    completed: "已完成",
    processing: "進行中",
    cancelled: "已取消",
    partial: "部分取消",
  };
  return orders.filter((order) => {
    const status = order.derivedStatus ?? deriveOrderStatus(order.subscriptions);
    return status === statusMap[activeTab];
  });
};
