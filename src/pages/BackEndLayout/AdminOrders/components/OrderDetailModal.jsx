import { formatYMD } from "../../utils/date";

function renderPlanContentItems(items = [], idKey) {
  if (!Array.isArray(items) || items.length === 0) return "—";
  return items.map((item) => `${item?.[idKey] ?? "?"} × ${item?.qty ?? 0}`).join("、");
}

export default function OrderFormDetail({ subscriptions = [] }) {
  return (
    <section className="mt-4">
      <div className="admin-pages__panel">
        <div className="admin-pages__panelHeader">
          <div className="text-white">訂閱明細（Subscriptions）</div>
        </div>

        <div className="admin-pages__panelBody">
          {subscriptions.length === 0 ? (
            <div className="text-muted small">此訂單目前無訂閱明細</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {subscriptions.map((sub, index) => (
                <div key={sub.subscriptionId || index} className="border rounded p-3">
                  <div className="row g-3">
                    {/* 你若想完全不顯示 id，可把 subscriptionId / planId 這兩塊刪掉 */}
                    <div className="col-12 col-lg-6">
                      <div className="small text-muted">訂閱編號</div>
                      <div className="fw-semibold">{sub.subscriptionId ?? "—"}</div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="small text-muted">方案名稱</div>
                      <div className="fw-semibold">{sub.subscriptionPlan ?? "—"}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">方案 ID</div>
                      <div>{sub.planId ?? "—"}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">數量</div>
                      <div>{sub.subscriptionQuantity ?? "—"}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">期數</div>
                      <div>{sub.termCycles ?? "—"}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">開始日</div>
                      <div>{formatYMD(sub.startDate)}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">目前期數</div>
                      <div>
                        {sub.currentCycleIndex ?? "—"} / {sub.currentCycleTotal ?? "—"}
                      </div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">出貨狀態</div>
                      <div>{sub.shippingStatus ?? "—"}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">已出貨日</div>
                      <div>{formatYMD(sub.shippedDate)}</div>
                    </div>

                    <div className="col-6 col-lg-3">
                      <div className="small text-muted">下次出貨日</div>
                      <div>{formatYMD(sub.nextShippedDate)}</div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div className="small text-muted">訂閱狀態</div>
                      <div>{sub.subscriptionStatus ?? "—"}</div>
                    </div>

                    {/* planContent */}
                    <div className="col-12">
                      <details>
                        <summary className="cursor-pointer">方案內容（planContent）</summary>
                        <div className="mt-2 small">
                          <div>
                            <span className="text-muted">Snacks：</span>
                            {renderPlanContentItems(sub?.planContent?.snacks, "treatId")}
                          </div>
                          <div>
                            <span className="text-muted">Cans：</span>
                            {renderPlanContentItems(sub?.planContent?.cans, "treatId")}
                          </div>
                          <div>
                            <span className="text-muted">Toys：</span>
                            {renderPlanContentItems(sub?.planContent?.toys, "toyId")}
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}