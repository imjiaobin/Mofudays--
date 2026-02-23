// 後續要增加到 db.json 的資料
// 付款狀態
export const PAYMENT_STATUS_OPTIONS = [
  { value: "待付款", label: "待付款" },
  { value: "已付款", label: "已付款" },
  { value: "付款失敗", label: "付款失敗" },
  { value: "退款中", label: "退款中" },
  { value: "已退款", label: "已退款" },
];

// 訂單狀態
export const ORDER_STATUS_OPTIONS = [
  { value: "待確認", label: "待確認" },
  { value: "處理中", label: "處理中" },
  { value: "已出貨", label: "已出貨" },
  { value: "已完成", label: "已完成" },
  { value: "已取消", label: "已取消" },
];

// 每期訂閱狀態
export const SUBSCRIPTION_STATUS_OPTIONS = [
  { value: "訂閱中", label: "訂閱中" },
  { value: "已暫停", label: "已暫停" },
  { value: "已取消", label: "已取消" },
  { value: "已完成", label: "已完成" },
];

// 幣值
export const CURRENCY_OPTIONS = [
  { value: "TWD", label: "TWD" },
  { value: "USD", label: "USD" },
];

const toMap = (arr) => Object.fromEntries(arr.map((x) => [x.value, x.label]));
const PAYMENT_STATUS_MAP = toMap(PAYMENT_STATUS_OPTIONS);
const ORDER_STATUS_MAP = toMap(ORDER_STATUS_OPTIONS);
const SUBSCRIPTION_STATUS_MAP = toMap(SUBSCRIPTION_STATUS_OPTIONS);
const CURRENCY_MAP = toMap(CURRENCY_OPTIONS);

export const getPaymentStatusLabel = (v) => PAYMENT_STATUS_MAP[v] ?? v ?? "—";
export const getOrderStatusLabel = (v) => ORDER_STATUS_MAP[v] ?? v ?? "—";
export const getSubscriptionStatusLabel = (v) => SUBSCRIPTION_STATUS_MAP[v] ?? v ?? "—";
export const getCurrencyLabel = (v) => CURRENCY_MAP[v] ?? v ?? "—";

// 由於資料結構的關係, 因此增加 function 做取用
export function getOrderNo(order) {
  return order?.orderNo || order?.id || "—";
}

export function getBuyerName(order) {
  if (order?.buyerInfo?.name) return order.buyerInfo.name;
  const buyer = String(order?.buyer ?? "");
  const match = buyer.match(/^(.*?)\s*\(/);
  return match?.[1]?.trim() || buyer || "—";
}

export function getBuyerEmail(order) {
  if (order?.buyerInfo?.email) return order.buyerInfo.email;
  const buyer = String(order?.buyer ?? "");
  const match = buyer.match(/\(([^)]+)\)/);
  return match?.[1]?.trim() || "—";
}

export function composeBuyerText(buyerInfo = {}) {
  const name = String(buyerInfo?.name ?? "").trim();
  const email = String(buyerInfo?.email ?? "").trim();
  if (name && email) return `${name} (${email})`;
  return name || email || "";
}

export function getOrderDate(order) {
  return order?.orderDate || order?.createdAt || "";
}

export function getOrderAmount(order) {
  const n = Number(order?.orderTotalAmount ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function getTermCycles(order) {
  const n = Number(order?.termCycles ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function getPerCycleAmount(order) {
  const n = Number(order?.perCycleAmount ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function getMainSubscription(order) {
  return Array.isArray(order?.subscriptions) && order.subscriptions.length > 0
    ? order.subscriptions[0]
    : null;
}

export function getShippingStatus(order) {
  if (order?.shippingStatus) return order.shippingStatus;
  return getMainSubscription(order)?.shippingStatus ?? "—";
}

export function getSubscriptionStatus(order) {
  if (order?.subscriptionStatus) return order.subscriptionStatus;
  return getMainSubscription(order)?.subscriptionStatus ?? "—";
}

export function getResolvedOrderStatus(order) {
  if (order?.deletedAt || order?.isActive === false) return "已取消";

  if (order?.orderStatus) return order.orderStatus;

  const paymentStatus = order?.paymentStatus;
  const shippingStatus = getShippingStatus(order);

  if (String(shippingStatus).includes("已出貨")) return "已出貨";
  if (paymentStatus === "已付款") return "處理中";
  return "待確認";
}

export function resolveIsActive(order) {
  return order?.isActive !== false;
}

export function canTransitionOrderStatus(prevStatus, nextStatus) {
  if (!prevStatus || !nextStatus) return true;
  if (prevStatus === nextStatus) return true;

  if (prevStatus === "已完成" || prevStatus === "已取消") {
    return false;
  }

  if (prevStatus === "已出貨" && nextStatus === "待確認") {
    return false;
  }

  return true;
}