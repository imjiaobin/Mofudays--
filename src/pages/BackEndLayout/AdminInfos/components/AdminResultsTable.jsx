import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { formatYMD } from "../../utils/date";

export default function AdminResultsTable({
  loading,
  admins,       // 傳「pagedAdmins」
  hasNoData,    // 傳 visibleAdmins.length === 0
  currentAdmin,
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
                <th style={{ width: 150 }}></th>
                <th className="text-center">Email</th>
                <th className="text-center" style={{ width: 100 }}>
                  角色
                </th>
                <th className="text-center" style={{ width: 100 }}>
                  姓名
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
                admins.map((a) => {
                  // const isMe = currentAdmin?.id && a.id === currentAdmin.id;
                  const isDeleted = Boolean(a.deletedAt);

                  return (
                    <tr key={a.id}>
                      <td>
                        {!isDeleted ? (
                          <div className="btn-group" role="group">
                            <button className="btn btn-sm btn-bg-edit" onClick={() => onEdit(a)}>
                              <Pencil size={14} className="me-1" />
                              編輯
                            </button>

                            {/* <button
                              className={`btn btn-sm ${isMe ? "btn-disabled" : "btn-bg-delete"}`}
                              onClick={() => onSoftDelete(a)}
                              disabled={isMe}
                              title={isMe ? "不能刪除目前登入的自己" : ""}
                            >
                              <Trash2 size={14} className="me-1" />
                              刪除
                            </button> */}
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-outline-success" onClick={() => onRestore(a)}>
                            <RotateCcw size={16} className="me-1" />
                            復原
                          </button>
                        )}
                      </td>

                      <td className="text-break">{a.email ?? "—"}</td>
                      <td>
                        <span>{a.role ?? "—"}</span>
                      </td>
                      <td>{a.name ?? "—"}</td>
                      <td className="text-nowrap">{formatYMD(a.birthday)}</td>

                      <td>
                        {a.isActive === false ? (
                          <span className="badge badge-bg-notActive">停用</span>
                        ) : (
                          <span className="badge badge-bg-isActive">啟用</span>
                        )}
                      </td>

                      <td className="text-muted text-nowrap">{formatYMD(a.createdAt)}</td>
                      <td className="text-muted text-nowrap">{formatYMD(a.updatedAt)}</td>
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