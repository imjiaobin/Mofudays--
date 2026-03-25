import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../../api/userApi";
import { taiwanRegions } from "../Signup/taiwanRegions";
import { toast } from "react-toastify";

const INITIAL_PROFILE = {
  name: "",
  nickname: "",
  birthday: "",
  email: "",
  phone: "",
  city: "基隆市",
  district: "仁愛區",
  address: "",
  shippingCity: "基隆市",
  shippingDistrict: "仁愛區",
  shippingAddress: "",
};

const mapUserToForm = (user) => ({
  name: user.name || "",
  nickname: user.nickname || "",
  birthday: user.birthday || "",
  email: user.email || "",
  phone: user.phone || "",
  city: user.city || "基隆市",
  district: user.district || "仁愛區",
  address: user.address || "",
  shippingCity: user.shippingCity || "",
  shippingDistrict: user.shippingDistrict || "",
  shippingAddress: user.shippingAddress || "",
});

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

  const homeDistricts =
    taiwanRegions.find((c) => c.name === formData.city)?.districts || [];

  const shippingDistricts =
    taiwanRegions.find((c) => c.name === formData.shippingCity)?.districts ||
    [];

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
        shippingCity: prev.city,
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
      // console.log("[UserProfile] 儲存成功:", result);
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
    <div className="member-profile-wrapper container">
      {/* 1. 卡片外部的主標題 */}
      <h1 className="h h1 text-brown-500 member-profile-title">會員資料</h1>

      {/* 2. 橘色背景的卡片容器 */}
      <div className="tab-content bg-yellow bg-radius py-40 px-55 mt-80">
        <form
          className={`needs-validation ${wasValidated ? "was-validated" : ""}`}
          noValidate
          onSubmit={handleSubmit}
        >
          {/* 基本資訊 */}
          <div className="mb-40">
            <h2 className="h h2 fs-6 mb-32">
              <i className="bi bi-newspaper me-2"></i>基本資訊
            </h2>
            {/* 姓名 */}
            <div className="row mb-56 position-relative">
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
            {/* 暱稱 */}
            <div className="row mb-56 position-relative">
              <label
                htmlFor="user-nick-name"
                className="col-md-2 form-label p1"
              >
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
            {/* 生日 */}
            <div className="row mb-56 position-relative">
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
                  style={{ height: "38px" }}
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>
              <div className="valid-tooltip">正確!</div>
              <div className="invalid-tooltip">請選擇生日!</div>
            </div>
            {/* Email */}
            <div className="row mb-56 position-relative">
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
            <div className="row mb-56 position-relative">
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
            {/* 住家地址 */}
            <div className="row mb-56 position-relative">
              <label htmlFor="city" className="col-md-2 col-form-label p1">
                住家地址
              </label>
              <div className="col-md-10">
                <div className="row g-3">
                  <div className="col-6">
                    <select
                      className="form-select"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    >
                      {taiwanRegions.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6">
                    <select
                      className="form-select"
                      id="district"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                    >
                      {homeDistricts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 詳細地址 */}
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="請輸入詳細地址"
                      required
                      style={{ height: "38px" }}
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <div className="invalid-tooltip">請輸入詳細地址!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 送貨資料 */}
          <div className="shipping-info mb-4 position-relative">
            <h2 className="h h2 fs-6 mb-32">
              <i className="bi bi-cart me-2"></i>送貨資料
            </h2>

            {/* <img
              src={shippingCart}
              alt="行進中的貨車圖"
              className="position-absolute img-shipping-cart img-shake top-0 end-0 z-2"
            /> */}
            {/* <img
              src={aboutBg}
              alt="黃色底框"
              className="position-absolute img-shipping-cart img-shake top-0 end-0 z-1"
            /> */}
            {/* <img
              src={waitingDog}
              alt="等待中的小狗狗"
              className="position-absolute img-waiting-dog transform-x img-shake top-1 end-1 z-1"
            /> */}

            <div className="row mb-3">
              <label
                htmlFor="shippingCity"
                className="col-md-2 form-label p1 mb-2"
              >
                送貨地址
              </label>

              <div className="row g-3 mb-2 col-md-10">
                {/* 送貨縣市 */}
                <div className="col-6 col-md-6">
                  <select
                    className="form-select"
                    id="shippingCity"
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
                  </select>
                </div>

                {/* 送貨區域 */}
                <div className="col-6 col-md-6">
                  <select
                    className="form-select"
                    id="shippingDistrict"
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
                  </select>
                </div>

                {/* 送貨詳細地址 */}
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    id="shippingAddress"
                    name="shippingAddress"
                    placeholder="詳細地址"
                    required
                    style={{ height: "38px" }}
                    disabled={sameAsHome}
                    value={formData.shippingAddress}
                    onChange={handleChange}
                  />
                  <div className="invalid-tooltip">請輸入送達地址!</div>
                </div>
              </div>

              {/* 同住家地址 Checkbox */}
              <div className="row mt-2">
                <div className="col-md-2 d-none d-md-block"></div>
                <div className="form-check mb-0 col-12 col-md-10">
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
      </div>
    </div>
  );
}
