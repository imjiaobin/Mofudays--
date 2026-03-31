import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { formatYMD } from "../../../utils/date";

import {
  joinLabels,
  HOUSEHOLD_TAG_LABEL,
  HOUSEHOLD_CATEGORY_LABEL,
} from "../../../utils/inventoryMapMeta";

export default function HouseholdResultsTable({
  loading,
  items,
  hasNoData,
  onEdit,
  onSoftDelete,
  onRestore,
}) {
  return (
    <section className="admin-pages__results">
      <div className="admin-pages__panel">
        <div className="table-responsive admin-pages__tableWrap">
          <table className="table admin-pages__table align-middle mb-0">
            <thead>
              <tr className="small">
                <th style={{ width: 180 }}></th>
                <th className="text-center">品項名稱</th>
                <th className="text-center">分類</th>
                <th className="text-center">標籤</th>
                <th className="text-center" style={{ width: 90 }}>
                  啟用
                </th>
                <th className="text-center text-nowrap" style={{ width: 150 }}>
                  建立日
                </th>
                <th className="text-center text-nowrap" style={{ width: 150 }}>
                  更新日
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    載入中…
                  </td>
                </tr>
              )}
              {!loading && hasNoData && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    尚無資料
                  </td>
                </tr>
              )}

              {!loading &&
                !hasNoData &&
                items.map((row) => {
                  const isDeleted = Boolean(row.deletedAt);
                  return (
                    <tr key={row.id}>
                      <td>
                        {!isDeleted ? (
                          <div
                            className="d-flex justify-content-center gap-2 flex-nowrap"
                            role="group"
                          >
                            <button
                              className="btn btn-sm btn-bg-edit text-nowrap"
                              onClick={() => onEdit(row)}
                            >
                              <Pencil size={14} className="me-1" />
                              編輯
                            </button>
                            <button
                              className="btn btn-sm btn-bg-delete text-nowrap"
                              onClick={() => onSoftDelete(row)}
                            >
                              <Trash2 size={14} className="me-1" />
                              刪除
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-success text-nowrap"
                            onClick={() => onRestore(row)}
                          >
                            <RotateCcw size={14} className="me-1" />
                            復原
                          </button>
                        )}
                      </td>

                      <td className="text-nowrap">{row.itemName ?? "—"}</td>
                      <td className="text-nowrap">
                        {joinLabels(
                          [row.category].filter(Boolean),
                          HOUSEHOLD_CATEGORY_LABEL,
                        )}
                      </td>
                      <td className="text-nowrap">{joinLabels(row.tags, HOUSEHOLD_TAG_LABEL)}</td>
                      <td className="text-nowrap">
                        {row.isActive === false ? (
                          <span className="badge badge-bg-notActive">停用</span>
                        ) : (
                          <span className="badge badge-bg-isActive">啟用</span>
                        )}
                      </td>
                      <td className="text-muted text-nowrap">
                        {formatYMD(row.createdAt)}
                      </td>
                      <td className="text-muted text-nowrap">
                        {formatYMD(row.updatedAt || row.createdAt)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
