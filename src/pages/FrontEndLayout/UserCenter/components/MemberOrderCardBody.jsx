import "../OrderLists.scss";

/**
 * MemberOrderCardBody
 *
 * Props:
 * - subscriptions    {array}    order.subscriptions 陣列
 * - order            {object}   完整訂單資料（含 month / orderDate）
 * - isCancelling     {boolean}  是否進入取消流程
 * - selectedItems    {array}    勾選的 subscriptionId 陣列
 * - onToggleItem     {function} (subscriptionId) => void
 * - onStartCancel    {function} () => void
 * - onConfirmCancel  {function} () => void
 * - onResubscribe    {function} () => void
 */
export default function MemberOrderCardBody({
  subscriptions = [],
  isCancelling,
  selectedItems = [],
  onToggleItem,
  onStartCancel,
  onConfirmCancel,
  onResubscribe,
}) {
  // ── helpers ───────────────────────────────────────────────────

  // 將 sub.content 組成可讀的品項文字
  // JSON 結構：{ snacks:[{qty}], toys:[{qty}], household:[{qty}] }
  // 範例輸出：「玩具 x2・居家用品 x2」
  const formatContent = (content) => {
    if (!content) return null;
    const parts = [];
    const snackQty =
      content.snacks?.reduce((sum, s) => sum + (s.qty ?? 1), 0) ?? 0;
    const toyQty = content.toys?.reduce((sum, t) => sum + (t.qty ?? 1), 0) ?? 0;
    const homeQty =
      content.household?.reduce((sum, h) => sum + (h.qty ?? 1), 0) ?? 0;
    if (snackQty > 0) parts.push(`零食 x${snackQty}`);
    if (toyQty > 0) parts.push(`玩具 x${toyQty}`);
    if (homeQty > 0) parts.push(`居家用品 x${homeQty}`);
    return parts.length > 0 ? parts.join("・") : null;
  };

  // ── 狀態判斷 ──────────────────────────────────────────────────
  const allCancelled =
    subscriptions.length > 0 &&
    subscriptions.every((s) => s.subscriptionStatus === "已取消");

  const allCompleted =
    subscriptions.length > 0 &&
    subscriptions.every((s) => s.subscriptionStatus === "已完成");

  // ── render ────────────────────────────────────────────────────
  return (
    <div className="subscription-card-body">
      {/* 子標題列 — 欄位結構與 row 完全一致 */}
      <div className="subscription-card-body__subheader">
        <div className="subscription-card-body__col subscription-card-body__col--checkbox" />
        <div className="subscription-card-body__col subscription-card-body__col--plan">
          品項
        </div>
        <div className="subscription-card-body__col subscription-card-body__col--desktop-only subscription-card-body__col--header-label">
          單價
        </div>
        <div className="subscription-card-body__col subscription-card-body__col--desktop-only subscription-card-body__col--header-label">
          數量
        </div>
        <div className="subscription-card-body__col subscription-card-body__col--desktop-only subscription-card-body__col--header-label subscription-card-body__col--subtotal">
          小計
        </div>
      </div>

      {/* 訂閱品項列表 */}
      {subscriptions.map((sub) => {
        const isCancelled = sub.subscriptionStatus === "已取消";
        const contentLabel = formatContent(sub.content);
        const subtotal = (sub.planPrice ?? 0) * (sub.planQty ?? 1);

        return (
          <div
            key={sub.subscriptionId}
            className={`subscription-card-body__row ${isCancelled ? "subscription-card-body__row--cancelled" : ""}`}
          >
            {/* checkbox 佔位 / 勾選框 */}
            <div className="subscription-card-body__col subscription-card-body__col--checkbox">
              {isCancelling && !isCancelled && (
                <input
                  type="checkbox"
                  className="subscription-card-body__checkbox"
                  checked={selectedItems.includes(sub.subscriptionId)}
                  onChange={() => onToggleItem?.(sub.subscriptionId)}
                />
              )}
            </div>

            {/* 方案名稱 + 品項備註 */}
            <div className="subscription-card-body__col subscription-card-body__col--plan">
              <div className="subscription-card-body__plan-name">
                {sub.planName}
              </div>
              {contentLabel && (
                <div className="subscription-card-body__plan-meta">
                  {contentLabel}
                </div>
              )}
            </div>

            {/* 桌機：單價 / 數量 / 小計 橫排 */}
            <div className="subscription-card-body__col subscription-card-body__col--desktop-only">
              ${sub.planPrice?.toLocaleString() ?? "-"}
            </div>
            <div className="subscription-card-body__col subscription-card-body__col--desktop-only">
              {sub.planQty ?? "-"}
            </div>
            <div className="subscription-card-body__col subscription-card-body__col--subtotal subscription-card-body__col--desktop-only">
              ${subtotal.toLocaleString()}
            </div>

            {/* 手機：單價 / 數量 / 總價 直排 */}
            <div className="subscription-card-body__mobile-prices">
              <div className="subscription-card-body__mobile-price-row">
                <span className="subscription-card-body__mobile-label">
                  單價
                </span>
                <span>${sub.planPrice?.toLocaleString() ?? "-"}</span>
              </div>
              <div className="subscription-card-body__mobile-price-row">
                <span className="subscription-card-body__mobile-label">
                  數量
                </span>
                <span>{sub.planQty ?? "-"}</span>
              </div>
              <div className="subscription-card-body__mobile-price-row">
                <span className="subscription-card-body__mobile-label">
                  總價
                </span>
                <span className="subscription-card-body__col--subtotal">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* 操作按鈕 */}
      <div className="subscription-card-body__actions">
        {!isCancelling ? (
          <>
            <button
              className="subscription-card-body__btn subscription-card-body__btn--outline"
              onClick={() => {
                if (!allCompleted && !allCancelled) onStartCancel?.();
              }}
              disabled={allCompleted || allCancelled}
              title={
                allCancelled
                  ? "所有訂閱項目皆已取消"
                  : allCompleted
                    ? "所有訂閱項目皆已完成，無法取消"
                    : ""
              }
            >
              取消訂閱
            </button>

            <button
              className="subscription-card-body__btn subscription-card-body__btn--primary"
              onClick={() => {
                if (allCancelled) return;
                if (window.confirm("確定要再次訂閱嗎？")) onResubscribe?.();
              }}
              disabled={allCancelled}
              title={allCancelled ? "所有訂閱項目皆已取消，無法再次訂閱" : ""}
            >
              再次訂閱
            </button>
          </>
        ) : (
          <>
            <button
              className="subscription-card-body__btn subscription-card-body__btn--ghost"
              onClick={() => onToggleItem?.("__cancel_mode_exit__")}
            >
              返回
            </button>

            <button
              className="subscription-card-body__btn subscription-card-body__btn--primary subscription-card-body__btn--wide"
              onClick={() => {
                if (window.confirm("確定要取消所選的訂閱項目嗎？"))
                  onConfirmCancel?.();
              }}
              disabled={selectedItems.length === 0}
            >
              確認取消
            </button>
          </>
        )}
      </div>
    </div>
  );
}
