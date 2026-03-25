import { Eraser, Plus, RefreshCw } from "lucide-react";
import { SUBSCRIPTION_STATUS_OPTIONS } from "../../utils/subscriptionMeta";

export default function SubscriptionFiltersPanel({
  filters,
  setFilter,
  clearFilters,
  hasActiveFilters,
  onCreate,
  onRefresh,
  loading,
}) {
  return (
    <section className="admin-pages__filters mb-5">
      <div className="admin-pages__panel">
        <div className="admin-pages__panelHeader">
          <div>
            <div className="text-white">搜尋條件</div>
          </div>
        </div>

        <div className="admin-pages__panelBody">
          <div className="row g-4">
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂閱編號
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.subscriptionId}
                    onChange={setFilter("subscriptionId")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂單編號
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.orderId}
                    onChange={setFilter("orderId")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  方案名稱
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.planName}
                    onChange={setFilter("planName")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  出貨狀態
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.shippingStatus}
                    onChange={setFilter("shippingStatus")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂閱狀態
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select form-select-sm admin-pages__select"
                    value={filters.subscriptionStatus}
                    onChange={setFilter("subscriptionStatus")}
                  >
                    <option value="">全部</option>
                    {SUBSCRIPTION_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  開始日期
                </label>
                <div className="col-sm-9">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.startDateStart}
                      onChange={setFilter("startDateStart")}
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.startDateEnd}
                      onChange={setFilter("startDateEnd")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-pages__panelFooter">
          <div className="row align-items-center g-3">
            <div className="col-md-4" />
            <div className="col-md-4">
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {/* 訂閱原則上不可以隨意新增, 因此先disabled, 目前先保留, 供大家後續有需要再調整 */}
                <button className="btn btn-style btn-sm" type="button" onClick={onCreate} disabled>
                  <Plus size={16} className="me-2" />
                  新增訂閱
                </button>

                <button
                  className="btn btn-style btn-sm"
                  type="button"
                  onClick={onRefresh}
                  disabled={loading}
                >
                  <RefreshCw size={16} className="me-2" />
                  重新整理
                </button>

                <button
                  className="btn btn-style btn-sm"
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                >
                  <Eraser size={16} className="me-2" />
                  清除條件
                </button>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-block" />
          </div>
        </div>
      </div>
    </section>
  );
}