export default function PaginationBar({
  loading,
  totalRows,
  rangeText,
  page,
  totalPages,
  pageSize,
  setPageSize,
  setPage,
  pageItems,
}) {
  if (loading || totalRows === 0) return null;

  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-5 p-3 border-top">

      {/* 目前顯示頁數筆數 */}
      <div className="small text-muted">
        目前顯示 <span className="fw-bold">{rangeText}</span> /{" "}
        <span className="fw-bold">{totalRows}</span> 筆（第 {page} / {totalPages} 頁）
      </div>

      {/* 顯示目前第幾頁 包含 上/下一頁, 第一頁最後一頁 */}
      <nav aria-label="Admin pagination">
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" type="button" onClick={() => setPage(1)} disabled={page === 1}>
              «
            </button>
          </li>

          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ‹
            </button>
          </li>

          {pageItems.map((it, idx) => {
            if (it === "...") {
              return (
                <li key={`dots-${idx}`} className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              );
            }
            const p = it;
            return (
              <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                <button className="page-link" type="button" onClick={() => setPage(p)}>
                  {p}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              ›
            </button>
          </li>

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" type="button" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
              »
            </button>
          </li>
        </ul>
      </nav>
      
      {/* 顯示每頁幾筆 10/20/50 */}
      <div className="d-flex align-items-center gap-2">
        <span className="small text-muted">每頁</span>
        <select
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="small text-muted">筆</span>
      </div>

      
    </div>
  );
}