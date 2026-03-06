import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import {formatDateTimeDisplay, nowDateTimeDisplay} from "../../utils/date"



export default function AdminFormModal({
  open, // 開啟或關閉
  mode, // 新增或修改
  initialData, // 初始狀態
  onClose, // 關閉
  onSave, // 儲存
}) {
  const [rootError, setRootError] = useState("");

  const defaultValues = useMemo(
    () => ({
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      password: "",
      nickname: initialData?.nickname ?? "",
      birthday: initialData?.birthday ?? "",
      phone: initialData?.phone ?? "",
      address: initialData?.address ?? "",
      // avatar: initialData?.avatar ?? "",
      isActive: String(initialData?.isActive ?? true),
    }),
    [initialData],
  );

  // 顯示用時間（實際存檔時間仍由父層 handleSave 的 nowISO() 決定）
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
      updatedAt: now, // 修改時顯示本次預計更新時間
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
      await onSave({
        ...data,
        isActive: data.isActive === "true",
      });
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
          {/* modal header */}
          <div className="admin-modal__header admin-pages__panelHeader">
            <h4 className="text-white fw-bold">
              {mode === "create" ? "新增管理員" : "編輯管理員"}
            </h4>

            {/* <button
              type="button"
              className="admin-modal__closeBtn"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="關閉"
              title="關閉"
            >
              <X size={16} />
            </button> */}
          </div>

          <form onSubmit={handleSubmit(submit)}>
            {/* modal body*/}
            <div className="modal-body admin-modal__body admin-pages__panelBody">
              {rootError && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {rootError}
                </div>
              )}

              <div className="row g-4">
                {/* 姓名 */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      姓名
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className={`form-control form-control-sm ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", { required: "請輸入姓名" })}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 英文名 */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      英文名
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        {...register("nickname")}
                      />
                    </div>
                  </div>
                </div>

                {/* 密碼（新增時才顯示） */}
                {mode === "create" && (
                  <div className="col-12 col-xl-4">
                    <div className="row g-2 align-items-center admin-pages__field">
                      <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                        密碼
                      </label>
                      <div className="col-12 col-sm-10">
                        <input
                          type="password"
                          className={`form-control form-control-sm ${errors.password ? "is-invalid" : ""}`}
                          placeholder="至少 6 碼"
                          {...register("password", {
                            required: "請輸入密碼",
                            minLength: { value: 6, message: "密碼至少 6 碼" },
                          })}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      Email
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className={`form-control form-control-sm ${errors.email ? "is-invalid" : ""}`}
                        {...register("email", {
                          required: "請輸入 Email",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Email 格式不正確",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* phone */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      Phone
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        {...register("phone")}
                      />
                    </div>
                  </div>
                </div>

                {/* birthday */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      生日
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        {...register("birthday")}
                      />
                    </div>
                  </div>
                </div>

                {/* isActive */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      啟用
                    </label>

                    <div className="col-12 col-sm-10">
                      <div className="admin-pages__radioGroup">
                        <div className="form-check form-check-inline m-0">
                          <input
                            id="modal_isActive_true"
                            type="radio"
                            value="true"
                            className="form-check-input"
                            {...register("isActive")}
                          />
                          <label
                            className="form-check-label small"
                            htmlFor="modal_isActive_true"
                          >
                            啟用
                          </label>
                        </div>

                        <div className="form-check form-check-inline m-0">
                          <input
                            id="modal_isActive_false"
                            type="radio"
                            value="false"
                            className="form-check-input"
                            {...register("isActive")}
                          />
                          <label
                            className="form-check-label small"
                            htmlFor="modal_isActive_false"
                          >
                            停用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 時間資訊（唯讀顯示） */}
                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      建立日
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        value={displayMeta.createdAt}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-4">
                  <div className="row g-2 align-items-center admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      更新日
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        value={displayMeta.updatedAt}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* avatar 新增欄位 */}
                {/* <div className="col-12">
                  <div className="row admin-pages__field">
                    <label className="col-12 col-sm-2 col-form-label col-form-label-sm admin-pages__label">
                      圖片
                    </label>
                    <div className="col-12 col-sm-10">
                      <input
                        className="form-control form-control-sm"
                        placeholder="請輸入 avatar 圖片 URL"
                        {...register("avatar")}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* modal footer：做成像搜尋區塊 footer */}
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
