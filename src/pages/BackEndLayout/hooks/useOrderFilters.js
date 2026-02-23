import { useMemo, useState } from "react";
import {
  getBuyerName,
  getBuyerEmail,
  getOrderNo,
  getOrderDate,
  getResolvedOrderStatus,
} from "../utils/orderMeta";

const initialFilters = {
  orderNo: "",
  buyerName: "",
  buyerEmail: "",
  paymentStatus: "",
  orderStatus: "",
  orderDateStart: "",
  orderDateEnd: "",
};

function toDateOnlyTs(input) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function inputDateToTs(inputDateStr) {
  if (!inputDateStr) return null;
  const d = new Date(inputDateStr);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function useOrderFilters(sourceOrders = []) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = (field) => (e) => {
    const value = e?.target?.value ?? "";
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => setFilters({ ...initialFilters });

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => String(v ?? "").trim() !== ""),
    [filters],
  );

  const visibleOrders = useMemo(() => {
    let list = Array.isArray(sourceOrders) ? [...sourceOrders] : [];

    // 訂單編號
    if (filters.orderNo.trim()) {
      const kw = filters.orderNo.trim().toLowerCase();
      list = list.filter((o) => String(getOrderNo(o) ?? "").toLowerCase().includes(kw));
    }

    // 客戶名稱
    if (filters.buyerName.trim()) {
      const kw = filters.buyerName.trim().toLowerCase();
      list = list.filter((o) => String(getBuyerName(o) ?? "").toLowerCase().includes(kw));
    }

    // Email
    if (filters.buyerEmail.trim()) {
      const kw = filters.buyerEmail.trim().toLowerCase();
      list = list.filter((o) => String(getBuyerEmail(o) ?? "").toLowerCase().includes(kw));
    }

    // 付款狀態
    if (filters.paymentStatus) {
      const selected = String(filters.paymentStatus).trim();
      list = list.filter((o) => String(o?.paymentStatus ?? "").trim() === selected);
    }

    // 訂單狀態
    if (filters.orderStatus) {
      const selected = String(filters.orderStatus).trim();
      list = list.filter((o) => String(getResolvedOrderStatus(o) ?? "").trim() === selected);
    }

    // 訂單日期起
    if (filters.orderDateStart) {
      const startTs = inputDateToTs(filters.orderDateStart);
      if (startTs !== null) {
        list = list.filter((o) => {
          const ts = toDateOnlyTs(getOrderDate(o));
          return ts !== null && ts >= startTs;
        });
      }
    }

    // 訂單日期迄
    if (filters.orderDateEnd) {
      const endTs = inputDateToTs(filters.orderDateEnd);
      if (endTs !== null) {
        list = list.filter((o) => {
          const ts = toDateOnlyTs(getOrderDate(o));
          return ts !== null && ts <= endTs;
        });
      }
    }

    // 排序：訂單日期新到舊
    list.sort((a, b) => {
      const ta = new Date(getOrderDate(a) || 0).getTime() || 0;
      const tb = new Date(getOrderDate(b) || 0).getTime() || 0;
      return tb - ta;
    });

    return list;
  }, [sourceOrders, filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleOrders,
  };
}