import { Pencil, RotateCcw } from "lucide-react";
import { formatYMD } from "../../utils/date";

export default function UserResultsTable({
  loading,
  users, 
  hasNoData,
  onEdit,
  // onSoftDelete, 
  onRestore,
}) {
  return (
    <section className="admin-pages__results">
      <div className="admin-pages__panel">
        <div className="table-responsive">
          <table className="table admin-pages__table align-middle mb-0">
            <thead>
              <tr className="small">
                <th style={{ width: 170 }}></th>
                <th className="text-center">Email</th>
                <th className="text-center" style={{ width: 110 }}>
                  姓名
                </th>
                <th className="text-center" style={{ width: 110 }}>
                  暱稱
                </th>
                <th className="text-center" style={{ width: 150 }}>
                  生日
                </th>
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
                  <td colSpan={8} className="text-center py-4 text-muted">
                    載入中…
                  </td>
                </tr>
              )}

              {!loading && hasNoData && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    尚無資料
                  </td>
                </tr>
              )}

              {!loading &&
                !hasNoData &&
                users.map((u) => {

                  const isDeleted = Boolean(u.deletedAt);

                  return (
                    <tr key={u.id}>
                      <td>
                        {!isDeleted ? (
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-sm btn-bg-edit"
                              onClick={() => onEdit(u)}
                            >
                              <Pencil size={14} className="me-1" />
                              編輯
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => onRestore(u)}
                          >
                            <RotateCcw size={16} className="me-1" />
                            復原
                          </button>
                        )}
                      </td>

                      <td className="text-break">{u.email ?? "—"}</td>
                      <td>{u.name ?? "—"}</td>
                      <td>{u.nickname ?? "—"}</td>
                      <td className="text-nowrap">{formatYMD(u.birthday)}</td>

                      <td>
                        {u.isActive === false ? (
                          <span className="badge badge-bg-notActive">停用</span>
                        ) : (
                          <span className="badge badge-bg-isActive">啟用</span>
                        )}
                      </td>

                      <td className="text-muted text-nowrap">{formatYMD(u.createdAt)}</td>
                      <td className="text-muted text-nowrap">{formatYMD(u.updatedAt)}</td>
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