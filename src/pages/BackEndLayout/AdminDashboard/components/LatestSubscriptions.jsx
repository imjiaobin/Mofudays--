import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getShipStatusDotVariant } from "../../utils/dotVariant";
import { formatDate } from "../../utils/date";
import Dot from "../../components/Dots";
import { usePagination } from "../../hooks/usePagination";
import PaginationBar from "../../PaginationBar"; 

export default function LatestSubscriptions({ loading, latestSubs = [] }) {
  const [open, setOpen] = useState(true);
  const collapseId = useId();

  const subs = Array.isArray(latestSubs) ? latestSubs : [];

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
  } = usePagination(subs, {
    initialPageSize: 10,
    resetDeps: [subs.length],
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

            <div className="fw-bolder">最新訂閱資料</div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link className="ad-link" to="/admin/subscriptions">
              查看所有訂閱
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
                    <th>訂購方案</th>
                    <th>訂閱起始日</th>
                    <th className="text-end">訂購數量</th>
                    <th className="text-end">目前期數</th>
                    <th>出貨狀態</th>
                    <th>出貨日</th>
                    <th>下次出貨</th>
                    <th className="text-end">訂閱狀態</th>
                  </tr>
                </thead>

                <tbody className="small">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-secondary">
                        資料載入中...
                      </td>
                    </tr>
                  ) : subs.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-secondary">
                        目前沒有訂閱資料
                      </td>
                    </tr>
                  ) : (
                    pagedItems.map((s) => {
                      const subStatus = s.subscriptionStatus || "-";
                      const orderNo = s.orderId || s.id;

                      return (
                        <tr key={s.id}>
                          <td>
                            <a
                              className="ad-link fw-bold"
                              href="#sub"
                              onClick={(e) => e.preventDefault()}
                            >
                              {orderNo}
                            </a>
                          </td>

                          <td className="text-truncate" style={{ maxWidth: 260 }}>
                            {s.planName || "-"}
                          </td>

                          <td>{formatDate(s.startDate)}</td>

                          <td className="text-end">
                            {s.subscriptionQuantity ?? 0}
                          </td>

                          <td className="text-end">
                            {`${s.currentCycleIndex ?? 0}/${
                              s.currentCycleTotal ?? s.termCycles ?? 0
                            }`}
                          </td>

                          <td>
                            <Dot variant={getShipStatusDotVariant(s.shippingStatus)} />
                            <span className="ms-2">{s.shippingStatus || "-"}</span>
                          </td>

                          <td>{s.shippedDate ? formatDate(s.shippedDate) : "-"}</td>

                          <td>
                            {s.nextShippedDate ? formatDate(s.nextShippedDate) : "-"}
                          </td>

                          <td className="text-end">
                            {subStatus === "訂閱中" ? (
                              <SoftBadge variant="orange">
                                <span className="text-primary">訂閱中</span>
                              </SoftBadge>
                            ) : (
                              <SoftBadge variant="gray">{subStatus}</SoftBadge>
                            )}
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

function SoftBadge({ variant, children }) {
  return (
    <span className={`badge rounded-pill ad-badge ad-badge--${variant}`}>
      {children}
    </span>
  );
}
