/**
 * SubscriptionCardBody
 *
 * Props:
 * - subscriptions    {array}    order.subscriptions 陣列（來自 API）
 * - perCycleAmount   {number}   order.perCycleAmount，單一訂閱方案的單價
 * - isCancelling     {boolean}  是否進入取消流程
 * - selectedItems    {array}    勾選的 subscriptionId 陣列
 * - onToggleItem     {function} (subscriptionId) => void
 * - onStartCancel    {function} () => void
 * - onConfirmCancel  {function} () => void
 * - onResubscribe    {function} () => void  → 導向 /cart
 */
export default function SubscriptionCardBody({
  subscriptions = [],
  perCycleAmount,
  isCancelling,
  selectedItems = [],
  onToggleItem,
  onStartCancel,
  onConfirmCancel,
  onResubscribe,
}) {
  // 全部 subscription 都已取消時，禁用「再次訂閱」按鈕
  const allCancelled =
    subscriptions.length > 0 &&
    subscriptions.every((s) => s.subscriptionStatus === "已取消");

  // 全部 subscription 都已完成時，禁用「取消訂閱」按鈕
  const allCompleted =
    subscriptions.length > 0 &&
    subscriptions.every((s) => s.subscriptionStatus === "已完成");

  return (
    <div
      className="subscription-card-body bg-white p-4 shadow-sm w-100"
      style={{
        border: "1px solid #FFE0D0",
        borderTop: "none",
        borderRadius: "0 0 24px 24px",
        marginLeft: 0,
        marginRight: 0,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 欄位標題 */}
      <div className="row text-brown mb-2 border-bottom pb-2 p3">
        <div className="col-6">訂閱方案</div>
        <div className="col text-center">單價/期</div>
        <div className="col text-center">數量</div>
        <div className="col text-center">期數</div>
        <div className="col text-end">狀態</div>
      </div>

      {/* 訂閱品項列表（每個 subscription 為一行） */}
      {subscriptions.map((sub) => {
        const isCancelled = sub.subscriptionStatus === "已取消";
        return (
          <div
            key={sub.subscriptionId}
            className={`row align-items-center py-3 border-bottom border-light ${
              isCancelled ? "opacity-50" : ""
            }`}
          >
            <div className="col-6 d-flex align-items-center">
              {/* 取消模式下：已取消的項目不顯示 checkbox */}
              {isCancelling && !isCancelled && (
                <input
                  type="checkbox"
                  className="form-check-input me-3 custom-checkbox"
                  checked={selectedItems.includes(sub.subscriptionId)}
                  onChange={() => onToggleItem?.(sub.subscriptionId)}
                />
              )}
              <div>
                <div className="fw-bold p2">{sub.subscriptionPlan}</div>
                <div className="p4 text-brown">
                  {sub.startDate} 起 · 第 {sub.currentCycleIndex}/
                  {sub.currentCycleTotal} 期
                </div>
              </div>
            </div>
            <div className="col text-center p2">
              ${perCycleAmount?.toLocaleString() ?? "-"}
            </div>
            <div className="col text-center p2">{sub.subscriptionQuantity}</div>
            <div className="col text-center p2">{sub.termCycles}</div>
            <div
              className="col text-end p2 fw-bold"
              style={{
                color:
                  {
                    已取消: "#F44336",
                    進行中: "#4CAF50",
                    已完成: "#4CAF50",
                  }[sub.subscriptionStatus] ?? "inherit",
              }}
            >
              {sub.subscriptionStatus}
            </div>
          </div>
        );
      })}

      {/* 操作按鈕 */}
      <div className="d-flex justify-content-end mt-4">
        {!isCancelling ? (
          <>
            {/* 取消訂閱：全部已完成時 disabled */}
            <button
              className={`btn rounded-pill px-4 me-3 b3 ${
                allCompleted ? "btn-gray disabled" : "btn-outline-orange"
              }`}
              onClick={() => {
                if (allCompleted || allCancelled) return;
                onStartCancel?.();
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

            {/* 再次訂閱：全部已取消時 disabled */}
            <button
              className={`btn rounded-pill px-4 b3 ${
                allCancelled ? "btn-gray disabled" : "btn-orange text-white"
              }`}
              onClick={() => {
                if (allCancelled) return;
                if (window.confirm("確定要再次訂閱嗎？")) {
                  onResubscribe?.();
                }
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
              className="btn btn-outline-gray rounded-pill px-4 me-3 b3"
              onClick={() => onToggleItem?.("__cancel_mode_exit__")}
            >
              返回
            </button>
            <button
              className={`btn btn-orange text-white rounded-pill px-5 b3 ${
                selectedItems.length === 0 ? "disabled" : ""
              }`}
              onClick={() => {
                if (window.confirm("確定要取消所選的訂閱項目嗎？")) {
                  onConfirmCancel?.();
                }
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
