import { Eraser, Plus, RefreshCw } from "lucide-react";

export default function AdminFiltersPanel({
  filters,
  setFilter,
  clearFilters,
  hasActiveFilters,
  // visibleCount,
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
            {/* Email */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g- align-items-center admin-pages__field">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  Email
                </label>
                <div className="col-12 col-sm-10">
                  <input
                    className="form-control form-control-sm"
                    value={filters.email}
                    onChange={setFilter("email")}
                    placeholder="test@mofudays.com"
                  />
                </div>
              </div>
            </div>

            {/* 姓名 */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  姓名
                </label>
                <div className="col-12 col-sm-10">
                  <input
                    className="form-control form-control-sm"
                    value={filters.name}
                    onChange={setFilter("name")}
                    placeholder="後台管理員"
                  />
                </div>
              </div>
            </div>

            {/* 角色 */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  角色
                </label>
                <div className="col-12 col-sm-10">
                  <select
                    className="form-select form-select-sm admin-pages__select"
                    value={filters.role}
                    onChange={setFilter("role")}
                  >
                    <option value="">全部</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 生日（區間） */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  生日
                </label>
                <div className="col-12 col-sm-10">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.birthdayStart}
                      onChange={setFilter("birthdayStart")}
                    />
                    <span className="small text-muted">~</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.birthdayEnd}
                      onChange={setFilter("birthdayEnd")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 建立日（區間） */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  建立日
                </label>
                <div className="col-12 col-sm-10">
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

            {/* 更新日（區間） */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g-2 admin-pages__field admin-pages__field__date">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  更新日
                </label>
                <div className="col-12 col-sm-10">
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
            </div>

            {/* 啟用（radio） */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <div className="row g-2 align-items-center admin-pages__field">
                <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                  啟用
                </label>
                <div className="col-12 col-sm-10">
                  <div className="admin-pages__radioGroup">
                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isActiveFilter"
                        id="isActive_all"
                        value=""
                        checked={filters.isActive === ""}
                        onChange={setFilter("isActive")}
                      />
                      <label
                        className="form-check-label small"
                        htmlFor="isActive_all"
                      >
                        全部
                      </label>
                    </div>

                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isActiveFilter"
                        id="isActive_true"
                        value="true"
                        checked={filters.isActive === "true"}
                        onChange={setFilter("isActive")}
                      />
                      <label
                        className="form-check-label small"
                        htmlFor="isActive_true"
                      >
                        啟用
                      </label>
                    </div>

                    <div className="form-check form-check-inline m-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isActiveFilter"
                        id="isActive_false"
                        value="false"
                        checked={filters.isActive === "false"}
                        onChange={setFilter("isActive")}
                      />
                      <label
                        className="form-check-label small"
                        htmlFor="isActive_false"
                      >
                        停用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-none d-lg-block" />
          </div>
        </div>

        <div className="admin-pages__panelFooter">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-4">
              {/* <div className="small text-muted text-center text-md-start">
                目前顯示 <span className="fw-bold">{visibleCount}</span> 筆
              </div> */}
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <button
                  className="btn btn-style btn-sm"
                  type="button"
                  onClick={onCreate}
                >
                  <Plus size={16} className="me-2" />
                  新增管理員
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

            <div className="col-12 col-md-4 d-none d-md-block" />
          </div>
        </div>
      </div>
    </section>
  );
}
