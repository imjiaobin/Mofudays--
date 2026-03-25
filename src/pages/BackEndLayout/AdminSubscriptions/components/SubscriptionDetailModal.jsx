import { useMemo, useState } from "react";

export default function SubscriptionDetailModal({
  subscription,
  defaultOpen = false,
  treatNameById = {},
  toyNameById = {},
  householdNameById = {},
}) {
  const [open, setOpen] = useState(defaultOpen);

  const cycleRows = useMemo(() => {
    const total = Math.max(
      1,
      Number(subscription?.termCycles ?? subscription?.currentCycleTotal ?? 1),
    );

    return Array.from({ length: total }, (_, index) => {
      const cycleNo = index + 1;
      return {
        cycleNo,
        snacks: renderContentItems(
          subscription?.planContent?.snacks,
          "treatId",
          { treatNameById, toyNameById, householdNameById },
        ),
        households: renderContentItems(
          subscription?.planContent?.cans,
          "householdsId",
          { treatNameById, toyNameById, householdNameById },
        ),
        toys: renderContentItems(subscription?.planContent?.toys, "toyId", {
          treatNameById,
          toyNameById,
          householdNameById,
        }),
        status: getCycleStatus(subscription, cycleNo),
      };
    });
  }, [subscription, treatNameById, toyNameById, householdNameById]);

  if (!subscription) return null;

  return (
    <section className="mt-5">
      <div className="mb-2">
        <button
          type="button"
          className="btn btn-detail-modal btn-sm d-inline-flex align-items-center gap-2 admin-pages__collapseToggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="subscription-cycle-detail"
        >
          <span className="admin-pages__collapseCaret" aria-hidden>
            ▸
          </span>
          <span>檢視每期內容</span>
          <small>共 {cycleRows.length} 期</small>
        </button>
      </div>

      <div
        id="subscription-cycle-detail"
        className={`admin-pages__collapse ${open ? "is-open" : ""}`}
      >
        <div className="admin-pages__collapseInner">
          <div className="admin-pages__collapseContent">
            {/* <div className="admin-pages__detailNote alert alert-light border small mb-3">
              目前 db.json 的 subscription 只有一份 <code>planContent</code>，
              所以下方先以「每期共用同一份內容」的方式呈現。
            </div> */}

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <div className="admin-pages__detailCard">
                  <div className="admin-pages__detailLabel">訂閱編號</div>
                  <div className="admin-pages__detailValue">
                    {subscription?.id || "—"}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="admin-pages__detailCard">
                  <div className="admin-pages__detailLabel">方案名稱</div>
                  <div className="admin-pages__detailValue">
                    {subscription?.planName || "—"}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="admin-pages__detailCard">
                  <div className="admin-pages__detailLabel">目前進度</div>
                  <div className="admin-pages__detailValue">
                    {subscription?.currentCycleIndex ?? "—"} /{" "}
                    {subscription?.currentCycleTotal ??
                      subscription?.termCycles ??
                      "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table admin-pages__table align-middle mb-0">
                <thead>
                  <tr className="small">
                    <th className="text-center text-nowrap">期數</th>
                    <th className="text-center text-nowrap">點心</th>
                    <th className="text-center text-nowrap">玩具</th>
                    <th className="text-center text-nowrap">生活小物</th>
                    <th className="text-center text-nowrap">本期狀態</th>
                  </tr>
                </thead>

                <tbody>
                  {cycleRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted">
                        此訂閱目前無期數內容
                      </td>
                    </tr>
                  ) : (
                    cycleRows.map((row) => (
                      <tr key={row.cycleNo}>
                        <td className="text-center text-nowrap fw-semibold">
                           {row.cycleNo} 
                        </td>
                        <td className="text-center">{row.snacks}</td>
                        <td className="text-center">{row.toys}</td>
                        <td className="text-center">{row.households}</td>
                        <td className="text-center text-nowrap">
                          {row.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderContentItems(items = [], idKey, maps = {}) {
  if (!Array.isArray(items) || items.length === 0) return "—";

  const { treatNameById = {}, toyNameById = {}, householdNameById = {} } = maps;

  return items
    .map((item) => {
      const qty = Number(item?.qty ?? 0);

      if (idKey === "treatId") {
        const id = String(item?.treatId ?? "");
        const name = String(item?.treatName ?? treatNameById[id] ?? "");
        return `${name ? `${name} ` : ""}× ${qty}`;
      }

      if (idKey === "toyId") {
        const id = String(item?.toyId ?? "");
        const name = String(item?.toyName ?? toyNameById[id] ?? "");
        return `${name ? `${name} ` : ""}× ${qty}`;
      }

      if (idKey === "householdId") {
        const id = String(item?.householdId ?? "");
        const name = String(item?.householdName ?? householdNameById[id] ?? "");
        return `${name ? `${name} ` : ""}× ${qty}`;
      }

      return `× ${qty}`;
    })
    .join("、");
}

function getCycleStatus(subscription, cycleNo) {
  const total = Math.max(
    1,
    Number(subscription?.termCycles ?? subscription?.currentCycleTotal ?? 1),
  );
  const current = Math.min(
    total,
    Math.max(1, Number(subscription?.currentCycleIndex ?? 1)),
  );

  const subscriptionStatus = subscription?.subscriptionStatus ?? "訂閱中";
  const shippingStatus = subscription?.shippingStatus ?? "待出貨";

  if (subscriptionStatus === "已取消") {
    return cycleNo < current ? "已配送" : "已取消";
  }

  if (subscriptionStatus === "已完成") {
    return "已完成";
  }

  if (cycleNo < current) {
    return "已配送";
  }

  if (cycleNo === current) {
    return shippingStatus;
  }

  return "待配送";
}
