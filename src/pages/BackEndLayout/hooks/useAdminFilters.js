import { useMemo, useState } from "react";
import { formatYMD } from "../utils/date";

// 初始 filter
const DEFAULT_FILTERS = {
  email: "",
  role: "",
  name: "",
  birthdayStart: "",
  birthdayEnd: "",
  isActive: "",
  createdAtStart: "",
  createdAtEnd: "",
  updatedAtStart: "",
  updatedAtEnd: "",
};

// 時間區間篩選
function isWithinDateRange(value, start, end) {
  if (!start && !end) return true;

  const ymd = formatYMD(value);

  // 資料日期無法轉成 YYYY-MM-DD，視為不符合
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return false;

  // 字串比較在 YYYY-MM-DD 格式下可行
  if (start && ymd < start) return false;
  if (end && ymd > end) return false;

  return true;
}

export function useAdminFilters(admins) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // 避免寫很多 handler
  const setFilter = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // 清除 過濾條件
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  // 顯示啟用之admin
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => String(v).trim() !== ""),
    [filters],
  );

  // 過濾器
  const visibleAdmins = useMemo(() => {
    const emailQ = filters.email.trim().toLowerCase();
    const nameQ = filters.name.trim().toLowerCase();

    return admins.filter((a) => {
      if (emailQ) {
        const email = (a?.email ?? "").toLowerCase();
        if (!email.includes(emailQ)) return false;
      }

      if (filters.role) {
        if ((a?.role ?? "") !== filters.role) return false;
      }

      if (nameQ) {
        const name = (a?.name ?? "").toLowerCase();
        if (!name.includes(nameQ)) return false;
      }


      if (
        !isWithinDateRange(
          a?.birthday,
          filters.birthdayStart,
          filters.birthdayEnd,
        )
      ) {
        return false;
      }

      if (
        !isWithinDateRange(
          a?.createdAt,
          filters.createdAtStart,
          filters.createdAtEnd,
        )
      ) {
        return false;
      }

      if (
        !isWithinDateRange(
          a?.updatedAt,
          filters.updatedAtStart,
          filters.updatedAtEnd,
        )
      ) {
        return false;
      }

      if (filters.isActive) {
        const want = filters.isActive === "true";
        if (Boolean(a?.isActive) !== want) return false;
      }

      return true;
    });
  }, [admins, filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    visibleAdmins,
  };
}
