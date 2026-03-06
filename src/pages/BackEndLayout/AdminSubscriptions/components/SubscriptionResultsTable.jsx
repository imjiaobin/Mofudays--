import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { formatYMD } from "../../utils/date";
import {
  getCycleText,
  getPlanName,
  getResolvedSubscriptionStatus,
  getSubscriptionId,
} from "../../utils/subscriptionMeta";
import { getSubscriptionStatusDotVariant } from "../../utils/dotVariant";

export default function SubscriptionResultsTable({
  loading,
  subscriptions,
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
                <th className="text-center text-nowrap">
                  
                </th>
                <th className="text-center text-nowrap">訂閱編號</th>
                <th className="text-center text-nowrap">訂單編號</th>
                <th className="text-center text-nowrap">方案名稱</th>
                <th className="text-center text-nowrap">數量</th>
                <th className="text-center text-nowrap">目前期數</th>
                <th className="text-center text-nowrap">出貨狀態</th>
                <th className="text-center text-nowrap">訂閱狀態</th>
                <th className="text-center text-nowrap">開始日</th>
                <th className="text-center text-nowrap">更新日</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-muted">
                    載入中…
                  </td>
                </tr>
              )}

              {!loading && hasNoData && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-muted">
                    尚無資料
                  </td>
                </tr>
              )}

              {!loading &&
                !hasNoData &&
                subscriptions.map((sub) => {
                  const isDeleted = Boolean(sub?.deletedAt) || sub?.isActive === false;
                  const resolvedStatus = getResolvedSubscriptionStatus(sub);
                  const dotVariant = getSubscriptionStatusDotVariant(resolvedStatus);

                  return (
                    <tr key={sub.id}>
                      <td className="text-center text-nowrap">
                        {!isDeleted ? (
                          <div className="d-flex justify-content-center gap-2 ">
                            <button
                              type="button"
                              className="btn btn-sm btn-bg-edit"
                              onClick={() => onEdit(sub)}
                            >
                              <Pencil size={14} className="me-1" />
                              編輯
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-bg-delete"
                              onClick={() => onCancel(sub)}
                            >
                              <Trash2 size={14} className="me-1" />
                              取消
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => onRestore(sub)}
                          >
                            <RotateCcw size={14} className="me-1" />
                            復原
                          </button>
                        )}
                      </td>

                      <td className="text-center text-nowrap">{getSubscriptionId(sub)}</td>
                      <td className="text-center text-nowrap">{sub.orderId || "—"}</td>
                      <td className="text-center text-nowrap fw-semibold">
                        {getPlanName(sub)}
                      </td>
                      <td className="text-center text-nowrap">
                        {sub.subscriptionQuantity ?? "—"}
                      </td>
                      <td className="text-center text-nowrap">{getCycleText(sub)}</td>
                      <td className="text-center text-nowrap">
                        {sub.shippingStatus || "—"}
                      </td>
                      <td className="text-center text-nowrap">
                        <span className="d-inline-flex align-items-center gap-2">
                          <Dot variant={dotVariant} />
                          <span>{resolvedStatus}</span>
                        </span>
                      </td>
                      <td className="text-center text-nowrap text-muted">
                        {formatYMD(sub.startDate)}
                      </td>
                      <td className="text-center text-nowrap text-muted">
                        {formatYMD(sub.updatedAt)}
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

function Dot({ variant = "warning" }) {
  return <span className={`ad-dot ad-dot--${variant}`} aria-hidden />;
}