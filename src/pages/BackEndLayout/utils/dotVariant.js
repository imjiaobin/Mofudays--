/* 
    功能: 表示 訂單/訂閱/出貨狀態用的"圓點"相關function 
    最新更新時間: 2025/03/05
    更新內容: 整理所有後台管理系統之狀態"圓點"相關function
*/

// 訂單狀態
export function getOrderStatusDotVariant(status) {
  const s = String(status || "");
  if (s.includes("待處理") || s.includes("處理中")) return "warning";
  if (s.includes("已付款") || s.includes("完成")) return "success";
  return "muted";
}

// 出貨狀態
export function getShipStatusDotVariant(status) {
  const s = String(status || "");
  if (s.includes("待處理")) return "warning";
  if (s.includes("處理中")) return "orange";
  if (s.includes("已出貨")) return "success";
  if (s.includes("完成")) return "muted";
  return "muted";
}

// 訂閱狀態
export function getSubscriptionStatusDotVariant(status) {
  switch (status) {
    case "已完成":
      return "success";
    case "訂閱中":
      return "primary";
    case "暫停中":
      return "warning";
    case "已取消":
      return "danger";
    default:
      return "secondary";
  }
}