import { useEffect, useMemo, useState} from "react";
import { useForm, useWatch  } from "react-hook-form";
import SubscriptionDetailModal from "./SubscriptionDetailModal";

const SUBSCRIPTION_STATUS_OPTIONS = ["訂閱中", "暫停中", "已完成", "已取消"];

export default function SubscriptionFormModal({
  open,
  mode, // "create" | "edit"
  initialData,
  onClose,
  onSave,
  treatNameById = {},
  toyNameById = {},
  householdNameById = {},
}) {
  const [rootError, setRootError] = useState("");

  const defaultValues = useMemo(
    () => ({
      id: initialData?.id ?? "",
      subscriptionId: initialData?.id ?? "",

      orderId: initialData?.orderId ?? "",
      cartId: initialData?.cartId ?? "",
      userId: initialData?.userId ?? "",
      dogId: initialData?.dogId ?? "",

      planId: initialData?.planId ?? "",
      planName: initialData?.planName ?? "",

      subscriptionQuantity: Number(initialData?.subscriptionQuantity ?? 1),
      termCycles: Number(initialData?.termCycles ?? 3),
      currentCycleIndex: Number(initialData?.currentCycleIndex ?? 1),
      currentCycleTotal: Number(
        initialData?.currentCycleTotal ?? initialData?.termCycles ?? 3,
      ),

      shippingStatus: initialData?.shippingStatus ?? "待出貨",
      subscriptionStatus: initialData?.subscriptionStatus ?? "訂閱中",

      startDate: toDateInput(initialData?.startDate ?? new Date()),
      shippedDate: toDateInput(initialData?.shippedDate),
      nextShippedDate: toDateInput(initialData?.nextShippedDate ?? new Date()),
    }),
    [initialData],
  );

  const displayMeta = useMemo(() => {
    const now = new Date();

    if (mode === "create") {
      return {
        createdAt: formatDateTimeDisplay(now),
        updatedAt: formatDateTimeDisplay(now),
      };
    }

    return {
      createdAt: formatDateTimeDisplay(initialData?.createdAt) || "—",
      updatedAt: formatDateTimeDisplay(now),
    };
  }, [mode, initialData]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  // const termCycles = Number(watch("termCycles") || 1);
  const termCycles = useWatch({ control, name: "termCycles" });
  // const currentCycleIndex = Number(watch("currentCycleIndex") || 1);
  const currentCycleIndex = useWatch({ control, name: "currentCycleIndex" });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
      // setRootError("");
    }
  }, [open, defaultValues, reset]);

  useEffect(() => {
    const safeTermCycles = Math.max(1, termCycles || 1);

    setValue("currentCycleTotal", safeTermCycles, {
      shouldValidate: false,
      shouldDirty: true,
    });

    if (currentCycleIndex > safeTermCycles) {
      setValue("currentCycleIndex", safeTermCycles, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    if (currentCycleIndex < 1) {
      setValue("currentCycleIndex", 1, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [termCycles, currentCycleIndex, setValue]);

  const submit = async (data) => {
    setRootError("");

    try {
      await onSave(data);
      onClose();
    } catch (err) {
      setRootError(
        typeof err === "string" ? err : err?.message || "送出失敗，請稍後再試",
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
        className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable admin-modal__dialog"
        role="document"
      >
        <div className="modal-content border-0 shadow admin-modal__content">
          <div className="admin-modal__header admin-pages__panelHeader">
            <h4 className="text-white fw-bold m-0">
              {mode === "create" ? "新增訂閱" : "編輯訂閱"}
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
                <div className="col-xl-4">
                  <label className="form-label small">訂閱編號</label>
                  <input
                    className="form-control form-control-sm"
                    disabled
                    {...register("subscriptionId")}
                  />
                  <input type="hidden" {...register("id")} />
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">訂單編號</label>
                  <input
                    className="form-control form-control-sm"
                    {...register("orderId")}
                  />
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">方案名稱</label>
                  <input
                    className={`form-control form-control-sm ${
                      errors.planName ? "is-invalid" : ""
                    }`}
                    {...register("planName", {
                      required: "請輸入方案名稱",
                    })}
                  />
                  {errors.planName && (
                    <div className="invalid-feedback">
                      {errors.planName.message}
                    </div>
                  )}
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">期數</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control form-control-sm"
                    {...register("termCycles", {
                      valueAsNumber: true,
                      min: { value: 1, message: "期數至少為 1" },
                    })}
                  />
                  {errors.termCycles && (
                    <div className="invalid-feedback d-block">
                      {errors.termCycles.message}
                    </div>
                  )}
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">目前期數</label>
                  <input
                    type="number"
                    min="1"
                    max={termCycles}
                    className="form-control form-control-sm"
                    {...register("currentCycleIndex", {
                      valueAsNumber: true,
                      min: { value: 1, message: "至少為第 1 期" },
                    })}
                  />
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">總期數</label>
                  <input
                    className="form-control form-control-sm"
                    disabled
                    {...register("currentCycleTotal")}
                  />
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">開始日</label>
                  <input
                    type="date"
                    className={`form-control form-control-sm ${
                      errors.startDate ? "is-invalid" : ""
                    }`}
                    {...register("startDate", {
                      required: "請輸入開始日",
                    })}
                  />
                  {errors.startDate && (
                    <div className="invalid-feedback">
                      {errors.startDate.message}
                    </div>
                  )}
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">下次出貨日</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    {...register("nextShippedDate")}
                  />
                </div>

                <div className="col-xl-4"></div>

                <div className="col-xl-4">
                  <label className="form-label small">出貨狀態</label>
                  <input
                    className="form-control form-control-sm"
                    {...register("shippingStatus")}
                  />
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">訂閱狀態</label>
                  <select
                    className="form-select form-select-sm"
                    {...register("subscriptionStatus")}
                  >
                    {SUBSCRIPTION_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-xl-4"></div>

                <div className="col-xl-4">
                  <label className="form-label small">建立日</label>
                  <input
                    className="form-control form-control-sm"
                    value={displayMeta.createdAt}
                    disabled
                  />
                </div>

                <div className="col-xl-4">
                  <label className="form-label small">更新日</label>
                  <input
                    className="form-control form-control-sm"
                    value={displayMeta.updatedAt}
                    disabled
                  />
                </div>
              </div>

              {mode === "edit" && initialData && (
                <SubscriptionDetailModal
                  subscription={initialData}
                  defaultOpen={false}
                  treatNameById={treatNameById}
                  toyNameById={toyNameById}
                  householdNameById={householdNameById}
                />
              )}
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

function formatDateTimeDisplay(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function toDateInput(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
