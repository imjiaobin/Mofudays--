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
    <div className="admin-pages__pagination d-flex flex-row flex-wrap align-items-center justify-content-center justify-content-md-center justify-content-xs-between gap-4 gap-md-3 gap-xs-2 p-3 border-top">
      
      {/* 摘要：桌機完整 / 手機精簡 */}
      <div className="admin-pages__paginationSummary small text-muted">
        <span className="d-none d-md-inline">
          目前顯示 <span className="fw-bold">{rangeText}</span> /{" "}
          <span className="fw-bold">{totalRows}</span> 筆（第 {page} / {totalPages} 頁）
        </span>

        <span className="d-md-none">
          第 <span className="fw-bold">{page}</span> /{" "}
          <span className="fw-bold">{totalPages}</span> 頁
        </span>
      </div>

      {/* 頁碼 */}
      <nav aria-label="Admin pagination" className="admin-pages__paginationNav">
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

      {/* 每頁幾筆 */}
      <div className="admin-pages__pageSize d-inline-flex align-items-center gap-2 flex-nowrap">
        <span className="admin-pages__pageSizeText small text-muted">每頁</span>
        <select
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="admin-pages__pageSizeText small text-muted">筆</span>
      </div>
    </div>
  );
}
