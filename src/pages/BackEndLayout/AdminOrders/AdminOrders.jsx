import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAdminAuth } from "../../../slices/adminAuthSlice";

import "../../../styles/AdminStyle/adminCommonPages.scss";

import OrderTitle from "./components/OrderTitle";
import OrderFiltersPanel from "./components/OrderFiltersPanel";
import OrderResultsTable from "./components/OrderResultsTable";
import OrderFormModal from "./components/OrderFormModal";
import PaginationBar from "../PaginationBar";

import { authHeaders } from "../utils/auth";
import { nowISO } from "../utils/date";
import { usePagination } from "../hooks/usePagination";
import { useOrderFilters } from "../hooks/useOrderFilters";
import {
  canTransitionOrderStatus,
  composeBuyerText,
  getOrderNo,
  getResolvedOrderStatus,
} from "../utils/orderMeta";

const API_BASE = import.meta.env.VITE_API_BASE;

function toNum(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function genOrderId(existingOrders = []) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const existingIds = new Set((existingOrders || []).map((o) => String(o?.id ?? "")));

  let candidate = "";
  let tryCount = 0;

  do {
    const random4 = String(Math.floor(Math.random() * 9000) + 1000);
    candidate = `MOF${ymd}-${random4}`;
    tryCount += 1;
  } while (existingIds.has(candidate) && tryCount < 20);

  return candidate;
}

function toIsoFromDateTimeLocal(value, fallback = "") {
  if (!value) return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString();
}

function syncSubscriptionsSummary(existingSubscriptions, summary) {
  const list = Array.isArray(existingSubscriptions) ? [...existingSubscriptions] : [];
  if (list.length === 0) return list;

  const first = { ...list[0] };
  first.shippingStatus = summary.shippingStatus ?? first.shippingStatus ?? "待出貨";
  first.subscriptionStatus = summary.subscriptionStatus ?? first.subscriptionStatus ?? "訂閱中";

  if (!first.startDate && summary.orderDateISO) {
    first.startDate = String(summary.orderDateISO).slice(0, 10);
  }

  list[0] = first;
  return list;
}

export default function AdminOrders() {
  const { user: currentAdmin } = useSelector(selectAdminAuth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  // form modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  // filters
  const { filters, setFilter, clearFilters, hasActiveFilters, visibleOrders } = useOrderFilters(orders);

  // pagination
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems: pagedOrders,
    pageItems,
    rangeText,
  } = usePagination(visibleOrders, {
    initialPageSize: 10,
    resetDeps: [filters],
  });

  const fetchOrders = async () => {
    setLoading(true);
    setFlash(null);
    try {
      const res = await axios.get(`${API_BASE}/orders`, authHeaders());
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入訂單列表失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setFlash(null);
    setOpen(true);
  };

  const openEdit = (order) => {
    setMode("edit");
    setEditing(order);
    setFlash(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const cancel = async (order) => {
    if (!order?.id) return;

    const ok = window.confirm(`確定要取消訂單「${getOrderNo(order)}」嗎？`);
    if (!ok) return;

    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/orders/${order.id}`,
        {
          deletedAt: nowISO(),
          isActive: false,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );

      setFlash({ type: "success", message: "已取消訂單" });
      await fetchOrders();
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "取消失敗，請稍後再試。",
      });
    }
  };

  const restore = async (order) => {
    if (!order?.id) return;

    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/orders/${order.id}`,
        {
          deletedAt: null,
          isActive: true,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );

      setFlash({ type: "success", message: "已復原訂單" });
      await fetchOrders();
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "復原失敗，請稍後再試。",
      });
    }
  };

  const handleSave = async (data) => {
    setFlash(null);

    const buyerInfo = {
      name: String(data.buyerName ?? "").trim(),
      email: String(data.buyerEmail ?? "").trim(),
      phone: String(data.buyerPhone ?? "").trim(),
      address: String(data.buyerAddress ?? "").trim(),
    };

    const orderDateISO = toIsoFromDateTimeLocal(data.orderDate, editing?.orderDate || nowISO());

    const summaryStatuses = {
      shippingStatus: String(data.shippingStatus ?? "").trim() || "待出貨",
      subscriptionStatus: String(data.subscriptionStatus ?? "").trim() || "訂閱中",
      orderDateISO,
    };

    const payloadCommon = {
      orderNo: String(data.orderNo ?? "").trim() || undefined,

      userId: String(data.userId ?? "").trim(),
      cartId: String(data.cartId ?? "").trim(),
      orderDate: orderDateISO,

      termCycles: toNum(data.termCycles, 1),
      perCycleAmount: toNum(data.perCycleAmount, 0),
      orderTotalAmount: toNum(data.orderTotalAmount, 0),
      currency: String(data.currency ?? "").trim() || "TWD",

      paymentStatus: String(data.paymentStatus ?? "").trim() || "已付款",
      orderStatus: String(data.orderStatus ?? "").trim() || "待確認",
      shippingStatus: summaryStatuses.shippingStatus,
      subscriptionStatus: summaryStatuses.subscriptionStatus,

      buyerInfo,
      buyer: composeBuyerText(buyerInfo),

      note: String(data.note ?? "").trim(),

      // ✅ 避免 Boolean(undefined) 變 false
      isActive: data?.isActive === false ? false : true,
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        const generatedId = payloadCommon.orderNo || genOrderId(orders);

        const createBody = {
          ...payloadCommon, // ✅ 先展開，避免把下面的 orderNo 蓋掉
          id: generatedId,
          orderNo: generatedId,
          subscriptionPlans: [],
          subscriptionIds: [],
          subscriptions: [],
          deletedAt: null,
          createdAt: nowISO(),
          createdBy: currentAdmin?.email ?? currentAdmin?.name ?? "admin",
        };

        await axios.post(`${API_BASE}/orders`, createBody, authHeaders());
        setFlash({ type: "success", message: "新增訂單成功！" });
      } else {
        if (!editing?.id) throw new Error("Missing order id");

        const prevOrderStatus = getResolvedOrderStatus(editing);
        const nextOrderStatus = payloadCommon.orderStatus;

        if (!canTransitionOrderStatus(prevOrderStatus, nextOrderStatus)) {
          throw "此訂單狀態不可這樣變更（例如已完成/已取消不可再修改狀態）";
        }

        const nextSubscriptions = syncSubscriptionsSummary(editing?.subscriptions, summaryStatuses);

        const patchBody = {
          ...payloadCommon,
          orderNo: payloadCommon.orderNo || editing.orderNo || editing.id,
          subscriptions: nextSubscriptions,
        };

        await axios.patch(`${API_BASE}/orders/${editing.id}`, patchBody, authHeaders());
        setFlash({ type: "success", message: "更新訂單成功！" });
      }

      await fetchOrders();
    } catch (err) {
      const status = err?.response?.status;
      const msgRaw = err?.response?.data;

      const msg =
        typeof err === "string"
          ? err
          : typeof msgRaw === "string"
            ? msgRaw
            : status === 401
              ? "權限已失效，請重新登入後台。"
              : "送出失敗，請確認資料欄位是否正確。";

      throw msg;
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <OrderTitle flash={flash} />

      <OrderFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreate={openCreate}
        onRefresh={fetchOrders}
        loading={loading}
      />

      <OrderResultsTable
        loading={loading}
        orders={pagedOrders}
        hasNoData={!loading && visibleOrders.length === 0}
        onEdit={openEdit}
        onCancel={cancel}
        onRestore={restore}
      />

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

      <OrderFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}