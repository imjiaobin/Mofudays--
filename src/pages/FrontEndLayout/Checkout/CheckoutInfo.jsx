import { useState } from "react";
import { TAIWAN_DISTRICTS } from "./taiwanDistricts";

const CheckoutInfo = ({
  form,
  setForm,
  errors,
  clearError,
  memberProfile,
  useMemberData,
  onUseMemberDataChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const effectiveDropdown = useMemberData ? null : openDropdown;

  return (
    <>
      {/* 結帳資訊 */}
      <div className="row-table mb-48-sm">
        <div className="col-table-10">
          <h5 className="mb-5 ls-5 text-center-md">結帳資訊</h5>

          {/* 個人資訊 */}
          <div className="personal-info">
            <div className="table-title-bg px-5 py-2 mb-2">
              <p>輸入你的個人資訊</p>
            </div>
            {memberProfile && (
              <div className="form-check ms-4 mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="use-member-data"
                  checked={useMemberData}
                  onChange={(e) => onUseMemberDataChange(e.target.checked)}
                />
                <label
                  className="form-check-label text-brown-500"
                  htmlFor="use-member-data"
                >
                  同會員資料
                </label>
                {useMemberData && (
                  <span className="text-muted small ms-2">
                    如需修改請至會員中心
                  </span>
                )}
              </div>
            )}

            <div className="row g-2 mb-5 checkout-form">
              {/* 姓名 */}
              <div className="col-12 px-4-sm">
                <input
                  type="name"
                  className={`form-control text-brown-500 ${errors.name ? "border-danger" : ""}`}
                  id="checkout-name"
                  name="checkout-name"
                  placeholder="姓名（ 請輸入真實姓名 ）"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    clearError("name");
                  }}
                  disabled={useMemberData}
                />
                {errors.name && (
                  <p className="text-danger mt-1 small">⚠️ {errors.name}</p>
                )}
              </div>

              {/* 電話 */}
              <div className="col-12 px-4-sm">
                <input
                  type="tel"
                  className={`form-control ${errors.tel ? "border-danger" : ""}`}
                  placeholder="電話（含區碼）或手機號碼"
                  value={form.tel}
                  onChange={(e) => {
                    setForm({ ...form, tel: e.target.value });
                    clearError("tel");
                  }}
                  disabled={useMemberData}
                />
                {errors.tel && (
                  <p className="text-danger mt-1 small">⚠️ {errors.tel}</p>
                )}
              </div>

              {/* Email */}
              <div className="col-12 px-4-sm">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "border-danger" : ""}`}
                  id="checkout-email"
                  name="checkout-email"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    clearError("email");
                  }}
                  disabled={useMemberData}
                />
                {errors.email && (
                  <p className="text-danger mt-1 small">⚠️ {errors.email}</p>
                )}
              </div>

              {/* 地址 */}
              <div className="col-12 px-4-sm">
                <div className="row g-2">
                  {/* 縣市 */}
                  <div className="col-3 col-12-md px-4-sm">
                    <div className="dropdown">
                      <button
                        className={`form-select text-start fw-regular border py-3 px-5
                          ${errors.city ? "border-danger" : ""}
                          ${form.city ? "form-select-filled" : "text-neutral-400"}`}
                        type="button"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === "city" ? null : "city",
                          )
                        }
                        disabled={useMemberData}
                      >
                        {form.city || "縣市"}
                      </button>
                      <ul
                        className={`dropdown-menu w-100 ${effectiveDropdown === "city" ? "show" : ""}`}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {TAIWAN_DISTRICTS.map((item) => (
                          <li
                            key={item.city}
                            className="dropdown-item"
                            onClick={() => {
                              setForm({
                                ...form,
                                city: item.city,
                                district: "",
                              });
                              setOpenDropdown(null);
                              clearError("city");
                              clearError("district");
                            }}
                          >
                            {item.city}
                          </li>
                        ))}
                      </ul>
                      {errors.city && (
                        <p className="text-danger mt-2 small">
                          ⚠️ {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 地區 */}
                  <div className="col-3 col-12-md px-4-sm">
                    <div className="dropdown">
                      <button
                        className={`form-select text-start fw-regular border py-3 px-5
                          ${errors.district ? "border-danger" : ""}
                          ${form.district ? "form-select-filled" : "text-neutral-400"}`}
                        type="button"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === "district" ? null : "district",
                          )
                        }
                        disabled={useMemberData || !form.city}
                      >
                        {form.district || "地區"}
                      </button>
                      <ul
                        className={`dropdown-menu w-100 ${effectiveDropdown === "district" ? "show" : ""}`}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {TAIWAN_DISTRICTS.find(
                          (item) => item.city === form.city,
                        )?.districts.map((d) => (
                          <li
                            key={d}
                            className="dropdown-item"
                            onClick={() => {
                              setForm({ ...form, district: d });
                              setOpenDropdown(null);
                              clearError("district");
                            }}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                      {errors.district && (
                        <p className="text-danger mt-2 small">
                          ⚠️ {errors.district}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 街道與門牌 */}
                  <div className="col-6 col-12-md px-4-sm">
                    <input
                      type="text"
                      className={`form-control ${errors.street ? "border-danger" : ""}`}
                      placeholder="街道與門牌"
                      value={form.street}
                      onChange={(e) => {
                        setForm({ ...form, street: e.target.value });
                        clearError("street");
                      }}
                      disabled={useMemberData}
                    />
                    {errors.street && (
                      <p className="text-danger mt-1 small">
                        ⚠️ {errors.street}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 付款方式 */}
          <div className="payment-method">
            <div className="table-title-bg px-5 py-2 mb-2">
              <p>選擇付款方式</p>
            </div>

            <div
              role="group"
              aria-label="Basic radio toggle button group"
              className="mb-5 row g-2"
            >
              {/* 轉帳 */}
              <div className="col-3 col-6-sm px-4-sm me-0-sm">
                <input
                  type="radio"
                  className="btn-check w-100"
                  name="payment-method"
                  id="transfer"
                  autoComplete="off"
                  onChange={() => {
                    setForm({ ...form, paymentMethod: "transfer" });
                    clearError("paymentMethod");
                  }}
                />
                <label
                  className="btn btn-primary btn-diet px-0 py-3 w-100"
                  htmlFor="transfer"
                >
                  轉帳
                </label>
              </div>

              {/* 信用卡 */}
              <div className="col-3 col-6-sm px-4-sm">
                <input
                  type="radio"
                  className="btn-check w-100"
                  name="payment-method"
                  id="credit-card"
                  autoComplete="off"
                  onChange={() => {
                    setForm({ ...form, paymentMethod: "credit-card" });
                    clearError("paymentMethod");
                  }}
                />
                <label
                  className="btn btn-primary btn-diet px-0 py-3 w-100"
                  htmlFor="credit-card"
                >
                  信用卡
                </label>
              </div>

              {/* Apple Pay */}
              <div className="col-3 col-6-sm px-4-sm me-0-sm">
                <input
                  type="radio"
                  className="btn-check"
                  name="payment-method"
                  id="Apple-PAY"
                  autoComplete="off"
                  onChange={() => {
                    setForm({ ...form, paymentMethod: "Apple-Pay" });
                    clearError("paymentMethod");
                  }}
                />
                <label
                  className="btn btn-primary btn-diet px-0 py-3 w-100"
                  htmlFor="Apple-PAY"
                >
                  Apple Pay
                </label>
              </div>

              {/* LINE Pay */}
              <div className="col-3 col-6-sm px-4-sm">
                <input
                  type="radio"
                  className="btn-check"
                  name="payment-method"
                  id="LINE-Pay"
                  autoComplete="off"
                  onChange={() => {
                    setForm({ ...form, paymentMethod: "LINE-Pay" });
                    clearError("paymentMethod");
                  }}
                />
                <label
                  className="btn btn-primary btn-diet px-0 py-3 w-100"
                  htmlFor="LINE-Pay"
                >
                  LINE Pay
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="text-danger mt-1 small">⚠️ 請選擇付款方式</p>
              )}
            </div>
          </div>

          {/* 訂單備註 */}
          <div className="payment-method">
            <div className="table-title-bg px-5 py-2 mb-2">
              <p>訂單備註</p>
            </div>

            <div className="form-floating">
              <textarea
                className="form-control px-3 py-5"
                placeholder="備註"
                id="checkout-remark"
                style={{ height: "100px" }}
                value={form.remark}
                onChange={(e) => setForm({ ...form, remark: e.target.value })}
              ></textarea>
              <label htmlFor="checkout-remark ps-3">備註</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutInfo;
