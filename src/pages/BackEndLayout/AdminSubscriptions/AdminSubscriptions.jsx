import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAdminAuth } from "../../../slices/adminAuthSlice";

import "../../../styles/AdminStyle/adminCommonPages.scss";

import SubscriptionTitle from "./components/SubscriptionTitle";
import SubscriptionFiltersPanel from "./components/SubscriptionFiltersPanel";
import SubscriptionResultsTable from "./components/SubscriptionResultsTable";
import SubscriptionFormModal from "./components/SubscriptionFormModal";
import PaginationBar from "../PaginationBar";

import { authHeaders } from "../utils/auth";
import { nowISO } from "../utils/date";
import { usePagination } from "../hooks/usePagination";
import { useSubscriptionFilters } from "../hooks/useSubscriptionFilters";
import {
  getSubscriptionId,
  getResolvedSubscriptionStatus,
} from "../utils/subscriptionMeta";

const API_BASE = import.meta.env.VITE_API_BASE;

function toNum(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function toDateInputValue(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function genSubscriptionId(existingSubscriptions = []) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const existingIds = new Set(
    (existingSubscriptions || []).map((s) => String(s?.id ?? "")),
  );

  let candidate = "";
  let tryCount = 0;

  do {
    const random4 = String(Math.floor(Math.random() * 9000) + 1000);
    candidate = `SUB-${ymd}-${random4}`;
    tryCount += 1;
  } while (existingIds.has(candidate) && tryCount < 20);

  return candidate;
}

function getEmptyPlanContent() {
  return {
    snacks: [],
    cans: [],
    toys: [],
  };
}

export default function AdminSubscriptions() {
  const { user: currentAdmin } = useSelector(selectAdminAuth);

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const [treats, setTreats] = useState([]);
  const [toys, setToys] = useState([]);
  const [household, setHousehold] = useState([]);

  const {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleSubscriptions,
  } = useSubscriptionFilters(subscriptions);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems: pagedSubscriptions,
    pageItems,
    rangeText,
  } = usePagination(visibleSubscriptions, {
    initialPageSize: 10,
    resetDeps: [filters],
  });

  const fetchSubscriptions = async () => {
    setLoading(true);
    setFlash(null);

    try {
      const res = await axios.get(`${API_BASE}/subscriptions`, authHeaders());
      setSubscriptions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入訂閱列表失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalog = async () => {
    try {
      const [treatRes, toyRes, householdRes] = await Promise.all([
        axios.get(`${API_BASE}/treats`, authHeaders()),
        axios.get(`${API_BASE}/toys`, authHeaders()),
        axios.get(`${API_BASE}/household`, authHeaders()),
      ]);

      setTreats(Array.isArray(treatRes.data) ? treatRes.data : []);
      setToys(Array.isArray(toyRes.data) ? toyRes.data : []);
      setHousehold(Array.isArray(householdRes.data) ? householdRes.data : []);
    } catch {
      setTreats([]);
      setToys([]);
      setHousehold([]);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
    fetchCatalog();
  }, []);

  const treatNameById = useMemo(() => {
    const map = {};
    for (const t of treats) {
      const id = String(t?.id ?? "");
      if (!id) continue;
      map[id] = String(t?.treatName ?? "");
    }
    return map;
  }, [treats]);

  const toyNameById = useMemo(() => {
    const map = {};
    for (const t of toys) {
      const id = String(t?.id ?? "");
      if (!id) continue;
      map[id] = String(t?.toyName ?? "");
    }
    return map;
  }, [toys]);
  const householdNameById = useMemo(() => {
    const map = {};
    for (const h of household) {
      const id = String(h?.id ?? "");
      if (!id) continue;
      map[id] = String(h?.householdName ?? "");
    }
    return map;
  }, [household]);

  const openCreate = () => {
    const draftId = genSubscriptionId(subscriptions);
    const today = toDateInputValue(new Date());
    const now = nowISO();

    setMode("create");
    setEditing({
      id: draftId,
      orderId: "",
      cartId: "",
      userId: "",
      dogId: "",
      planId: "",
      planName: "",
      planContent: getEmptyPlanContent(),
      subscriptionQuantity: 1,
      termCycles: 3,
      startDate: today,
      currentCycleIndex: 1,
      currentCycleTotal: 3,
      shippingStatus: "待出貨",
      shippedDate: "",
      nextShippedDate: today,
      subscriptionStatus: "訂閱中",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    setFlash(null);
    setOpen(true);
  };

  const openEdit = (subscription) => {
    setMode("edit");
    setEditing(subscription);
    setFlash(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const cancel = async (subscription) => {
    if (!subscription?.id) return;

    const ok = window.confirm(
      `確定要取消訂閱「${getSubscriptionId(subscription)}」嗎？`,
    );
    if (!ok) return;

    setFlash(null);

    try {
      await axios.patch(
        `${API_BASE}/subscriptions/${subscription.id}`,
        {
          subscriptionStatus: "已取消",
          isActive: false,
          deletedAt: nowISO(),
          updatedAt: nowISO(),
        },
        authHeaders(),
      );

      setFlash({ type: "success", message: "已取消訂閱" });
      await fetchSubscriptions();
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

  const restore = async (subscription) => {
    if (!subscription?.id) return;

    setFlash(null);

    try {
      await axios.patch(
        `${API_BASE}/subscriptions/${subscription.id}`,
        {
          subscriptionStatus:
            getResolvedSubscriptionStatus(subscription) === "已取消"
              ? "訂閱中"
              : subscription.subscriptionStatus || "訂閱中",
          isActive: true,
          deletedAt: null,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );

      setFlash({ type: "success", message: "已復原訂閱" });
      await fetchSubscriptions();
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

    const termCycles = Math.max(1, toNum(data.termCycles, 3));
    const currentCycleIndex = Math.min(
      termCycles,
      Math.max(1, toNum(data.currentCycleIndex, 1)),
    );

    const rawPlanId = String(data.planId ?? "").trim();

    const payloadCommon = {
      orderId: String(data.orderId ?? "").trim(),
      cartId: String(data.cartId ?? "").trim(),
      userId: String(data.userId ?? "").trim(),
      dogId: String(data.dogId ?? "").trim(),
      planId: rawPlanId === "" ? null : toNum(rawPlanId, 0),
      planName: String(data.planName ?? "").trim(),
      planContent: editing?.planContent ?? getEmptyPlanContent(),

      subscriptionQuantity: Math.max(1, toNum(data.subscriptionQuantity, 1)),
      termCycles,
      currentCycleIndex,
      currentCycleTotal: termCycles,

      startDate: String(data.startDate ?? "").trim() || null,
      shippedDate: String(data.shippedDate ?? "").trim() || null,
      nextShippedDate: String(data.nextShippedDate ?? "").trim() || null,

      shippingStatus: String(data.shippingStatus ?? "").trim() || "待出貨",
      subscriptionStatus:
        String(data.subscriptionStatus ?? "").trim() || "訂閱中",

      isActive: data?.isActive === false ? false : true,
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        const generatedId =
          String(data.subscriptionId ?? "").trim() ||
          String(editing?.id ?? "").trim() ||
          genSubscriptionId(subscriptions);

        const createBody = {
          ...payloadCommon,
          id: generatedId,
          deletedAt: null,
          createdAt: nowISO(),
          createdBy: currentAdmin?.email ?? currentAdmin?.name ?? "admin",
        };

        await axios.post(
          `${API_BASE}/subscriptions`,
          createBody,
          authHeaders(),
        );
        setFlash({ type: "success", message: "新增訂閱成功！" });
      } else {
        if (!editing?.id) throw new Error("Missing subscription id");

        await axios.patch(
          `${API_BASE}/subscriptions/${editing.id}`,
          payloadCommon,
          authHeaders(),
        );

        setFlash({ type: "success", message: "更新訂閱成功！" });
      }

      await fetchSubscriptions();
    } catch (err) {
      const status = err?.response?.status;
      const msgRaw = err?.response?.data;

      const msg =
        typeof msgRaw === "string"
          ? msgRaw
          : status === 401
            ? "權限已失效，請重新登入後台。"
            : "送出失敗，請確認資料欄位是否正確。";

      throw msg;
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <SubscriptionTitle flash={flash} />

      <SubscriptionFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreate={openCreate}
        onRefresh={fetchSubscriptions}
        loading={loading}
      />

      <SubscriptionResultsTable
        loading={loading}
        subscriptions={pagedSubscriptions}
        hasNoData={!loading && visibleSubscriptions.length === 0}
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

      <SubscriptionFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
        treatNameById={treatNameById}
        toyNameById={toyNameById}
        householdNameById={householdNameById}
      />
    </div>
  );
}
