import { useState, useMemo } from "react";
import axios from "axios";
import AdminFormModal from "../AdminUsers/components/UserFormModal";
import OrderFormModal from "../AdminOrders/components/OrderFormModal";
import LatestOrders from "./components/LatestOrders";
import LatestSubscriptions from "./components/LatestSubscriptions";
import LatestMembers from "./components/LatestMembers";
import "../../../styles/AdminStyle/adminDashboard.scss";

import { Info, RefreshCw } from "lucide-react";
import { nowISO, isToday, isThisMonth, sortByDateDesc } from "../utils/date";
import { useDashboardData } from "../hooks/useDashboardData";

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

function isPendingStatus(raw) {
  const s = String(raw ?? "");
  return s.includes("待") || s.includes("處理中") || s.includes("pending");
}

export default function AdminDashboard() {
  const {
    orders,
    subscriptions,
    members,
    loading,
    refreshing,
    errorMsg,
    refresh,
  } = useDashboardData();

  /* 最新資料 => 先取前面五筆顯示並排序 */
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
    // 取得當日最新訂單資料
    const todayOrders = orders.filter((o) => isToday(o?.orderDate)).length;
    // 過濾有效訂單資料
    const ordersHasStatus = orders.some(
      (o) => o?.orderStatus != null || o?.shippingStatus != null,
    );
    // 取得待處理訂單/訂閱數量
    const pendingOrders = ordersHasStatus
      ? orders.filter((o) =>
          isPendingStatus(o?.orderStatus ?? o?.shippingStatus),
        ).length
      : subscriptions.filter((s) => isPendingStatus(s?.shippingStatus)).length;
    //取得最新會員資料
    const monthNewMembers = members.filter((m) =>
      isThisMonth(m?.createdAt),
    ).length;

    return { todayOrders, pendingOrders, monthNewMembers };
  }, [orders, subscriptions, members]);

  /* 打開會員Modal 用 */
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingMemberData, setEditingMemberData] = useState(null);

  const openMemberEdit = (id) => {
    setEditingMemberId(id);

    const found = members.find((m) => m.id === id) ?? null;
    setEditingMemberData(found);

    setMemberModalOpen(true);
  };

  const closeMemberModal = () => {
    setMemberModalOpen(false);
    setEditingMemberId(null);
    setEditingMemberData(null);
  };

  const saveMember = async (formData) => {
    if (!editingMemberId) throw new Error("缺少會員 ID");

    const payload = {
      ...formData,
      updatedAt: nowISO(),
    };

    // edit 模式通常不送 password（避免空字串覆蓋）
    delete payload.password;

    await axios.patch(`${API_BASE}/users/${editingMemberId}`, payload);

    refresh();
  };

  // 訂單 modal 用
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editingOrderData, setEditingOrderData] = useState(null);

  const openOrderEdit = (id) => {
    setEditingOrderId(id);

    const found = orders.find((o) => o.id === id) ?? null;
    setEditingOrderData(found);

    setOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setEditingOrderId(null);
    setEditingOrderData(null);
  };

  const saveOrder = async (formData) => {
    if (!editingOrderId) throw new Error("缺少訂單 ID");

    const payload = {
      ...formData,
      updatedAt: nowISO?.() ?? new Date().toISOString(),
    };

    await axios.patch(`${API_BASE}/orders/${editingOrderId}`, payload);

    refresh();
  };

  return (
    <>
      <div
        className={`ad-main__inner ad-dashboard-page admin-pages ${loading ? "is-loading" : "is-ready"}`}
      >
        <div className="d-flex align-items-center justify-content-start mb-3 gap-2">
          <h2 className="h5 fw-bolder m-0">數據總覽</h2>

          <button
            type="button"
            className="btn btn-sm ad-btn-refresh d-inline-flex align-items-center gap-2"
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

        <div className="row g-3 mb-3">
          <div className="col-12 col-lg-4">
            <StatCard title="本日訂單數" value={stats.todayOrders} unit="筆" />
          </div>
          <div className="col-12 col-lg-4">
            <StatCard
              title="代處理訂單數"
              value={stats.pendingOrders}
              unit="筆"
            />
          </div>
          <div className="col-12 col-lg-4">
            <StatCard
              title="本月新增會員"
              value={stats.monthNewMembers}
              unit="名"
            />
          </div>
        </div>

        <LatestOrders
          loading={loading}
          latestOrders={latestOrders}
          onEdit={openOrderEdit}
        />
        <LatestSubscriptions loading={loading} latestSubs={latestSubs} />
        <LatestMembers
          loading={loading}
          latestMembers={latestMembers}
          onEdit={openMemberEdit}
        />
      </div>

      {/*  會員編輯 modal */}
      <AdminFormModal
        open={memberModalOpen}
        mode="edit"
        initialData={editingMemberData}
        onClose={closeMemberModal}
        onSave={saveMember}
      />

      {/* 訂單編輯 modal */}
      <OrderFormModal
        open={orderModalOpen}
        mode="edit"
        initialData={editingOrderData}
        onClose={closeOrderModal}
        onSave={saveOrder}
      />
    </>
  );
}
