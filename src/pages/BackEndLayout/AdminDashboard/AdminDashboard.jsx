import { useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import AdminFormModal from "../AdminUsers/components/UserFormModal";
import OrderFormModal from "../AdminOrders/components/OrderFormModal";
import LatestOrders from "./components/LatestOrders";
import LatestSubscriptions from "./components/LatestSubscriptions";
import LatestMembers from "./components/LatestMembers";
import "../../../styles/AdminStyle/adminDashboard.scss";

import { Info, RefreshCw } from "lucide-react";
import { adminToast, getErrorMessage } from "../utils/adminToast";
import {
  getOrderPlanText,
  getOrderQty,
  getOrderStatus,
} from "../utils/adminDashboard";

const API_BASE = import.meta.env.VITE_API_BASE;

const nowISO = () => new Date().toISOString();

const isToday = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const isThisMonth = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  );
};

const sortByDateDesc = (arr, key) =>
  [...arr].sort((a, b) => new Date(b?.[key] ?? 0) - new Date(a?.[key] ?? 0));

// ----------------------------------------

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

function isPendingStatus(raw) {
  const s = String(raw ?? "");
  return s.includes("待") || s.includes("處理中") || s.includes("pending");
}

// ----------------------------------------

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    const [ordersRes, subscriptionsRes, usersRes] = await Promise.all([
      axios.get(`${API_BASE}/orders`),
      axios.get(`${API_BASE}/subscriptions`),
      axios.get(`${API_BASE}/users`, { params: { role: "user" } }),
    ]);
    return {
      orders: Array.isArray(ordersRes.data) ? ordersRes.data : [],
      subscriptions: Array.isArray(subscriptionsRes.data)
        ? subscriptionsRes.data
        : [],
      members: Array.isArray(usersRes.data) ? usersRes.data : [],
    };
  }, []);

  const load = useCallback(
    async (mode = "init") => {
      const isRefresh = mode === "refresh";
      const toastId = isRefresh
        ? adminToast.loading("重新整理儀表板資料中...")
        : null;
      try {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setErrorMsg("");

        const data = await fetchDashboardData();
        setOrders(data.orders);
        setSubscriptions(data.subscriptions);
        setMembers(data.members);

        if (toastId)
          adminToast.update(toastId, {
            type: "success",
            render: "儀表板資料已更新",
          });
      } catch (error) {
        const message = getErrorMessage(error, "資料載入失敗，請稍後再試");
        setErrorMsg(message);
        if (toastId) {
          adminToast.update(toastId, { type: "error", render: message });
        } else {
          adminToast.error(message, { toastId: "dashboard-init-fail" });
        }
      } finally {
        if (isRefresh) setRefreshing(false);
        else setLoading(false);
      }
    },
    [fetchDashboardData],
  );

  useEffect(() => {
    load("init");
  }, [load]);

  const refresh = () => load("refresh");

  /* 最新資料（取前5筆） */
  const latestOrders = useMemo(
    () => sortByDateDesc(orders, "orderDate").slice(0, 5),
    [orders],
  );
  const latestSubs = useMemo(
    () => sortByDateDesc(subscriptions, "createdAt").slice(0, 5),
    [subscriptions],
  );
  const latestMembers = useMemo(
    () => sortByDateDesc(members, "createdAt").slice(0, 5),
    [members],
  );

  /* 統計卡 */
  const stats = useMemo(() => {
    const todayOrders = orders.filter((o) => isToday(o?.orderDate)).length;

    // [james修正] 待處理訂單改為直接看 orderStatus 欄位
    // 原本邏輯判斷欄位不存在（orderStatus / shippingStatus 頂層不一定有值）導致數字不準確
    // 現在統一看 orderStatus，符合後台實際資料格式
    const pendingOrders = orders.filter((o) =>
      isPendingStatus(o?.orderStatus ?? o?.paymentStatus),
    ).length;

    const monthNewMembers = members.filter((m) =>
      isThisMonth(m?.createdAt),
    ).length;
    return { todayOrders, pendingOrders, monthNewMembers };
  }, [orders, members]);

  /* 會員 Modal */
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingMemberData, setEditingMemberData] = useState(null);

  const openMemberEdit = (id) => {
    setEditingMemberId(id);
    setEditingMemberData(members.find((m) => m.id === id) ?? null);
    setMemberModalOpen(true);
  };
  const closeMemberModal = () => {
    setMemberModalOpen(false);
    setEditingMemberId(null);
    setEditingMemberData(null);
  };
  const saveMember = async (formData) => {
    if (!editingMemberId) throw new Error("缺少會員 ID");
    const payload = { ...formData, updatedAt: nowISO() };
    delete payload.password;
    await axios.patch(`${API_BASE}/users/${editingMemberId}`, payload);
    refresh();
  };

  /* 訂單 Modal */
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editingOrderData, setEditingOrderData] = useState(null);

  const openOrderEdit = (id) => {
    setEditingOrderId(id);
    setEditingOrderData(orders.find((o) => o.id === id) ?? null);
    setOrderModalOpen(true);
  };
  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setEditingOrderId(null);
    setEditingOrderData(null);
  };
  const saveOrder = async (formData) => {
    if (!editingOrderId) throw new Error("缺少訂單 ID");

    // [james新增] 後台 orderStatus → 前台 subscriptionStatus 對照表
    // 目的：後台改訂單狀態時，同步更新 subscriptions[].subscriptionStatus
    // 讓前台訂單管理頁（依 subscriptionStatus 判斷狀態）能正確連動顯示
    const orderStatusToSubscriptionStatus = {
      待確認: "訂閱中", // 訂單待確認，訂閱仍進行中
      處理中: "訂閱中", // 處理中，訂閱仍進行中
      已出貨: "訂閱中", // 已出貨，訂閱仍進行中
      已完成: "已完成", // 訂單完成，訂閱同步標為已完成
      已取消: "已取消", // 訂單取消，訂閱同步標為已取消
    };

    //  [james新增] 根據後台選擇的 orderStatus 決定要更新的 subscriptionStatus 值
    const newSubscriptionStatus =
      orderStatusToSubscriptionStatus[formData.orderStatus] ?? "訂閱中";

    // [james新增] 找到目前訂單，將所有 subscriptions 的 subscriptionStatus 同步更新
    const currentOrder = orders.find((o) => o.id === editingOrderId);
    const updatedSubscriptions = (currentOrder?.subscriptions ?? []).map(
      (s) => ({
        ...s,
        subscriptionStatus: newSubscriptionStatus,
      }),
    );

    // [james新增] payload 加入更新後的 subscriptions，一併送出
    const payload = {
      ...formData,
      subscriptions: updatedSubscriptions,
      updatedAt: nowISO(),
    };

    await axios.patch(`${API_BASE}/orders/${editingOrderId}`, payload);
    refresh();
  };

  /* Render */
  return (
    <div
      className={`ad-main__inner ad-dashboard-page ${loading ? "is-loading" : "is-ready"}`}
    >
      <div className="d-flex align-items-center justify-content-start mb-3 gap-2">
        <h2 className="h5 fw-bolder m-0">數據總覽</h2>

        <button
          type="button"
          className="btn btn-sm btn-refresh d-inline-flex align-items-center gap-2"
          onClick={refresh}
          disabled={loading || refreshing}
          title="重新整理資料"
        >
          <RefreshCw size={16} className={refreshing ? "spin" : ""} />
          {refreshing ? "重新整理中..." : "重新整理"}
        </button>
      </div>

      {errorMsg && (
        <div
          className="alert alert-warning rounded-4 border-0 mb-3"
          role="alert"
        >
          {errorMsg}
        </div>
      )}

        {errorMsg && (
          <div
            className="alert alert-warning rounded-4 border-0 mb-3"
            role="alert"
          >
            {errorMsg}
          </div>
        )}

        <div className="row g-3 mb-3">
          <div className="col-lg-4">
            <StatCard title="本日訂單數" value={stats.todayOrders} unit="筆" />
          </div>
          <div className="col-lg-4">
            <StatCard
              title="代處理訂單數"
              value={stats.pendingOrders}
              unit="筆"
            />
          </div>
          <div className="col-lg-4">
            <StatCard
              title="本月新增會員"
              value={stats.monthNewMembers}
              unit="名"
            />
          </div>
        </div>
      </div>

      <LatestOrders
        loading={loading}
        latestOrders={latestOrders}
        onEdit={openOrderEdit}
        getOrderPlanText={getOrderPlanText}
        getOrderQty={getOrderQty}
        getOrderStatus={getOrderStatus}
      />
      <LatestSubscriptions loading={loading} latestSubs={latestSubs} />
      <LatestMembers
        loading={loading}
        latestMembers={latestMembers}
        onEdit={openMemberEdit}
      />

      {memberModalOpen && (
        <AdminFormModal
          open={memberModalOpen}
          initialData={editingMemberData}
          onClose={closeMemberModal}
          onSave={saveMember}
        />
      )}

      {orderModalOpen && (
        <OrderFormModal
          open={orderModalOpen}
          initialData={editingOrderData}
          onClose={closeOrderModal}
          onSave={saveOrder}
        />
      )}
    </div>
  );
}
