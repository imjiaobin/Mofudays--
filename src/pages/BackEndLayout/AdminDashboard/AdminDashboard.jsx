import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../../../styles/AdminStyle/adminDashboard.scss";

import { MessageCircle, Pencil, Info } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

function StatCard({ title, value, unit }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 h-100 ad-card">
      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex align-items-start justify-content-between">
          <div className="small fw-semibold">{title}</div>
          <button
            type="button"
            className="btn btn-link p-0 ad-iconLink"
            aria-label="info"
          >
            <Info size={16} />
          </button>
        </div>
        <div className="d-flex align-items-end gap-2">
          <div className="display-6 fw-bolder ad-orange">{value}</div>
          <div className="fw-semibold pb-2">{unit}</div>
        </div>
      </div>
    </div>
  );
}

function Dot({ variant = "warning" }) {
  return <span className={`ad-dot ad-dot--${variant}`} aria-hidden />;
}

function SoftBadge({ variant, children }) {
  return (
    <span className={`badge rounded-pill ad-badge ad-badge--${variant}`}>
      {children}
    </span>
  );
}

function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDate(value) {
  const d = toDate(value);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

function formatDateTime(value) {
  const d = toDate(value);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("zh-TW")}`;
}

function isToday(value) {
  const d = toDate(value);
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isThisMonth(value) {
  const d = toDate(value);
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth()
  );
}

function sortByDateDesc(list, dateKey) {
  return [...list].sort((a, b) => {
    const aTime = toDate(a?.[dateKey])?.getTime() || 0;
    const bTime = toDate(b?.[dateKey])?.getTime() || 0;
    return bTime - aTime;
  });
}

function getOrderPlanText(order) {
  if (!Array.isArray(order.subscriptionPlans) || order.subscriptionPlans.length === 0) {
    return "-";
  }

  return order.subscriptionPlans
    .map((p) => `${p.name}${p.quantity ? ` x${p.quantity}` : ""}`)
    .join(" / ");
}

function getOrderQty(order) {
  if (!Array.isArray(order.subscriptionPlans)) return 0;
  return order.subscriptionPlans.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0
  );
}

function getOrderStatus(order) {
  return order.paymentStatus || "待處理";
}

function getOrderStatusDotVariant(status) {
  const s = String(status || "");
  if (s.includes("待處理") || s.includes("處理中")) return "warning";
  if (s.includes("已付款") || s.includes("完成")) return "success";
  return "muted";
}

function getShipStatusDotVariant(status) {
  const s = String(status || "");
  if (s.includes("待處理")) return "warning";
  if (s.includes("處理中")) return "orange";
  if (s.includes("已出貨")) return "success";
  if (s.includes("完成")) return "muted";
  return "muted";
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let alive = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const [ordersRes, subscriptionsRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE}/orders`),
          axios.get(`${API_BASE}/subscriptions`),
          axios.get(`${API_BASE}/users`, { params: { role: "user" } }),
        ]);

        if (!alive) return;

        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setSubscriptions(
          Array.isArray(subscriptionsRes.data) ? subscriptionsRes.data : []
        );
        setMembers(Array.isArray(usersRes.data) ? usersRes.data : []);
      } catch (error) {
        console.error("AdminDashboard 載入失敗:", error);
        if (!alive) return;
        setErrorMsg("資料載入失敗，請稍後再試");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      alive = false;
    };
  }, []);

  /* 最新資料 */
  const latestOrders = useMemo(() => {
    return sortByDateDesc(orders, "orderDate").slice(0, 5);
  }, [orders]);

  const latestSubs = useMemo(() => {
    return sortByDateDesc(subscriptions, "createdAt").slice(0, 5);
  }, [subscriptions]);

  const latestMembers = useMemo(() => {
    return sortByDateDesc(members, "createdAt").slice(0, 5);
  }, [members]);

  /*  統計卡*/
  const stats = useMemo(() => {
    // 本日訂單數：用 orders.orderDate
    const todayOrders = orders.filter((o) => isToday(o.orderDate)).length;

    // 代處理訂單數：
    // 你的 orders 沒有 orderStatus，這裡先用 subscriptions.shippingStatus 估算「待處理中的訂單/訂閱」
    const pendingOrders = subscriptions.filter((s) => {
      const status = String(s.shippingStatus || "");
      return status.includes("待") || status.includes("處理中");
    }).length;

    // 本月新增會員：users(role=user).createdAt
    const monthNewMembers = members.filter((m) => isThisMonth(m.createdAt)).length;

    return {
      todayOrders,
      pendingOrders,
      monthNewMembers,
    };
  }, [orders, subscriptions, members]);

  return (
    <div className="ad-main__inner ad-dashboard-page">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 fw-bolder m-0">數據總覽</h2>
      </div>

      {errorMsg && (
        <div className="alert alert-warning rounded-4 border-0 mb-3" role="alert">
          {errorMsg}
        </div>
      )}

      {/* 統計卡 */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-4">
          <StatCard title="本日訂單數" value={stats.todayOrders} unit="筆" />
        </div>
        <div className="col-12 col-lg-4">
          <StatCard title="代處理訂單數" value={stats.pendingOrders} unit="筆" />
        </div>
        <div className="col-12 col-lg-4">
          <StatCard title="本月新增會員" value={stats.monthNewMembers} unit="名" />
        </div>
      </div>

      {/* 最新訂單資料 */}
      <section className="card shadow-sm border-0 rounded-4 mb-3 ad-card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="fw-bolder">最新訂單資料</div>
            <a
              className="ad-link"
              href="#all-orders"
              onClick={(e) => e.preventDefault()}
            >
              查看所有訂單
            </a>
          </div>

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
                  <th className="text-end">操作</th>
                </tr>
              </thead>
              <tbody className="small">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-secondary">
                      資料載入中...
                    </td>
                  </tr>
                ) : latestOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-secondary">
                      目前沒有訂單資料
                    </td>
                  </tr>
                ) : (
                  latestOrders.map((o) => {
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
                        <td className="text-truncate" style={{ maxWidth: 260 }}>
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
                        <td className="text-end">
                          {/* <button
                            type="button"
                            className="btn border ad-iconBtn me-2"
                            title="留言"
                          >
                            <MessageCircle size={16} />
                          </button> */}
                          <button
                            type="button"
                            className="btn ad-iconBtn"
                            title="編輯"
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
        </div>
      </section>

      {/* 最新訂閱資料 */}
      <section className="card shadow-sm border-0 rounded-4 mb-3 ad-card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="fw-bolder">最新訂閱資料</div>
            <a
              className="ad-link"
              href="#all-subs"
              onClick={(e) => e.preventDefault()}
            >
              查看所有訂閱
            </a>
          </div>

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
                ) : latestSubs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-secondary">
                      目前沒有訂閱資料
                    </td>
                  </tr>
                ) : (
                  latestSubs.map((s) => {
                    const subStatus = s.subscriptionStatus || "-";

                    return (
                      <tr key={s.id}>
                        <td>
                          <a
                            className="ad-link fw-bold"
                            href="#sub"
                            onClick={(e) => e.preventDefault()}
                          >
                            {s.orderId || s.id}
                          </a>
                        </td>
                        <td className="text-truncate" style={{ maxWidth: 260 }}>
                          {s.planName || "-"}
                        </td>
                        <td>{formatDate(s.startDate)}</td>
                        <td className="text-end">{s.subscriptionQuantity ?? 0}</td>
                        <td className="text-end">
                          {`${s.currentCycleIndex ?? 0}/${s.currentCycleTotal ?? s.termCycles ?? 0}`}
                        </td>
                        <td>
                          <Dot variant={getShipStatusDotVariant(s.shippingStatus)} />
                          <span className="ms-2">{s.shippingStatus || "-"}</span>
                        </td>
                        <td>{s.shippedDate ? formatDate(s.shippedDate) : "-"}</td>
                        <td>
                          {s.nextShippedDate ? formatDate(s.nextShippedDate) : "-"}
                        </td>
                        <td className=" text-end">
                          {subStatus === "訂閱中" ? (
                            <SoftBadge variant="orange"> <span className="text-primary">訂閱中</span></SoftBadge>
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
        </div>
      </section>

      {/* 最新會員資料 */}
      <section className="card shadow-sm border-0 rounded-4 ad-card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="fw-bolder">最新會員資料</div>
            <a
              className="ad-link"
              href="#all-members"
              onClick={(e) => e.preventDefault()}
            >
              查看所有會員
            </a>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 ad-table">
              <thead>
                <tr className="small text-secondary">
                  <th>會員編號</th>
                  <th>姓名</th>
                  <th>生日</th>
                  <th>聯絡電話</th>
                  <th>Email</th>
                  <th>地址</th>
                  <th>註冊時間</th>
                  <th className="text-end">操作</th>
                </tr>
              </thead>
              <tbody className="small">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-secondary">
                      資料載入中...
                    </td>
                  </tr>
                ) : latestMembers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-secondary">
                      目前沒有會員資料
                    </td>
                  </tr>
                ) : (
                  latestMembers.map((m) => (
                    <tr key={m.id}>
                      <td
                        className="ad-orange fw-bold text-truncate"
                        style={{ maxWidth: 180 }}
                        title={m.id}
                      >
                        {m.id}
                      </td>
                      <td>{m.name || "-"}</td>
                      <td>{m.birthday ? formatDate(m.birthday) : "-"}</td>
                      <td>{m.phone || "-"}</td>
                      <td className="text-truncate" style={{ maxWidth: 220 }}>
                        {m.email || "-"}
                      </td>
                      <td className="text-truncate" style={{ maxWidth: 280 }}>
                        {m.address || "-"}
                      </td>
                      <td>{m.createdAt ? formatDateTime(m.createdAt) : "-"}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn ad-iconBtn"
                          title="編輯"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}