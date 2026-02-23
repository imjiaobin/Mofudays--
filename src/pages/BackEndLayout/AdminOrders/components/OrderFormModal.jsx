import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
// import OrderFormDetail from "./OrderFormDetail"; // 若你在 modal 內下半部顯示 detail

function formatDateTimeDisplay(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function toDateTimeLocalInput(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

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
      orderDate: toDateTimeLocalInput(initialData?.orderDate),
      termCycles: initialData?.termCycles ?? 3,
      perCycleAmount: initialData?.perCycleAmount ?? 0,
      orderTotalAmount: initialData?.orderTotalAmount ?? 0,
      currency: initialData?.currency ?? "TWD",

      paymentStatus: initialData?.paymentStatus ?? "待付款",
      orderStatus: initialData?.orderStatus ?? "待確認",
      shippingStatus: initialData?.shippingStatus ?? "待出貨",
      subscriptionStatus: initialData?.subscriptionStatus ?? "訂閱中",

      buyer: initialData?.buyer ?? "",
      buyerName: initialData?.buyerInfo?.name ?? "",
      buyerEmail: initialData?.buyerInfo?.email ?? "",
      buyerPhone: initialData?.buyerInfo?.phone ?? "",
      buyerAddress: initialData?.buyerInfo?.address ?? "",

      note: initialData?.note ?? "",
      isActive: String(initialData?.isActive ?? true),
    }),
    [initialData]
  );

  const displayMeta = useMemo(() => {
    if (mode === "create") {
      const now = new Date();
      return {
        createdAt: formatDateTimeDisplay(now),
        updatedAt: formatDateTimeDisplay(now),
      };
    }
    return {
      createdAt: formatDateTimeDisplay(initialData?.createdAt) || "—",
      updatedAt: formatDateTimeDisplay(new Date()),
    };
  }, [mode, initialData, open]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
      setRootError("");
    }
  }, [open, defaultValues, reset]);

  // 你如果想自動計算總金額（期數 * 每期金額）
  const termCycles = Number(watch("termCycles") || 0);
  const perCycleAmount = Number(watch("perCycleAmount") || 0);

  useEffect(() => {
    const total = termCycles * perCycleAmount;
    setValue("orderTotalAmount", Number.isFinite(total) ? total : 0, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }, [termCycles, perCycleAmount, setValue]);

  const submit = async (data) => {
    setRootError("");

    try {
      // ✅ 只整理 top-level payload（subscriptions 不在這裡編）
      const payload = {
        orderDate: data.orderDate ? new Date(data.orderDate).toISOString() : null,
        termCycles: Number(data.termCycles || 0),
        perCycleAmount: Number(data.perCycleAmount || 0),
        orderTotalAmount: Number(data.orderTotalAmount || 0),
        currency: data.currency?.trim() || "TWD",

        paymentStatus: data.paymentStatus,
        orderStatus: data.orderStatus,
        shippingStatus: data.shippingStatus,
        subscriptionStatus: data.subscriptionStatus,

        buyer: data.buyer?.trim() || "",
        buyerInfo: {
          name: data.buyerName?.trim() || "",
          email: data.buyerEmail?.trim() || "",
          phone: data.buyerPhone?.trim() || "",
          address: data.buyerAddress?.trim() || "",
        },

        note: data.note?.trim() || "",
        isActive: data.isActive === "true",
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      setRootError(typeof err === "string" ? err : err?.message || "送出失敗，請稍後再試");
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
      <div className="modal-dialog modal-xl modal-dialog-centered admin-modal__dialog" role="document">
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

              {/* ✅ 這裡不再顯示 id/orderNo/userId/cartId/subscriptionIds */}
              <div className="row g-4">
                {/* 訂單日期 */}
                <div className="col-12 col-xl-4">
                  <label className="form-label small">訂單日期</label>
                  <input
                    type="datetime-local"
                    className={`form-control form-control-sm ${errors.orderDate ? "is-invalid" : ""}`}
                    {...register("orderDate", { required: "請輸入訂單日期" })}
                  />
                  {errors.orderDate && <div className="invalid-feedback">{errors.orderDate.message}</div>}
                </div>

                {/* 期數 */}
                <div className="col-12 col-xl-4">
                  <label className="form-label small">期數</label>
                  <input
                    type="number"
                    min="1"
                    className={`form-control form-control-sm ${errors.termCycles ? "is-invalid" : ""}`}
                    {...register("termCycles", {
                      required: "請輸入期數",
                      min: { value: 1, message: "期數至少 1" },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.termCycles && <div className="invalid-feedback">{errors.termCycles.message}</div>}
                </div>

                {/* 幣別 */}
                <div className="col-12 col-xl-4">
                  <label className="form-label small">幣別</label>
                  <select className="form-select form-select-sm" {...register("currency")}>
                    <option value="TWD">TWD</option>
                    <option value="USD">USD</option>
                  </select>
                </div>

                {/* 每期金額 */}
                <div className="col-12 col-xl-4">
                  <label className="form-label small">每期金額</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control form-control-sm"
                    {...register("perCycleAmount", { valueAsNumber: true })}
                  />
                </div>

                {/* 訂單總金額 */}
                <div className="col-12 col-xl-4">
                  <label className="form-label small">訂單總金額</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control form-control-sm"
                    {...register("orderTotalAmount", { valueAsNumber: true })}
                  />
                </div>

                {/* 啟用 */}
                <div className="col-12 col-xl-4">
                  <label className="form-label small d-block">啟用狀態</label>
                  <div className="admin-pages__radioGroup">
                    <div className="form-check form-check-inline m-0">
                      <input
                        id="order_isActive_true"
                        type="radio"
                        value="true"
                        className="form-check-input"
                        {...register("isActive")}
                      />
                      <label className="form-check-label small" htmlFor="order_isActive_true">
                        啟用
                      </label>
                    </div>
                    <div className="form-check form-check-inline m-0">
                      <input
                        id="order_isActive_false"
                        type="radio"
                        value="false"
                        className="form-check-input"
                        {...register("isActive")}
                      />
                      <label className="form-check-label small" htmlFor="order_isActive_false">
                        停用
                      </label>
                    </div>
                  </div>
                </div>

                {/* 狀態群組 */}
                <div className="col-12 col-xl-3">
                  <label className="form-label small">付款狀態</label>
                  <select className="form-select form-select-sm" {...register("paymentStatus")}>
                    <option value="待付款">待付款</option>
                    <option value="已付款">已付款</option>
                    <option value="付款失敗">付款失敗</option>
                    <option value="退款中">退款中</option>
                    <option value="已退款">已退款</option>
                  </select>
                </div>

                <div className="col-12 col-xl-3">
                  <label className="form-label small">訂單狀態</label>
                  <select className="form-select form-select-sm" {...register("orderStatus")}>
                    <option value="待確認">待確認</option>
                    <option value="處理中">處理中</option>
                    <option value="已出貨">已出貨</option>
                    <option value="已完成">已完成</option>
                    <option value="已取消">已取消</option>
                  </select>
                </div>

                <div className="col-12 col-xl-3">
                  <label className="form-label small">出貨狀態</label>
                  <input
                    className="form-control form-control-sm"
                    placeholder="例如：待出貨 / 已出貨1/3"
                    {...register("shippingStatus")}
                  />
                </div>

                <div className="col-12 col-xl-3">
                  <label className="form-label small">訂閱狀態</label>
                  <select className="form-select form-select-sm" {...register("subscriptionStatus")}>
                    <option value="訂閱中">訂閱中</option>
                    <option value="已暫停">已暫停</option>
                    <option value="已完成">已完成</option>
                    <option value="已取消">已取消</option>
                  </select>
                </div>

                {/* 買家資訊 */}
                <div className="col-12 col-xl-6">
                  <label className="form-label small">買家摘要（buyer）</label>
                  <input
                    className="form-control form-control-sm"
                    placeholder="王小明 (user@example.com)"
                    {...register("buyer")}
                  />
                </div>

                <div className="col-12 col-xl-3">
                  <label className="form-label small">買家姓名</label>
                  <input className="form-control form-control-sm" {...register("buyerName")} />
                </div>

                <div className="col-12 col-xl-3">
                  <label className="form-label small">買家 Email</label>
                  <input
                    className={`form-control form-control-sm ${errors.buyerEmail ? "is-invalid" : ""}`}
                    {...register("buyerEmail", {
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Email 格式不正確",
                      },
                    })}
                  />
                  {errors.buyerEmail && <div className="invalid-feedback">{errors.buyerEmail.message}</div>}
                </div>

                <div className="col-12 col-xl-4">
                  <label className="form-label small">買家電話</label>
                  <input className="form-control form-control-sm" {...register("buyerPhone")} />
                </div>

                <div className="col-12 col-xl-8">
                  <label className="form-label small">買家地址</label>
                  <input className="form-control form-control-sm" {...register("buyerAddress")} />
                </div>

                <div className="col-12">
                  <label className="form-label small">備註</label>
                  <textarea
                    rows={3}
                    className="form-control form-control-sm"
                    {...register("note")}
                  />
                </div>

                {/* 顯示用時間（唯讀） */}
                <div className="col-12 col-xl-6">
                  <label className="form-label small">建立日</label>
                  <input className="form-control form-control-sm" value={displayMeta.createdAt} disabled readOnly />
                </div>
                <div className="col-12 col-xl-6">
                  <label className="form-label small">更新日</label>
                  <input className="form-control form-control-sm" value={displayMeta.updatedAt} disabled readOnly />
                </div>
              </div>

              {/* ✅ 明細區塊：只顯示 subscriptions */}
              {/* {mode === "edit" && <OrderFormDetail subscriptions={initialData?.subscriptions || []} />} */}
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