import { Eraser, Plus, RefreshCw } from "lucide-react";

export default function PlanFiltersPanel({
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
            {/* 關鍵字 */}
            <div className="col-lg-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  關鍵字
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control form-control-sm"
                    value={filters.keyword}
                    onChange={setFilter("keyword")}
                    placeholder="方案副標 / 名稱池"
                  />
                </div>
              </div>
            </div>

            {/* 月數 */}
            <div className="col-lg-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  月數
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select form-select-sm"
                    value={filters.months}
                    onChange={setFilter("months")}
                  >
                    <option value="">全部</option>
                    <option value="3">3 個月</option>
                    <option value="6">6 個月</option>
                    <option value="12">12 個月</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 啟用 */}
            <div className="col-lg-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  啟用
                </label>
                <div className="col-sm-10">
                  <div className="admin-pages__radioGroup">
                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="plan_isActive"
                        value=""
                        checked={filters.isActive === ""}
                        onChange={setFilter("isActive")}
                      />
                      <label className="form-check-label small">全部</label>
                    </div>

                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="plan_isActive"
                        value="true"
                        checked={filters.isActive === "true"}
                        onChange={setFilter("isActive")}
                      />
                      <label className="form-check-label small">啟用</label>
                    </div>

                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="plan_isActive"
                        value="false"
                        checked={filters.isActive === "false"}
                        onChange={setFilter("isActive")}
                      />
                      <label className="form-check-label small">停用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 價格區間 */}
            <div className="col-lg-6 col-xl-4">
              <div className="row g-2 admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  價格
                </label>
                <div className="col-sm-10">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={filters.planPriceMin}
                      onChange={setFilter("planPriceMin")}
                      placeholder="最低"
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={filters.planPriceMax}
                      onChange={setFilter("planPriceMax")}
                      placeholder="最高"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 建立日 */}
            <div className="col-lg-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  建立日
                </label>
                <div className="col-sm-10">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.createdAtStart}
                      onChange={setFilter("createdAtStart")}
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.createdAtEnd}
                      onChange={setFilter("createdAtEnd")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4 d-none d-xl-block" />
          </div>
        </div>

        <div className="admin-pages__panelFooter">
          <div className="row align-items-center g-3">
            <div className="col-md-4" />
            <div className="col-md-4">
              <div className="d-flex justify-content-center gap-4 ">
                <button className="btn btn-style btn-sm text-nowrap" type="button" onClick={onCreate}>
                  <Plus size={16} className="me-2" />
                  新增方案
                </button>

                <button
                  className="btn btn-style btn-sm text-nowrap"
                  type="button"
                  onClick={onRefresh}
                  disabled={loading}
                >
                  <RefreshCw size={16} className="me-2" />
                  重新整理
                </button>

                <button
                  className="btn btn-style btn-sm text-nowrap"
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