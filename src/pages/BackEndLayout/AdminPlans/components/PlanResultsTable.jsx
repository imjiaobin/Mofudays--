import { Pencil, Trash2 } from "lucide-react";
import { formatYMD } from "../../utils/date";

function renderNamePool(namePool, limit = 10) {
  if (!Array.isArray(namePool) || namePool.length === 0) return "—";

  const text = namePool.filter(Boolean).join("、");
  if (text.length <= limit) return text;

  return <span title={text}>{text.slice(0, limit)}...</span>;
}

function renderSubtitle(text, limit = 10) {
  const s = String(text ?? "").trim();
  if (!s) return "—";
  if (s.length <= limit) return s;

  return <span title={s}>{s.slice(0, limit)}...</span>;
}

function renderContent(content = {}) {
  return `零食 ${content?.treats ?? 0} / 玩具 ${content?.toys ?? 0} / 生活小物 ${content?.household ?? 0}`;
}

export default function PlanResultsTable({
  loading,
  plans,
  hasNoData,
  onEdit,
  onToggleActive,
}) {
  return (
    <section className="admin-pages__results">
      <div className="admin-pages__panel">
        <div className="table-responsive admin-pages__tableWrap">
          <table className="table admin-pages__table align-middle mb-0">
            <thead>
              <tr className="small">
                <th style={{ width: 120 }}></th>
                <th className="text-center" style={{ width: 40 }}>
                  價格
                </th>
                <th className="text-center" style={{ width: 150 }}>
                  方案名稱池
                </th>
                <th className="text-center" style={{ width: 150 }}>
                  副標
                </th>
                <th className="text-center" style={{ width: 150 }}>
                  內容物
                </th>
                <th className="text-center text-nowrap" style={{ width: 90 }}>
                  建立日
                </th>
                <th className="text-center text-nowrap" style={{ width: 90 }}>
                  更新日
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-muted">
                    載入中…
                  </td>
                </tr>
              )}

              {!loading && hasNoData && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-muted">
                    尚無資料
                  </td>
                </tr>
              )}

              {!loading &&
                !hasNoData &&
                plans.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="d-flex justify-content-center gap-2 text-nowrap">
                        <button
                          type="button"
                          className="btn btn-sm btn-bg-edit text-nowrap"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil size={14} className="me-1" />
                          編輯
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-bg-delete text-nowrap"
                          onClick={() => onToggleActive(row)}
                        >
                          <Trash2 size={14} className="me-1" />
                          取消
                        </button>
                      </div>
                    </td>

                    <td className="text-nowrap text-end">
                      ${Number(row.planPrice ?? 0).toLocaleString()}
                    </td>
                    <td className="text-nowrap">
                      {renderNamePool(row.namePool)}
                    </td>
                    <td className="text-nowrap">
                      {renderSubtitle(row.subtitle, 10)}
                    </td>
                    <td className="text-center text-nowrap">
                      {renderContent(row.content)}
                    </td>
                    <td className="text-muted text-center text-nowrap">
                      {formatYMD(row.createdAt)}
                    </td>
                    <td className="text-muted text-center text-nowrap">
                      {formatYMD(row.updatedAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
