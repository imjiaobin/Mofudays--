import { useState, useEffect } from "react";
import shippingCart from "../../../assets/images/userCenter/member_shipping_cart.png";
import aboutBg from "../../../assets/images/userCenter/about-bg.png";
import waitingDog from "../../../assets/images/userCenter/member_waiting_dog.png";
import { getUserProfile, updateUserProfile } from "../../../api/userApi";
import { taiwanRegions } from "../Signup/taiwanRegions";

import { toast } from "react-toastify";

const INITIAL_PROFILE = {
  name: "",
  nickname: "",
  birthday: "",
  email: "",
  phone: "",
  city: "高雄市",
  district: "鳳山區",
  address: "",
  shippingCity: "",
  shippingDistrict: "",
  shippingAddress: "",
};

// 將 API 回傳的 user 物件轉為元件用的 formData 格式
const mapUserToForm = (user) => ({
  name: user.name || "",
  nickname: user.nickname || "",
  birthday: user.birthday || "", // 預期格式 "YYYY-MM-DD"，符合 input[type=date]
  email: user.email || "",
  phone: user.phone || "",
  // 拆分後的住家地址
  city: user.city || "高雄市",
  district: user.district || "鳳山區",
  address: user.address || "",
  // 拆分後的送貨地址
  shippingCity: user.shippingCity || "",
  shippingDistrict: user.shippingDistrict || "",
  shippingAddress: user.shippingAddress || "",
});

// 將 formData 轉回 API 所需格式
const mapFormToUser = (formData) => ({
  name: formData.name,
  nickname: formData.nickname,
  birthday: formData.birthday,
  email: formData.email,
  phone: formData.phone,
  city: formData.city,
  district: formData.district,
  address: formData.address,
  shippingCity: formData.shippingCity,
  shippingDistrict: formData.shippingDistrict,
  shippingAddress: formData.shippingAddress,
});

