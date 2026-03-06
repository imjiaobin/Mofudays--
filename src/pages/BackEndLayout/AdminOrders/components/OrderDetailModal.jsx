import { useState } from "react";
import { formatYMD } from "../../utils/date";
import { Pencil, Trash2 } from "lucide-react";

export default function OrderFormDetail({ subscriptions = [], defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="mt-5">
      <div className="mb-2">
        <button
          type="button"
          className="btn btn-detail-modal btn-sm d-inline-flex align-items-center gap-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <span aria-hidden>{open ? "▾" : "▸"}</span>
          <span>檢視訂單明細</span>
          <small>  共{subscriptions.length}筆</small>
        </button>
      </div>

      {open && (
        <div className="table-responsive ad-modal-border">
          <table className="table admin-pages__table align-middle mb-0 ">
            <thead>
              <tr className="small">
                <th className="text-center text-nowrap">操作</th>
                <th className="text-center text-nowrap">訂閱編號</th>
                <th className="text-center text-nowrap">方案名稱</th>
                <th className="text-center text-nowrap">數量</th>
                <th className="text-center text-nowrap">期數</th>
                <th className="text-center text-nowrap">開始日</th>
                <th className="text-center text-nowrap">目前期數</th>
                <th className="text-center text-nowrap">下次出貨日</th>
                <th className="text-center text-nowrap">訂閱狀態</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-4 text-muted">
                    此訂單目前無訂閱明細
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub, index) => (
                  <tr key={sub.subscriptionId || index}>

                    <tr className="text-center text-nowrap">
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <button
                              type="button"
                              className="btn btn-sm btn-bg-edit"
                              // onClick={() => onEdit(o)}
                            >
                              <Pencil size={14} className="me-1" />
                              編輯
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-bg-delete"
                              // onClick={() => onCancel(o)}
                            >
                              <Trash2 size={14} className="me-1" />
                              取消
                            </button>
                          </div>
                    </tr>

                    <td className="text-center text-nowrap">
                      {sub.subscriptionId ?? "—"}
                    </td>

                    <td className="text-center text-nowrap fw-semibold">
                      {sub.subscriptionPlan ?? "—"}
                    </td>

                    <td className="text-center text-nowrap">
                      {sub.subscriptionQuantity ?? "—"}
                    </td>

                    <td className="text-center text-nowrap">{sub.termCycles ?? "—"}</td>

                    <td className="text-center text-nowrap text-muted">
                      {formatYMD(sub.startDate)}
                    </td>

                    <td className="text-center text-nowrap">
                      {sub.currentCycleIndex ?? "—"} / {sub.currentCycleTotal ?? "—"}
                    </td>

                    <td className="text-center text-nowrap text-muted">
                      {formatYMD(sub.nextShippedDate)}
                    </td>

                    <td className="text-center text-nowrap">
                      {sub.subscriptionStatus ?? "—"}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}