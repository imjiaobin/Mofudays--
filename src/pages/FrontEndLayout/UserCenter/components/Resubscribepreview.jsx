import { useEffect, useState } from "react";

/**
 * ResubscribePreview
 * 掛在 /cart route 上（或暫時替換 Cart.jsx）
 * 只負責把 sessionStorage 的 resubscribePayload 渲染出來
 * 不處理任何購物車邏輯
 */
export default function ResubscribePreview() {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("resubscribePayload");
    if (raw) {
      setPayload(JSON.parse(raw));
    }
  }, []);

  if (!payload) {
    return (
      <div className="container mt-5 text-center text-brown">
        <p>沒有再次訂閱資料，請從訂閱管理頁重新操作。</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h4 className="fw-bold mb-4">再次訂閱確認</h4>
      <p className="text-brown mb-1">原訂單編號：#{payload.orderId}</p>
      <p className="text-brown mb-4">
        每期金額：${payload.perCycleAmount?.toLocaleString()}
      </p>

      {/* 訂閱品項列表 */}
      <div className="mb-4">
        {payload.subscriptions.map((sub) => (
          <div
            key={sub.subscriptionId}
            className="d-flex justify-content-between align-items-center py-3 px-4 mb-2 rounded-3"
            style={{ backgroundColor: "#FFF5F0", border: "1px solid #FFE0D0" }}
          >
            <div>
              <p className="fw-bold mb-1">{sub.planName}</p>
              <p className="text-brown mb-0" style={{ fontSize: "14px" }}>
                數量：{sub.subscriptionQuantity} ／ 期數：{sub.termCycles} 個月
              </p>
            </div>
            <p className="fw-bold mb-0">
              $
              {(
                payload.perCycleAmount * sub.subscriptionQuantity
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* 合計 */}
      <div
        className="d-flex justify-content-end align-items-center py-3 px-4 rounded-3"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <p className="fw-bold mb-0">
          每月合計：$
          {payload.subscriptions
            .reduce(
              (acc, sub) =>
                acc + payload.perCycleAmount * (sub.subscriptionQuantity ?? 1),
              0,
            )
            .toLocaleString()}
        </p>
      </div>
    </div>
  );
}
