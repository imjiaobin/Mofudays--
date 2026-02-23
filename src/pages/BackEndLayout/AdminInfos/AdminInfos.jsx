// AdminInfos/AdminInfos.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAdminAuth } from "../../../slices/adminAuthSlice";

import "../../../styles/AdminStyle/adminCommonPages.scss";

import AdminTitle from "./components/AdminTitle";
import AdminFiltersPanel from "./components/AdminFiltersPanel";
import AdminResultsTable from "./components/AdminResultsTable";
import PaginationBar from "../PaginationBar";
import AdminFormModal from "./components/AdminFormModal";

import { authHeaders } from "../utils/auth";
import { nowISO } from "../utils/date";
import { useAdminFilters } from "../hooks/useAdminFilters";
import { usePagination } from "../hooks/usePagination";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminInfos() {
  const { user: currentAdmin } = useSelector(selectAdminAuth);

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  // modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  // 過濾資料
  const { filters, setFilter, clearFilters, hasActiveFilters, visibleAdmins } = useAdminFilters(admins);

  // pagination 
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems: pagedAdmins,
    pageItems,
    rangeText,
  } = usePagination(visibleAdmins, { initialPageSize: 10, resetDeps: [filters] });

  // 取得 管理員資料
  const fetchAdmins = async () => {
    setLoading(true);
    setFlash(null);
    try {
      const res = await axios.get(`${API_BASE}/users?role=admin`, authHeaders());
      setAdmins(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message: err?.response?.status === 401 ? "權限已失效，請重新登入後台。" : "載入管理員列表失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 新增
  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setFlash(null);
    setOpen(true);
  };

  // 修改
  const openEdit = (admin) => {
    setMode("edit");
    setEditing(admin);
    setFlash(null);
    setOpen(true);
  };

  // 關閉 modal
  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  // 刪除 (目前管理員先不用)
  const softDelete = async (admin) => {
    if (!admin?.id) return;

    if (currentAdmin?.id && admin.id === currentAdmin.id) {
      setFlash({ type: "danger", message: "不能刪除目前登入的自己" });
      return;
    }

    const ok = window.confirm(`確定要刪除管理員「${admin?.name ?? admin?.email ?? "—"}」嗎？（可復原）`);
    if (!ok) return;

    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/users/${admin.id}`,
        { deletedAt: nowISO(), isActive: false, updatedAt: nowISO() },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已刪除" });
      await fetchAdmins();
    } catch (err) {
      setFlash({
        type: "danger",
        message: err?.response?.status === 401 ? "權限已失效，請重新登入後台。" : "刪除失敗，請稍後再試。",
      });
    }
  };

  // 重新啟用 Admin, 先留著
  const restore = async (admin) => {
    if (!admin?.id) return;
    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/users/${admin.id}`,
        { deletedAt: null, isActive: true, updatedAt: nowISO() },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已重新啟用" });
      await fetchAdmins();
    } catch (err) {
      setFlash({
        type: "danger",
        message: err?.response?.status === 401 ? "權限已失效，請重新登入後台。" : "復原失敗，請稍後再試。",
      });
    }
  };

  // modal save handler（讓 modal 自己顯示錯誤）
  const handleSave = async (data) => {
    setFlash(null);

    const payloadCommon = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      nickname: data.nickname ?? "",
      birthday: data.birthday ?? "",
      phone: data.phone ?? "",
      avatar: data.avatar?.trim() ?? "", 
      isActive: Boolean(data.isActive),
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        const createBody = {
          ...payloadCommon,
          password: data.password?.trim(),
          role: "admin",
          deletedAt: null,
          isLoggedIn: false,
          createdAt: nowISO(),
        };
        await axios.post(`${API_BASE}/register`, createBody);
        setFlash({ type: "success", message: "新增管理員成功!" });
      } else {
        if (!editing?.id) throw new Error("Missing admin id");
        await axios.patch(`${API_BASE}/users/${editing.id}`, payloadCommon, authHeaders());
        setFlash({ type: "success", message: "更新管理員成功!" });
      }

      await fetchAdmins();
    } catch (err) {
      const status = err?.response?.status;
      const msgRaw = err?.response?.data;

      const msg =
        typeof msgRaw === "string"
          ? msgRaw
          : status === 401
            ? "權限已失效，請重新登入後台。"
            : "送出失敗，請確認資料是否正確（Email 是否重複？）";

      // ✅ 丟給 modal 顯示
      throw msg;
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <AdminTitle flash={flash} />

      <AdminFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        visibleCount={visibleAdmins.length}
        onCreate={openCreate}
        onRefresh={fetchAdmins}
        loading={loading}
      />

      <AdminResultsTable
        loading={loading}
        admins={pagedAdmins}
        hasNoData={!loading && visibleAdmins.length === 0}
        currentAdmin={currentAdmin}
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

      <AdminFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}