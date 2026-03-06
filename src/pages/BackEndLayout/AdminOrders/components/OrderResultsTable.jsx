import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { formatYMD } from "../../utils/date";
import {
  getBuyerName,
  getOrderAmount,
  getOrderDate,
  getOrderNo,
  getPaymentStatusLabel,
  getResolvedOrderStatus,
  getOrderStatusLabel,
} from "../../utils/orderMeta";

export default function OrderResultsTable({
  loading,
  orders,
  hasNoData,
  onEdit,
  onCancel,
  onRestore,
}) {
  return (
    <section className="admin-pages__results">
      <div className="admin-pages__panel">
        <div className="table-responsive admin-pages__tableWrap">
          <table className="table admin-pages__table align-middle mb-0">

            <thead>
              <tr className="small">
                <th className="text-center text-nowrap"></th>
                <th className="text-center text-nowrap">訂閱編號</th>
                <th className="text-center text-nowrap">客戶名稱</th>
                <th className="text-center text-nowrap">付款狀態</th>
                <th className="text-center text-nowrap">訂單狀態</th>
                <th className="text-center text-nowrap">總額</th>
                <th className="text-center text-nowrap">訂單日期</th>
                <th className="text-center text-nowrap">更新日</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    載入中…
                  </td>
                </tr>
              )}

              {!loading && hasNoData && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    尚無資料
                  </td>
                </tr>
              )}

              {!loading &&
                !hasNoData &&
                orders.map((o) => {
                  const isDeleted = Boolean(o?.deletedAt);
                  const resolvedOrderStatus = getResolvedOrderStatus(o);
                  const statusLabel = getOrderStatusLabel(resolvedOrderStatus);
                  const dotVariant =
                    getOrderStatusDotVariant(resolvedOrderStatus);

                  return (
                    <tr key={o.id}>
                      <td className="text-center admin-pages__tdActions">
                        {!isDeleted ? (
                          <div className="d-flex justify-content-center gap-2 flex-nowrap admin-pages__actions">
                            <button
                              type="button"
                              className="btn btn-sm btn-bg-edit"
                              onClick={() => onEdit(o)}
                            >
                              <Pencil size={14} className="me-1" />
                              編輯
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-bg-delete"
                              onClick={() => onCancel(o)}
                            >
                              <Trash2 size={14} className="me-1" />
                              取消
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success admin-pages__restoreBtn"
                            onClick={() => onRestore(o)}
                          >
                            <RotateCcw size={14} className="me-1" />
                            <span className="admin-pages__btnText">復原</span>
                          </button>
                        )}
                      </td>

                      <td className="text-center text-nowrap">
                        {getOrderNo(o)}
                      </td>
                      <td className="text-center text-nowrap">
                        {getBuyerName(o)}
                      </td>
                      <td className="text-center text-nowrap">
                        {getPaymentStatusLabel(o?.paymentStatus)}
                      </td>

                      <td className="text-center text-nowrap">
                        <span className="d-inline-flex align-items-center gap-2">
                          <Dot variant={dotVariant} />
                          <span>{statusLabel}</span>
                        </span>
                      </td>

                      <td className="text-end text-nowrap">
                        $ {formatMoney(getOrderAmount(o))}
                      </td>
                      <td className="text-center text-nowrap text-muted">
                        {formatYMD(getOrderDate(o))}
                      </td>
                      <td className="text-center text-nowrap text-muted">
                        {formatYMD(o?.updatedAt)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function formatMoney(val) {
  const num = Number(val);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString();
}

function Dot({ variant = "warning" }) {
  return <span className={`ad-dot ad-dot--${variant}`} aria-hidden />;
}

function getOrderStatusDotVariant(status) {
  switch (status) {
    case "已完成":
      return "success";
    case "已出貨":
      return "info";
    case "處理中":
      return "primary";
    case "已取消":
      return "danger";
    case "待確認":
      return "warning";
    default:
      return "secondary";
  }
}
