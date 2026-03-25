import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { getOrderStatusDotVariant } from "../../utils/dotVariant";
import { formatDate } from "../../utils/date";
import { formatMoney } from "../../utils/money";
import Dot from "../../components/Dots";
import { usePagination } from "../../hooks/usePagination";
import PaginationBar from "../../PaginationBar";

function getOrderPlanText(order) {
  if (!Array.isArray(order.subscriptions) || order.subscriptions.length === 0) {
    return "-";
  }
  return order.subscriptions.map((p) => p.planName).join(" / ");
}

function getOrderQty(order) {
  if (!Array.isArray(order.subscriptions)) return 0;
  return order.subscriptions.reduce(
    (sum, p) => sum + Number(p.planQty || 0),
    0,
  );
}

function getOrderStatus(order) {
  // 後台編輯過有 orderStatus 就優先顯示
  // 沒有的話看 subscriptions 裡的 subscriptionStatus
  // 全部已取消 → 已取消，否則取第一筆的 subscriptionStatus
  if (order.orderStatus) return order.orderStatus;

  const subs = order.subscriptions ?? [];
  if (subs.length === 0) return "待處理";

  const allCancelled = subs.every((s) => s.subscriptionStatus === "已取消");
  if (allCancelled) return "已取消";

  return subs[0].subscriptionStatus ?? "待處理";
}

export default function LatestOrders({ loading, latestOrders = [], onEdit }) {
  const [open, setOpen] = useState(true);
  const collapseId = useId();

  const orders = Array.isArray(latestOrders) ? latestOrders : [];

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems,
    pageItems,
    rangeText,
  } = usePagination(orders, {
    initialPageSize: 10,
    resetDeps: [orders.length],
  });

  return (
    <section className="card shadow-sm border-0 rounded-4 mb-3 ad-card">
      <div className="card-body pb-0 pt-2">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-link p-0 ad-collapseBtn"
              aria-label={open ? "收合" : "展開"}
              aria-expanded={open}
              aria-controls={collapseId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <div className="fw-bolder">最新訂單資料</div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link className="ad-link" to="/admin/orders">
              查看所有訂單
            </Link>
          </div>
        </div>

        <div
          id={collapseId}
          className={`ad-collapse ${open ? "" : "is-closed"}`}
        >
          <div className="ad-collapse__inner">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 ad-table">
                <thead>
                  <tr className="small text-secondary">
                    <th>訂單編號</th>
                    <th>訂單日期</th>
                    <th>訂購方案</th>
                    <th className="text-end">訂購數量</th>
                    <th className="text-end">總費金額</th>
                    <th>訂單狀態</th>
                    <th>訂購人</th>
                    <th className="text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="text-center py-4">
                        資料載入中...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-4 text-secondary"
                      >
                        目前沒有訂單資料
                      </td>
                    </tr>
                  ) : (
                    pagedItems.map((o) => {
                      const status = getOrderStatus(o);
                      return (
                        <tr key={o.id}>
                          <td>
                            <a
                              className="ad-link fw-bold"
                              href="#order"
                              onClick={(e) => e.preventDefault()}
                            >
                              {o.id}
                            </a>
                          </td>
                          <td>{formatDate(o.orderDate)}</td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: 260 }}
                          >
                            {getOrderPlanText(o)}
                          </td>
                          <td className="text-end">{getOrderQty(o)}</td>
                          <td className="text-end">
                            {formatMoney(o.orderTotalAmount)}
                          </td>
                          <td>
                            <Dot variant={getOrderStatusDotVariant(status)} />
                            <span className="ms-2">{status}</span>
                          </td>
                          <td>{o.buyerInfo?.name || o.buyer || "-"}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn ad-iconBtn"
                              title="編輯"
                              onClick={() => onEdit?.(o.id)}
                            >
                              <Pencil size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <PaginationBar
              loading={loading}
              totalRows={totalRows}
              rangeText={rangeText}
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              setPageSize={setPageSize}
              setPage={setPage}
              pageItems={pageItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
