import { Eraser, Plus, RefreshCw } from "lucide-react";
import {
  ORDER_STATUS_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  // SUBSCRIPTION_STATUS_OPTIONS,
} from "../../utils/orderMeta";

export default function OrderFiltersPanel({
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
            {/* 訂單編號 */}
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂單編號
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.orderNo}
                    onChange={setFilter("orderNo")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* 客戶名稱 */}
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  客戶名稱
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.buyerName}
                    onChange={setFilter("buyerName")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* email */}
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  Email
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.buyerEmail}
                    onChange={setFilter("buyerEmail")}
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* 付款狀態 */}
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  付款狀態
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select form-select-sm admin-pages__select"
                    value={filters.paymentStatus}
                    onChange={setFilter("paymentStatus")}
                  >
                    <option value="">全部</option>
                    {PAYMENT_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 訂單狀態 */}
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂單狀態
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select form-select-sm admin-pages__select"
                    value={filters.orderStatus}
                    onChange={setFilter("orderStatus")}
                  >
                    <option value="">全部</option>
                    {ORDER_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 出貨狀態 */}
            {/* <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  出貨狀態
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control form-control-sm"
                    value={filters.shippingStatus}
                    onChange={setFilter("shippingStatus")}
                    placeholder="待出貨 / 已出貨1/3"
                  />
                </div>
              </div>
            </div> */}

            {/* 訂閱狀態 */}
            {/* <div className="col-md-6 col-xl-4">
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
            </div> */}

            {/* 啟用 */}
            {/* <div className="col-md-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  啟用
                </label>
                <div className="col-sm-9">
                  <div className="admin-pages__radioGroup">
                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="order_isActive_filter"
                        id="order_isActive_all"
                        value=""
                        checked={filters.isActive === ""}
                        onChange={setFilter("isActive")}
                      />
                      <label className="form-check-label small" htmlFor="order_isActive_all">
                        全部
                      </label>
                    </div>

                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="order_isActive_filter"
                        id="order_isActive_true"
                        value="true"
                        checked={filters.isActive === "true"}
                        onChange={setFilter("isActive")}
                      />
                      <label className="form-check-label small" htmlFor="order_isActive_true">
                        啟用
                      </label>
                    </div>

                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="order_isActive_filter"
                        id="order_isActive_false"
                        value="false"
                        checked={filters.isActive === "false"}
                        onChange={setFilter("isActive")}
                      />
                      <label className="form-check-label small" htmlFor="order_isActive_false">
                        停用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* 金額區間 */}
            {/* <div className="col-md-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂單總額
                </label>
                <div className="col-sm-9">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-sm"
                      value={filters.amountMin}
                      onChange={setFilter("amountMin")}
                      placeholder="最小"
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-sm"
                      value={filters.amountMax}
                      onChange={setFilter("amountMax")}
                      placeholder="最大"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* 訂單日期區間 */}
            <div className="col-md-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-sm-3 col-form-label col-form-label-sm admin-pages__label">
                  訂單日期
                </label>
                <div className="col-sm-9">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.orderDateStart}
                      onChange={setFilter("orderDateStart")}
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.orderDateEnd}
                      onChange={setFilter("orderDateEnd")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 建立日 */}
            {/* <div className="col-md-6 col-xl-6">
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
            </div> */}

            {/* 更新日 */}
            {/* <div className="col-md-6 col-xl-6">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  更新日
                </label>
                <div className="col-sm-10">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.updatedAtStart}
                      onChange={setFilter("updatedAtStart")}
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.updatedAtEnd}
                      onChange={setFilter("updatedAtEnd")}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="admin-pages__panelFooter">
          <div className="row align-items-center g-3">
            <div className="col-md-4" />
            <div className="col-md-4">
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <button className="btn btn-style btn-sm" type="button" onClick={onCreate}>
                  <Plus size={16} className="me-2" />
                  新增訂單
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