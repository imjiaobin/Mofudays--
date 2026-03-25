import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {formatDateTimeDisplay,nowDateTimeDisplay } from "../../utils/date";

export default function PlanFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSave,
}) {
  const [rootError, setRootError] = useState("");

  const defaultValues = useMemo(
    () => ({
      planPrice: initialData?.planPrice ?? "",
      months: initialData?.months ?? "",
      subtitle: initialData?.subtitle ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      namePoolText: Array.isArray(initialData?.namePool)
        ? initialData.namePool.join("\n")
        : "",
      contentTreats: initialData?.content?.treats ?? 0,
      contentToys: initialData?.content?.toys ?? 0,
      contentHousehold: initialData?.content?.household ?? 0,
      isActive: String(initialData?.isActive ?? true),
    }),
    [initialData],
  );

  const displayMeta = useMemo(() => {
    const now = nowDateTimeDisplay();

    if (mode === "create") {
      return {
        createdAt: now,
        updatedAt: now,
      };
    }

    return {
      createdAt: formatDateTimeDisplay(initialData?.createdAt) || "—",
      updatedAt: now,
    };
  }, [mode, initialData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });
  useEffect(() => {
    if (open) {
      reset(defaultValues);
      // setRootError("");
    }
  }, [open, reset, defaultValues]);

  const submit = async (data) => {
    setRootError("");

    try {
      await onSave(data);
      onClose();
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.message || "送出失敗，請稍後再試。";
      setRootError(msg);
    }
  };

  if (!open) return null;

  return (
    <div
      className="modal d-block admin-modal__backdrop"
      tabIndex="-1"
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered admin-modal__dialog"
        role="document"
      >
        <div className="modal-content border-0 shadow admin-modal__content">
          <div className="admin-modal__header admin-pages__panelHeader">
            <h4 className="text-white fw-bold">
              {mode === "create" ? "新增方案" : "編輯方案"}
            </h4>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className="modal-body admin-modal__body admin-pages__panelBody">
              {rootError && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {rootError}
                </div>
              )}

              <div className="row g-4">
                {/* namePool */}
                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      名稱池
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        rows="4"
                        className={`form-control form-control-sm ${errors.namePoolText ? "is-invalid" : ""}`}
                        placeholder={`一行一個，或用逗號分隔例如：\n小小探險家\n嫩嫩咬咬\n初次見面盒`}
                        {...register("namePoolText", {
                          required: "請輸入至少一個方案名稱",
                          validate: (value) =>
                            value.trim().length > 0 || "請輸入至少一個方案名稱",
                        })}
                      />
                      {errors.namePoolText && (
                        <div className="invalid-feedback">
                          {errors.namePoolText.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* 副標 */}
                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      副標題
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        rows="4"
                        className={`form-control form-control-sm ${errors.subtitle ? "is-invalid" : ""}`}
                        {...register("subtitle", {
                          required: "請輸入副標",
                        })}
                      />
                      {errors.subtitle && (
                        <div className="invalid-feedback">
                          {errors.subtitle.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* 圖片 */}
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      圖片
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        placeholder="請輸入圖片 URL"
                        {...register("imageUrl")}
                      />
                    </div>
                  </div>
                </div>
                {/* 價格 */}
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      價格
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className={`form-control form-control-sm ${errors.planPrice ? "is-invalid" : ""}`}
                        {...register("planPrice", {
                          required: "請輸入價格",
                          min: { value: 1, message: "價格至少要大於 0" },
                        })}
                      />
                      {errors.planPrice && (
                        <div className="invalid-feedback">
                          {errors.planPrice.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 月數 */}
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      月數
                    </label>
                    <div className="col-sm-10">
                      <select
                        className={`form-select form-select-sm ${errors.months ? "is-invalid" : ""}`}
                        {...register("months", {
                          required: "請選擇月數",
                        })}
                      >
                        <option value="">請選擇</option>
                        <option value="3">3 個月</option>
                        <option value="6">6 個月</option>
                        <option value="12">12 個月</option>
                      </select>
                      {errors.months && (
                        <div className="invalid-feedback">
                          {errors.months.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 啟用 */}
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      啟用
                    </label>
                    <div className="col-sm-10">
                      <div className="admin-pages__radioGroup">
                        <div className="form-check form-check-inline m-0">
                          <input
                            id="plan_isActive_true"
                            type="radio"
                            value="true"
                            className="form-check-input"
                            {...register("isActive")}
                          />
                          <label
                            className="form-check-label small"
                            htmlFor="plan_isActive_true"
                          >
                            啟用
                          </label>
                        </div>

                        <div className="form-check form-check-inline m-0">
                          <input
                            id="plan_isActive_false"
                            type="radio"
                            value="false"
                            className="form-check-input"
                            {...register("isActive")}
                          />
                          <label
                            className="form-check-label small"
                            htmlFor="plan_isActive_false"
                          >
                            停用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* content */}
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      零食
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        {...register("contentTreats")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      玩具
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        {...register("contentToys")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      生活小物
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        {...register("contentHousehold")}
                      />
                    </div>
                  </div>
                </div>

                {/* 時間 */}
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      建立日
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        value={displayMeta.createdAt}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      更新日
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        value={displayMeta.updatedAt}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer admin-modal__footer admin-pages__panelFooter">
              <button
                className="btn btn-modal-delete"
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
              >
                取消
              </button>

              <button
                className="btn btn-modal-edit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "送出中..." : "儲存"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
