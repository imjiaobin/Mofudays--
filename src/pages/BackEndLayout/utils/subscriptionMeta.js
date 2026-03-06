export const SUBSCRIPTION_STATUS_OPTIONS = [
  { value: "訂閱中", label: "訂閱中" },
  { value: "暫停中", label: "暫停中" },
  { value: "已完成", label: "已完成" },
  { value: "已取消", label: "已取消" },
];

export function getSubscriptionId(subscription) {
  return subscription?.id ?? "—";
}

export function getPlanName(subscription) {
  return subscription?.planName ?? "—";
}

export function getResolvedSubscriptionStatus(subscription) {
  if (subscription?.deletedAt || subscription?.isActive === false) {
    return "已取消";
  }
  return subscription?.subscriptionStatus ?? "訂閱中";
}


export function getCycleText(subscription) {
  const current = subscription?.currentCycleIndex ?? "—";
  const total =
    subscription?.currentCycleTotal ?? subscription?.termCycles ?? "—";
  return `${current} / ${total}`;
}