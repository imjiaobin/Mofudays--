import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DIET_STAGE_OPTIONS,
  HEALTH_CARE_OPTIONS,
  INGREDIENT_OPTIONS,
  PET_SIZE_OPTIONS,
  TEXTURE_OPTIONS,
} from "../../inventoryOptions";

function formatDateTimeDisplay(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function nowDateTimeDisplay() {
  return formatDateTimeDisplay(new Date());
}

function CheckboxGroup({ name, options, register, error, baseId }) {
  return (
    <>
      <div className="d-flex flex-wrap gap-3">
        {options.map((opt) => (
          <div className="form-check m-0" key={opt}>
            <input
              id={`${baseId}_${opt}`}
              type="checkbox"
              value={opt}
              className="form-check-input"
              {...register(name, {
                validate: (v) =>
                  (Array.isArray(v) && v.length > 0) || "請至少選擇一項",
              })}
            />
            <label
              className="form-check-label small"
              htmlFor={`${baseId}_${opt}`}
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
      {error && <div className="invalid-feedback d-block">{error.message}</div>}
    </>
  );
}

export default function TreatFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSave,
}) {
  const [rootError, setRootError] = useState("");

  const defaultValues = useMemo(
    () => ({
      treatName: initialData?.treatName ?? "",
      petSize: initialData?.petSize ?? [],
      dietStage: initialData?.dietStage ?? [],
      ingredients: initialData?.ingredients ?? [],
      texture: initialData?.texture ?? "",
      healthCare: initialData?.healthCare ?? [],
      description: initialData?.description ?? "",
      isActive: String(initialData?.isActive ?? true),
    }),
    [initialData],
  );

  const displayMeta = useMemo(() => {
    const now = nowDateTimeDisplay();
    if (mode === "create") return { createdAt: now, updatedAt: now };
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
  } = useForm({ mode: "onBlur", defaultValues });

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
      setRootError(
        typeof err === "string"
          ? err
          : err?.message || "送出失敗，請稍後再試。",
      );
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
              {mode === "create" ? "新增零食" : "編輯零食"}
            </h4>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className="modal-body admin-modal__body admin-pages__panelBody">
              {rootError && (
                <div className="alert alert-danger py-2 mb-3">{rootError}</div>
              )}

              <div className="row g-4">
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      零食名稱
                    </label>
                    <div className="col-sm-10">
                      <input
                        className={`form-control form-control-sm ${errors.treatName ? "is-invalid" : ""}`}
                        {...register("treatName", {
                          required: "請輸入零食名稱",
                        })}
                      />
                      {errors.treatName && (
                        <div className="invalid-feedback">
                          {errors.treatName.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      描述
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control form-control-sm"
                        {...register("description")}
                      />
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
                            id="treat_active_true"
                            type="radio"
                            value="true"
                            className="form-check-input"
                            {...register("isActive")}
                          />
                          <label
                            className="form-check-label small"
                            htmlFor="treat_active_true"
                          >
                            啟用
                          </label>
                        </div>
                        <div className="form-check form-check-inline m-0">
                          <input
                            id="treat_active_false"
                            type="radio"
                            value="false"
                            className="form-check-input"
                            {...register("isActive")}
                          />
                          <label
                            className="form-check-label small"
                            htmlFor="treat_active_false"
                          >
                            停用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      體型
                    </label>
                    <div className="col-sm-10 pt-sm-3">
                      <CheckboxGroup
                        name="petSize"
                        options={PET_SIZE_OPTIONS}
                        register={register}
                        error={errors.petSize}
                        baseId="treat_petSize"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      年齡
                    </label>
                    <div className="col-sm-10 pt-sm-3">
                      <CheckboxGroup
                        name="dietStage"
                        options={DIET_STAGE_OPTIONS}
                        register={register}
                        error={errors.dietStage}
                        baseId="treat_dietStage"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4"></div>

                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      保健
                    </label>
                    <div className="col-sm-10">
                      <CheckboxGroup
                        name="healthCare"
                        options={HEALTH_CARE_OPTIONS}
                        register={register}
                        error={errors.healthCare}
                        baseId="treat_healthCare"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="row g-2 admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      成分
                    </label>
                    <div className="col-sm-10 pt-sm-3">
                      <CheckboxGroup
                        name="ingredients"
                        options={INGREDIENT_OPTIONS}
                        register={register}
                        error={errors.ingredients}
                        baseId="treat_ingredients"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4"></div>
                <div className="col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      口感
                    </label>
                    <div className="col-sm-10">
                      <select
                        className={`form-select form-select-sm ${errors.texture ? "is-invalid" : ""}`}
                        {...register("texture", { required: "請選擇口感" })}
                      >
                        <option value="">請選擇</option>
                        {TEXTURE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.texture && (
                        <div className="invalid-feedback">
                          {errors.texture.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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
