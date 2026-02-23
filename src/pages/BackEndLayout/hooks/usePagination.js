import { useEffect, useMemo, useState } from "react";

export function usePagination(items, { initialPageSize = 10, resetDeps = [] } = {}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalRows = items.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  // 搜尋條件 / items / pageSize 改變 => 回到第 1 頁
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, ...resetDeps]);

  // 避免 page 超出 totalPages
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);
  
  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const rangeText = useMemo(() => {
    if (totalRows === 0) return "0–0";
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalRows);
    return `${start}–${end}`;
  }, [page, pageSize, totalRows]);

  const pageItems = useMemo(() => {
    const maxButtons = 7;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const items = [1];
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);

    if (left > 2) items.push("...");
    for (let p = left; p <= right; p++) items.push(p);
    if (right < totalPages - 1) items.push("...");
    items.push(totalPages);
    return items;
  }, [page, totalPages]);

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    totalPages,
    pagedItems,
    pageItems,
    rangeText,
  };
}