export default function UserProfile({ onSave }) {
  const [formData, setFormData] = useState(INITIAL_PROFILE);
  const [wasValidated, setWasValidated] = useState(false);
  const [sameAsHome, setSameAsHome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  // --- 新增：動態取得區域清單 ---
  // 1. 住家地址對應的區域
  const homeDistricts =
    taiwanRegions.find((c) => c.name === formData.city)?.districts || [];

  // 2. 送貨地址對應的區域
  const shippingDistricts =
    taiwanRegions.find((c) => c.name === formData.shippingCity)?.districts ||
    [];

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

      // --- 新增：縣市切換時自動重設區域 ---
      if (name === "city") {
        const newDistricts =
          taiwanRegions.find((c) => c.name === value)?.districts || [];
        updated.district = newDistricts[0] || "";
      }
      if (name === "shippingCity") {
        const newDistricts =
          taiwanRegions.find((c) => c.name === value)?.districts || [];
        updated.shippingDistrict = newDistricts[0] || "";
      }
      // --------------------------------

      // 若勾選同住家地址，同步更新 shipping 相關欄位
      if (sameAsHome) {
        if (name === "city" || name === "district" || name === "address") {
          updated.shippingCity = updated.city;
          updated.shippingDistrict = updated.district;
          updated.shippingAddress = updated.address;
        }
      }

      return updated;
    });
  };

  const handleSameAsHome = (e) => {
    const checked = e.target.checked;
    setSameAsHome(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        shippingCity: prev.city, // 假設住家地址也有對應欄位
        shippingDistrict: prev.district,
        shippingAddress: prev.address,
      }));
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
        <h2 className="h h2 fs-6 mt-16 mb-32">
          <i class="bi bi-newspaper me-2"></i>基本資訊
        </h2>

        {/* 姓名 */}
        <div className="row mb-56 ps-8 position-relative">
          <label htmlFor="user-name" className="col-md-2 form-label p1">
            姓名
          </label>
          <div className="col-md-10 position-relative">
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
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">姓名不得為空或是超過20個字!</div>
        </div>

        {/* 暱稱（選填，不加 required） */}
        <div className="row mb-56 ps-8 position-relative">
          <label htmlFor="user-nick-name" className="col-md-2 form-label p1">
            暱稱
          </label>
          <div className="col-md-10 position-relative">
            <input
              type="text"
              className="form-control pe-5"
              id="user-nick-name"
              name="nickname"
              placeholder="請輸入暱稱"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 生日 — type="date" 讓使用者用選的，對齊註冊頁 */}
        <div className="row mb-56 ps-8 position-relative">
          <label htmlFor="birthday" className="col-md-2 form-label p1">
            生日
          </label>
          <div className="col-md-10 position-relative">
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
        <div className="row mb-56 ps-8 position-relative">
          <label htmlFor="email" className="col-md-2 form-label p1">
            Email
          </label>
          <div className="col-md-10 position-relative">
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
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">請輸入正確電子信箱!</div>
        </div>

        {/* 手機 */}
        <div className="row mb-56 ps-8 position-relative">
          <label htmlFor="phone" className="col-md-2 form-label p1">
            手機號碼
          </label>
          <div className="col-md-10 position-relative">
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
          </div>
          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">
            請輸入正確的手機號碼（09 開頭，共10碼）!
          </div>
        </div>

        {/* 住家地址 — 三段式欄位 */}
        <div className="row mb-56 ps-8 position-relative">
          <label htmlFor="city" className="col-md-2 form-label p1 mb-2">
            住家地址
          </label>
          <div className="row g-3 col-md-10">
            {/* 縣市選擇 */}
            <div className="col-4 col-md-3">
              <select
                className="form-select"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              >
                <option value="" disabled>
                  請選擇縣市
                </option>
                {taiwanRegions.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
                {/* 其他縣市選項 */}
              </select>
            </div>

            {/* 區域選擇 */}
            <div className="col-4 col-md-3">
              <select
                className="form-select"
                id="district"
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
              >
                <option value="" disabled>
                  請選擇區域
                </option>
                {homeDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
                {/* 其他區域選項 */}
              </select>
            </div>

            {/* 詳細地址輸入 */}
            <div className="col-12 col-md-6">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="請輸入詳細地址"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="invalid-tooltip">請輸入詳細地址!</div>
            </div>
          </div>
        </div>

        {/* 住家地址 — 單一欄位
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="address" className="form-label p1">
            住家地址
          </label>
           */}
        {/* <div className="position-relative">
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
          </div> */}
        {/* <div className="valid-tooltip">正確!</div> */}
        {/* <div className="invalid-tooltip">請輸入住家地址!</div> */}
        {/* </div> */}
      </div>

      {/* 送貨資料 */}
      {/* <div className="shipping-info mb-4 position-relative">
        <h2 className="h h2 fs-6 mb-32">
          <i class="bi bi-cart me-2"></i>送貨資料
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
      {/* <div className="mb-3 ps-8">
          // {/* Label 列：送達地址標題 + 同住家地址 checkbox 並排 */}
      {/* // <div className="d-flex align-items-center gap-3 mb-2">
          //   <label htmlFor="shipping" className="form-label p1 mb-0">
          //     送達地址
          //   </label>
          // </div> */}

      {/* <div className="position-relative mb-2">
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
          </div> */}

      {/* <div className="form-check mb-0">
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
        </div> */}
      {/* </div> */}
      <div className="shipping-info mb-4 position-relative">
        <h2 className="h h2 fs-6 mb-32">
          <i class="bi bi-cart me-2"></i>送貨資料
        </h2>
        <div className="row mb-3 ps-8 ">
          <label htmlFor="shippingCity" className="col-md-2 form-label p1 mb-2">
            送達地址
          </label>

          {/* 三段式欄位佈局 */}
          <div className="row g-3 mb-2 col-md-10">
            {/* 縣市選擇 */}
            <div className="col-4 col-md-3">
              <select
                className="form-select"
                name="shippingCity"
                required
                disabled={sameAsHome}
                value={formData.shippingCity}
                onChange={handleChange}
              >
                <option value="" disabled>
                  請選擇縣市
                </option>

                {taiwanRegions.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
                {/* 其他選項... */}
              </select>
            </div>

            {/* 區域選擇 */}
            <div className="col-4 col-md-3">
              <select
                className="form-select"
                name="shippingDistrict"
                required
                disabled={sameAsHome}
                value={formData.shippingDistrict}
                onChange={handleChange}
              >
                <option value="" disabled>
                  請選擇區域
                </option>
                {shippingDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
                {/* 其他選項... */}
              </select>
            </div>

            {/* 詳細地址輸入 */}
            <div className="col-12 col-md-6">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  name="shippingAddress"
                  placeholder="詳細地址"
                  required
                  disabled={sameAsHome}
                  value={formData.shippingAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* 同住家地址 Checkbox */}
          <div className="row">
            <div className="col-2"></div>
            <div className="form-check mb-0 col-10">
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
