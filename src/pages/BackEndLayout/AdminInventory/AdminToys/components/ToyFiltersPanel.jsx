import { Eraser, Plus, RefreshCw } from "lucide-react";
import {
  DIET_STAGE_OPTIONS,
  PET_SIZE_OPTIONS,
  PLAY_STYLE_OPTIONS,
} from "../../inventoryOptions";

export default function ToyFiltersPanel({
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
          <div className="text-white">搜尋條件</div>
        </div>

        <div className="admin-pages__panelBody">
          <div className="row g-4">
            <div className="col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  關鍵字
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control form-control-sm"
                    value={filters.keyword}
                    onChange={setFilter("keyword")}
                    placeholder="玩具名稱 / 描述"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  體型
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select form-select-sm"
                    value={filters.petSize}
                    onChange={setFilter("petSize")}
                  >
                    <option value="">全部</option>
                    {PET_SIZE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  年齡
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select form-select-sm"
                    value={filters.dietStage}
                    onChange={setFilter("dietStage")}
                  >
                    <option value="">全部</option>
                    {DIET_STAGE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  玩法
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select form-select-sm"
                    value={filters.playStyle}
                    onChange={setFilter("playStyle")}
                  >
                    <option value="">全部</option>
                    {PLAY_STYLE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
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

            <div className="col-xl-4">
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
                        name="toy_isActive"
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
                        name="toy_isActive"
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
                        name="toy_isActive"
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
          </div>
        </div>

        <div className="admin-pages__panelFooter">
          <div className="row align-items-center g-3">
            <div className="col-md-4" />
            <div className="col-md-4">
              <div className="d-flex justify-content-center gap-4">
                <button
                  className="btn btn-style btn-sm text-nowrap"
                  type="button"
                  onClick={onCreate}
                >
                  <Plus size={16} className="me-2" />
                  新增玩具
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
            <div className="col-md-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
