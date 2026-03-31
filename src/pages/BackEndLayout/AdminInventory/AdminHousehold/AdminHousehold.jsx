import { useEffect, useState } from "react";
import axios from "axios";
import { House } from "lucide-react";

import "../../../../styles/AdminStyle/adminCommonPages.scss";
import HouseholdTitle from "./components/HouseholdTitle";
import HouseholdFiltersPanel from "./components/HouseholdFiltersPanel";
import HouseholdResultsTable from "./components/HouseholdResultsTable";
import HouseholdFormModal from "./components/HouseholdFormModal";
import PaginationBar from "../../PaginationBar";

import { authHeaders } from "../../utils/auth";
import { nowISO } from "../../utils/date";
import { usePagination } from "../../hooks/usePagination";
import { useHouseholdFilters } from "../../hooks/useHouseholdfilters";

const API_BASE = import.meta.env.VITE_API_BASE;
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

export default function AdminHousehold() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleHousehold,
  } = useHouseholdFilters(items);

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
  } = usePagination(visibleHousehold, {
    initialPageSize: 10,
  });

  const fetchItems = async () => {
    setLoading(true);
    setFlash(null);
    try {
      const res = await axios.get(`${API_BASE}/household`, authHeaders());
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入生活小物資料失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setFlash(null);
    setOpen(true);
  };

  const openEdit = (row) => {
    setMode("edit");
    setEditing(row);
    setFlash(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const softDelete = async (row) => {
    if (!row?.id) return;
    const ok = window.confirm(
      `確定要刪除生活小物「${row?.itemName ?? "—"}」嗎？`,
    );
    if (!ok) return;

    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/household/${row.id}`,
        {
          deletedAt: nowISO(),
          isActive: false,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已刪除生活小物資料" });
      await fetchItems();
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "刪除失敗，請稍後再試。",
      });
    }
  };

  const restore = async (row) => {
    if (!row?.id) return;
    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/household/${row.id}`,
        {
          deletedAt: null,
          isActive: true,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已復原生活小物資料" });
      await fetchItems();
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

    const tags = (data.tagsText ?? "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const payload = {
      itemName: data.itemName?.trim(),
      category: data.category,
      petSize: toArray(data.petSize),
      dietStage: toArray(data.dietStage),
      isActive: data.isActive === "true",
      description: data.description?.trim() ?? "",
      imageUrl: data.imageUrl?.trim() ?? "",
      tags,
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        await axios.post(
          `${API_BASE}/household`,
          {
            ...payload,
            createdAt: nowISO(),
            deletedAt: null,
          },
          authHeaders(),
        );
        setFlash({ type: "success", message: "新增生活小物成功！" });
      } else {
        if (!editing?.id) throw new Error("Missing household id");
        await axios.patch(
          `${API_BASE}/household/${editing.id}`,
          payload,
          authHeaders(),
        );
        setFlash({ type: "success", message: "更新生活小物成功！" });
      }

      await fetchItems();
    } catch (err) {
      throw (
        err?.response?.data?.message ||
        (err?.response?.status === 401
          ? "權限已失效，請重新登入後台。"
          : "送出失敗，請確認資料是否正確。")
      );
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <HouseholdTitle flash={flash} House={House} />

      <HouseholdFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreate={openCreate}
        onRefresh={fetchItems}
        loading={loading}
      />

      <HouseholdResultsTable
        loading={loading}
        items={pagedItems}
        hasNoData={!loading && visibleHousehold.length === 0}
        onEdit={openEdit}
        onSoftDelete={softDelete}
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

      <HouseholdFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
