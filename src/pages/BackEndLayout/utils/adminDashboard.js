/* 
    功能: 處理AdminDashboard資料的格式和狀態
    最新更新時間: 2025/03/05
    更新內容: 整理後台管理系統首頁之資料處理function
*/

export function getOrderPlanText(order) {
  if (!Array.isArray(order.subscriptionPlans) || order.subscriptionPlans.length === 0) {
    return "-";
  }

  return order.subscriptionPlans
    .map((p) => `${p.name}${p.quantity ? ` x${p.quantity}` : ""}`)
    .join(" / ");
}

export function getOrderQty(order) {
  if (!Array.isArray(order.subscriptionPlans)) return 0;
  return order.subscriptionPlans.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0
  );
}

export function getOrderStatus(order) {
  return order.paymentStatus || "待處理";
}

