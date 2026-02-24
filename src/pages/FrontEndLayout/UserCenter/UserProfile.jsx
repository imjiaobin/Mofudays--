import { useState, useEffect } from "react";
import shippingCart from "../../../assets/images/userCenter/member_shipping_cart.png";
import aboutBg from "../../../assets/images/userCenter/about-bg.png";
import waitingDog from "../../../assets/images/userCenter/member_waiting_dog.png";
import { getUserProfile, updateUserProfile } from "../../../api/userApi";

import { toast } from "react-toastify";

const INITIAL_PROFILE = {
  name: "",
  nickname: "",
  birthday: "",
  email: "",
  phone: "",
  address: "",
  shipping: "",
};

// 將 API 回傳的 user 物件轉為元件用的 formData 格式
const mapUserToForm = (user) => ({
  name: user.name || "",
  nickname: user.nickname || "",
  birthday: user.birthday || "", // 預期格式 "YYYY-MM-DD"，符合 input[type=date]
  email: user.email || "",
  phone: user.phone || "",
  address: typeof user.address === "string" ? user.address : "",
  shipping: typeof user.shipping === "string" ? user.shipping : "",
});

// 將 formData 轉回 API 所需格式
const mapFormToUser = (formData) => ({
  name: formData.name,
  nickname: formData.nickname,
  birthday: formData.birthday,
  email: formData.email,
  phone: formData.phone,
  address: formData.address,
  shipping: formData.shipping,
});

export default function UserProfile({ onSave }) {
  const [formData, setFormData] = useState(INITIAL_PROFILE);
  const [wasValidated, setWasValidated] = useState(false);
  const [sameAsHome, setSameAsHome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 載入會員資料
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          setFormData(mapUserToForm(user));
        }
      } catch (err) {
        console.error("載入會員資料失敗", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // 若勾選同住家地址且修改的是 address，同步更新 shipping
      if (sameAsHome && name === "address") {
        updated.shipping = value;
      }

      return updated;
    });
  };

  const handleSameAsHome = (e) => {
    const checked = e.target.checked;
    setSameAsHome(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, shipping: prev.address }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setWasValidated(true);

    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    setIsSaving(true);
    try {
      const payload = mapFormToUser(formData);
      const result = await updateUserProfile(payload);
      console.log("[UserProfile] 儲存成功:", result);
      onSave?.(result);
      toast.success("會員資料已更新！");
      setWasValidated(false);
    } catch (err) {
      console.error("[UserProfile] 儲存失敗:", err);
      toast.error("儲存失敗，請稍後再試");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-80">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form
      className={`needs-validation ${wasValidated ? "was-validated" : ""}`}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="mb-40">
        <h2 className="h h2 text-primary-500 mt-16 mb-32">
          <span className="icon-user me-2"></span>會員資料
        </h2>

        {/* 姓名 */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="user-name" className="form-label p1">
            姓名
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control pe-5"
              id="user-name"
              name="name"
              placeholder="請輸入姓名"
              maxLength={20}
              required
              value={formData.name}
              onChange={handleChange}
            />
            <i className="icon icon-user-round-pen position-absolute top-50 end-0 translate-middle-y me-3"></i>
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">姓名不得為空或是超過20個字!</div>
        </div>

        {/* 暱稱（選填，不加 required） */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="user-nick-name" className="form-label p1">
            暱稱
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control pe-5"
              id="user-nick-name"
              name="nickname"
              placeholder="請輸入暱稱"
              value={formData.nickname}
              onChange={handleChange}
            />
            <i className="icon icon-file-user position-absolute top-50 end-0 translate-middle-y me-3"></i>
          </div>
        </div>

        {/* 生日 — type="date" 讓使用者用選的，對齊註冊頁 */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="birthday" className="form-label p1">
            生日
          </label>
          <div className="position-relative">
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              required
              max={new Date().toISOString().split("T")[0]}
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">請選擇生日!</div>
        </div>

        {/* Email */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="email" className="form-label p1">
            Email
          </label>
          <div className="position-relative">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="請輸入電子信箱"
              autoComplete="email"
              inputMode="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <div className="icon icon-mail position-absolute top-50 end-0 translate-middle-y me-3"></div>
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">請輸入正確電子信箱!</div>
        </div>

        {/* 手機 */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="phone" className="form-label p1">
            手機號碼
          </label>
          <div className="position-relative">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="請輸入手機號碼"
              maxLength={10}
              required
              pattern="^09\d{8}$"
              inputMode="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <i className="icon icon-smartphone position-absolute top-50 end-0 translate-middle-y me-3"></i>
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">
            請輸入正確的手機號碼（09 開頭，共10碼）!
          </div>
        </div>

        {/* 住家地址 — 單一欄位 */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="address" className="form-label p1">
            住家地址
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="請輸入住家地址"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3"></div>
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">請輸入住家地址!</div>
        </div>
      </div>

      {/* 送貨資料 */}
      <div className="shipping-info mb-4 position-relative">
        <h2 className="h h2 text-primary-500 mb-32">
          <span className="icon-shopping-bag me-2"></span>送貨資料
        </h2>

        <img
          src={shippingCart}
          alt="行進中的貨車圖"
          className="position-absolute img-shipping-cart img-shake top-0 end-0 z-2"
        />
        <img
          src={aboutBg}
          alt="黃色底框"
          className="position-absolute img-shipping-cart img-shake top-0 end-0 z-1"
        />
        <img
          src={waitingDog}
          alt="等待中的小狗狗"
          className="position-absolute img-waiting-dog transform-x img-shake top-1 end-1 z-1"
        />

        {/* 送達地址 — 單一欄位 */}
        <div className="mb-3 ps-8">
          {/* Label 列：送達地址標題 + 同住家地址 checkbox 並排 */}
          <div className="d-flex align-items-center gap-3 mb-2">
            <label htmlFor="shipping" className="form-label p1 mb-0">
              送達地址
            </label>
            <div className="form-check mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="same-as-home"
                checked={sameAsHome}
                onChange={handleSameAsHome}
              />
              <label className="form-check-label" htmlFor="same-as-home">
                同住家地址
              </label>
            </div>
          </div>

          <div className="position-relative">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                id="shipping"
                name="shipping"
                placeholder="請輸入送達地址"
                required
                disabled={sameAsHome}
                value={formData.shipping}
                onChange={handleChange}
              />
              <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3"></div>
            </div>
            <div className="valid-tooltip">正確!</div>
            <div className="invalid-tooltip">請輸入送達地址!</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-80">
        <button
          type="submit"
          className="btn btn-save rounded-pill align-bottom"
          disabled={isSaving}
        >
          {isSaving ? "儲存中..." : "編輯"}
        </button>
      </div>
    </form>
  );
}
