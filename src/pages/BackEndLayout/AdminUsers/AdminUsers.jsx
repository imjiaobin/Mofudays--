import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAdminAuth } from "../../../slices/adminAuthSlice";

import "../../../styles/AdminStyle/adminCommonPages.scss";

import UserTitle from "./components/UserTitle";
import UserFiltersPanel from "./components/UserFiltersPanel";
import UserResultsTable from "./components/UserResultsTable";
import PaginationBar from "../PaginationBar";
import UserFormModal from "./components/UserFormModal";

import { authHeaders } from "../utils/auth";
import { nowISO } from "../utils/date";
import { useUserFilters } from "../hooks/useUserFilters";
import { usePagination } from "../hooks/usePagination";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminUsers() {
  const { user: currentAdmin } = useSelector(selectAdminAuth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  // modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleAdmins: visibleUsers,
  } = useUserFilters(users);

  // pagination
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems: pagedUsers,
    pageItems,
    rangeText,
  } = usePagination(visibleUsers, { initialPageSize: 10, resetDeps: [filters] });

  // 取得使用者資料
  const fetchUsers = async () => {
    setLoading(true);
    setFlash(null);
    try {
      const res = await axios.get(`${API_BASE}/users?role=user`, authHeaders());
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFlash({
        type: "danger",
        message:
          err?.response?.status === 401
            ? "權限已失效，請重新登入後台。"
            : "載入使用者列表失敗，請稍後再試。",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 新增
  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setFlash(null);
    setOpen(true);
  };

  // 修改
  const openEdit = (user) => {
    setMode("edit");
    setEditing(user);
    setFlash(null);
    setOpen(true);
  };

  // 關閉 modal
  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  // 刪除
  // const softDelete = async (user) => {
  //   if (!user?.id) return;

  //   const ok = window.confirm(
  //     `確定要刪除使用者「${user?.name ?? user?.email ?? "—"}」嗎？`,
  //   );
  //   if (!ok) return;

  //   setFlash(null);
  //   try {
  //     await axios.patch(
  //       `${API_BASE}/users/${user.id}`,
  //       {
  //         deletedAt: nowISO(),
  //         isActive: false,
  //         updatedAt: nowISO(),
  //       },
  //       authHeaders(),
  //     );
  //     setFlash({ type: "success", message: "已刪除使用者" });
  //     await fetchUsers();
  //   } catch (err) {
  //     setFlash({
  //       type: "danger",
  //       message:
  //         err?.response?.status === 401
  //           ? "權限已失效，請重新登入後台。"
  //           : "刪除失敗，請稍後再試。",
  //     });
  //   }
  // };

  // 重新啟用 User (目前先不用)
  const restore = async (user) => {
    if (!user?.id) return;
    setFlash(null);
    try {
      await axios.patch(
        `${API_BASE}/users/${user.id}`,
        {
          deletedAt: null,
          isActive: true,
          updatedAt: nowISO(),
        },
        authHeaders(),
      );
      setFlash({ type: "success", message: "已重新啟用使用者" });
      await fetchUsers();
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

    const payloadCommon = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      nickname: data.nickname?.trim() ?? "",
      birthday: data.birthday ?? "",
      phone: data.phone?.trim() ?? "",
      address: data.address?.trim() ?? "",
      avatar: data.avatar?.trim() ?? "",
      isActive: Boolean(data.isActive),
      updatedAt: nowISO(),
    };

    try {
      if (mode === "create") {
        const createBody = {
          ...payloadCommon,
          password: data.password?.trim(),
          role: "user",
          deletedAt: null,
          createdAt: nowISO(),
        };

        await axios.post(`${API_BASE}/register`, createBody);
        setFlash({ type: "success", message: "新增使用者成功!" });
      } else {
        if (!editing?.id) throw new Error("Missing user id");
        await axios.patch(`${API_BASE}/users/${editing.id}`, payloadCommon, authHeaders());
        setFlash({ type: "success", message: "更新使用者成功!" });
      }

      await fetchUsers();
    } catch (err) {
      const status = err?.response?.status;
      const msgRaw = err?.response?.data;

      const msg =
        typeof msgRaw === "string"
          ? msgRaw
          : status === 401
            ? "管理員權限已失效，請重新登入後台。"
            : "送出失敗，請確認資料是否正確（Email 是否重複？）";
      throw msg;
    }
  };

  return (
    <div className="container-fluid mt-3 py-5 admin-pages">
      <UserTitle flash={flash} />

      <UserFiltersPanel
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        visibleCount={visibleUsers.length}
        onCreate={openCreate}
        onRefresh={fetchUsers}
        loading={loading}
      />

      <UserResultsTable
        loading={loading}
        users={pagedUsers}
        hasNoData={!loading && visibleUsers.length === 0}
        currentAdmin={currentAdmin}
        onEdit={openEdit}
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

      <UserFormModal
        open={open}
        mode={mode}
        initialData={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}