import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import OrderFormDetail from "./OrderDetailModal";

export default function OrderFormModal({
  open,
  mode, // "create" | "edit"
  initialData,
  onClose,
  onSave,
}) {
  const [rootError, setRootError] = useState("");

  const defaultValues = useMemo(
    () => ({
      id: initialData?.id ?? "",
      orderNo: initialData?.orderNo ?? initialData?.id ?? "",
      orderDate: toDateTimeLocalInput(initialData?.orderDate ?? new Date()),
      termCycles: Number(initialData?.termCycles ?? 3),
      perCycleAmount: Number(initialData?.perCycleAmount ?? 0),
      orderTotalAmount: Number(initialData?.orderTotalAmount ?? 0),
      paymentStatus: initialData?.paymentStatus ?? "待付款",
      orderStatus: initialData?.orderStatus ?? "待確認",
      buyerName: initialData?.buyerInfo?.name ?? "",
      buyerEmail: initialData?.buyerInfo?.email ?? "",
      buyerPhone: initialData?.buyerInfo?.phone ?? "",
      buyerAddress: initialData?.buyerInfo?.address ?? "",
      note: initialData?.note ?? "",
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
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const termCycles = useWatch({ control, name: "termCycles" });
  const perCycleAmount = useWatch({ control, name: "perCycleAmount" });
  const paymentStatus = useWatch({ control, name: "paymentStatus" });

  useEffect(() => {
    if (mode !== "create") return;

    const total = termCycles * perCycleAmount;
    setValue("orderTotalAmount", Number.isFinite(total) ? total : 0, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }, [mode, termCycles, perCycleAmount, setValue]);

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
      className="modal d-block admin-modal__backdrop admin-pages"
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
              {mode === "create" ? "新增訂單" : "編輯訂單"}
            </h4>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className="modal-body admin-modal__body admin-pages__panelBody">
              {rootError && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {rootError}
                </div>
              )}

              {/* {orderSectionOpen && ( */}
              <div className="row g-4">
                {/* 訂單編號 */}
                <div className="col-xl-4">
                  <label className="form-label small">訂單編號</label>
                  <input
                    className="form-control form-control-sm"
                    disabled
                    {...register("orderNo")}
                  />
                  <input type="hidden" {...register("id")} />
                </div>
                {/* 付款狀態 */}
                <div className="col-xl-4">
                  <label className="form-label small">付款狀態</label>
                  <select
                    className="form-select form-select-sm"
                    value={paymentStatus ?? "待付款"}
                    disabled
                  >
                    <option value="待付款">待付款</option>
                    <option value="已付款">已付款</option>
                    <option value="付款失敗">付款失敗</option>
                    <option value="退款中">退款中</option>
                    <option value="已退款">已退款</option>
                  </select>
                  <input type="hidden" {...register("paymentStatus")} />
                </div>
                {/* 訂單狀態 */}
                <div className="col-xl-4">
                  <label className="form-label small">訂單狀態</label>
                  <select
                    className="form-select form-select-sm"
                    {...register("orderStatus")}
                  >
                    <option value="待確認">待確認</option>
                    <option value="處理中">處理中</option>
                    <option value="已出貨">已出貨</option>
                    <option value="已完成">已完成</option>
                    <option value="已取消">已取消</option>
                  </select>
                </div>
                {/* 訂單總金額 */}
                <div className="col-xl-4">
                  <label className="form-label small">訂單總金額</label>
                  <input
                    type="number"
                    min="0"
                    disabled
                    className="form-control form-control-sm"
                    {...register("orderTotalAmount", { valueAsNumber: true })}
                  />
                  <input type="hidden" {...register("orderTotalAmount")} />
                </div>
                {/* 訂單日期 */}
                <div className="col-xl-4">
                  <label className="form-label small">訂單日期</label>
                  <input
                    type="datetime-local"
                    disabled
                    className={`form-control form-control-sm ${
                      errors.orderDate ? "is-invalid" : ""
                    }`}
                    {...register("orderDate", { required: "請輸入訂單日期" })}
                  />
                  <input type="hidden" {...register("orderDate")} />
                  {errors.orderDate && (
                    <div className="invalid-feedback">
                      {errors.orderDate.message}
                    </div>
                  )}
                </div>
                <div className="col-xl-4" />
                {/* 客戶名稱 */}
                <div className="col-xl-4">
                  <label className="form-label small">客戶名稱</label>
                  <input
                    className="form-control form-control-sm"
                    {...register("buyerName")}
                  />
                </div>
                {/* 客戶 Email */}
                <div className="col-xl-4">
                  <label className="form-label small">客戶Email</label>
                  <input
                    className={`form-control form-control-sm ${
                      errors.buyerEmail ? "is-invalid" : ""
                    }`}
                    {...register("buyerEmail", {
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Email 格式不正確",
                      },
                    })}
                  />
                  {errors.buyerEmail && (
                    <div className="invalid-feedback">
                      {errors.buyerEmail.message}
                    </div>
                  )}
                </div>
                {/* 客戶電話 */}
                <div className="col-xl-4">
                  <label className="form-label small">客戶電話</label>
                  <input
                    className="form-control form-control-sm"
                    {...register("buyerPhone")}
                  />
                </div>
                {/* 客戶地址 */}
                <div className="col-xl-12">
                  <label className="form-label small">客戶地址</label>
                  <input
                    className="form-control form-control-sm"
                    {...register("buyerAddress")}
                  />
                </div>
                <div className="col-xl-12">
                  <label className="form-label small">備註</label>
                  <textarea
                    rows={3}
                    className="form-control form-control-sm"
                    {...register("note")}
                  />
                </div>

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

                <div className="col-xl-4">
                  <label className="form-label small">更新日</label>
                  <input
                    className="form-control form-control-sm"
                    value={displayMeta.updatedAt}
                    disabled
                  />
                </div>
              </div>

              {/* 訂閱明細（預設收起） */}
              {mode === "edit" && (
                <OrderFormDetail
                  subscriptions={initialData?.subscriptions || []}
                  defaultOpen={false}
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

function toDateTimeLocalInput(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}
