import { useId, useState } from "react";
import { formatDate, formatDateTime } from "../../utils/date";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
// import { adminToast } from "../../utils/adminToast";
import { usePagination } from "../../hooks/usePagination";
import PaginationBar from "../../PaginationBar";

// const handleFeatureComingSoon = (label = "此功能") => {
//   adminToast.info(`${label}功能尚未開放`, {
//     toastId: `coming-soon:${label}`,
//   });
// };

export default function LatestUsers({ loading, latestMembers = [], onEdit }) {
  const [open, setOpen] = useState(true);
  const collapseId = useId();

  const members = Array.isArray(latestMembers) ? latestMembers : [];

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
  } = usePagination(members, {
    initialPageSize: 10,
    resetDeps: [members.length],
  });

  return (
    <section className="card shadow-sm border-0 rounded-4 ad-card ">
      <div className="card-body pb-0 pt-2 ad-mb-20">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-link p-0 ad-collapseBtn"
              aria-label={open ? "收合" : "展開"}
              aria-expanded={open}
              aria-controls={collapseId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <div className="fw-bolder">最新會員資料</div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link className="ad-link" to="/admin/users">
              查看所有會員
            </Link>
          </div>
        </div>

        <div
          id={collapseId}
          className={`ad-collapse ${open ? "" : "is-closed"}`}
        >
          <div className="ad-collapse__inner">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 ad-table">
                <thead>
                  <tr className="small text-secondary">
                    <th>會員編號</th>
                    <th>姓名</th>
                    <th>生日</th>
                    <th>聯絡電話</th>
                    <th>Email</th>
                    <th>地址</th>
                    <th>註冊時間</th>
                    <th className="text-center">操作</th>
                  </tr>
                </thead>

                <tbody className="small">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-secondary">
                        資料載入中...
                      </td>
                    </tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-secondary">
                        目前沒有會員資料
                      </td>
                    </tr>
                  ) : (
                    pagedItems.map((m) => (
                      <tr key={m.id}>
                        <td
                          className="ad-orange fw-bold text-truncate"
                          style={{ maxWidth: 180 }}
                          title={m.id}
                        >
                          {m.id}
                        </td>
                        <td>{m.name || "-"}</td>
                        <td>{m.birthday ? formatDate(m.birthday) : "-"}</td>
                        <td>{m.phone || "-"}</td>
                        <td className="text-truncate" style={{ maxWidth: 220 }}>
                          {m.email || "-"}
                        </td>
                        <td className="text-truncate" style={{ maxWidth: 280 }}>
                          {m.address || "-"}
                        </td>
                        <td>{m.createdAt ? formatDateTime(m.createdAt) : "-"}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn ad-iconBtn"
                            title="編輯"
                            // onClick={() => handleFeatureComingSoon("編輯會員")}
                            onClick={() => onEdit?.(m.id)}
                          >
                            <Pencil size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
