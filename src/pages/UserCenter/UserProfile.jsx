import { useState } from "react";
import shippingCart from "../../assets/images/userCenter/member_shipping_cart.png";
import aboutBg from "../../assets/images/userCenter/about-bg.png";
import waitingDog from "../../assets/images/userCenter/member_waiting_dog.png";
const INITIAL_PROFILE = {
  name: "",
  nickname: "",
  birthday: "",
  email: "",
  mobile: "",
  address: {
    city: "",
    zip: "",
    addr: "",
  },
  shipping: {
    city: "",
    zip: "",
    addr: "",
  },
};

export default function UserProfile({ onSave }) {
  const [formData, setFormData] = useState(INITIAL_PROFILE);
  const [wasValidated, setWasValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 支援巢狀欄位：address.city / shipping.zip
    if (name.includes(".")) {
      const [group, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [key]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setWasValidated(true);

    if (!form.checkValidity()) {
      // BS5 會自動顯示 invalid-tooltip / valid-tooltip（因為加了 was-validated）
      e.stopPropagation();
      return;
    }

    // 先不打 API，先模擬存檔
    console.log("[UserProfileForm] submit:", formData);
    onSave?.(formData);
    alert("已送出（目前先不打 API）");
  };

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

          <div className="input-group">
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

        {/* 暱稱 */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="user-nick-name" className="form-label p1">
            暱稱
          </label>

          <div className="input-group">
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

        {/* 生日（先用 text + pattern 保持原設計） */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="birthday" className="form-label p1">
            生日
          </label>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="birthday"
              name="birthday"
              placeholder="請輸入生日, 例如: 1991/10/09"
              required
              pattern="^\d{4}\/\d{2}\/\d{2}$"
              value={formData.birthday}
              onChange={handleChange}
            />
            <i className="icon icon-cake position-absolute top-50 end-0 translate-middle-y me-3"></i>
          </div>

          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">
            請輸入正確年月日! 例如: 1991/10/09
          </div>
        </div>

        {/* Email */}
        <div className="mb-56 ps-8 position-relative">
          <label htmlFor="email" className="form-label p1">
            Email
          </label>

          <div className="input-group">
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
          <label htmlFor="mobile" className="form-label p1">
            手機號碼
          </label>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              placeholder="請輸入手機號碼"
              maxLength={10}
              required
              pattern="^\d{10}$"
              value={formData.mobile}
              onChange={handleChange}
            />
            <i className="icon icon-smartphone position-absolute top-50 end-0 translate-middle-y me-3"></i>
          </div>

          <div className="valid-tooltip">正確!</div>
          <div className="invalid-tooltip">請輸入手機號碼!</div>
        </div>

        {/* 住家地址 */}
        <div className="mb-56 ps-8">
          <label className="form-label p1">住家地址</label>

          <div className="row g-3 g-lg-4">
            <div className="col-md-3 position-relative">
              <select
                className="form-select"
                id="city"
                name="address.city"
                required
                value={formData.address.city}
                onChange={handleChange}
              >
                <option value="" disabled>
                  縣/市
                </option>
                <option value="台北市">台北市</option>
                <option value="台中市">台中市</option>
                <option value="高雄市">高雄市</option>
              </select>
              <div className="invalid-tooltip">請選擇縣/市!</div>
            </div>

            <div className="col-md-3 position-relative">
              <input
                type="text"
                className="form-control"
                id="zip"
                name="address.zip"
                placeholder="郵遞區號"
                required
                pattern="^\d{3,5}$"
                value={formData.address.zip}
                onChange={handleChange}
              />
              <div className="invalid-tooltip">請輸入郵遞區號!</div>
            </div>

            <div className="col-md-6 position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address.addr"
                  placeholder="地址"
                  required
                  value={formData.address.addr}
                  onChange={handleChange}
                />
                <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3"></div>
              </div>
              <div className="invalid-tooltip">請輸入地址!</div>
            </div>
          </div>
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

        <div className="mb-3 ps-8">
          <label className="form-label p1">送達地址</label>

          <div className="row g-3 g-lg-4">
            <div className="col-md-3 position-relative">
              <select
                className="form-select"
                id="shipping-city"
                name="shipping.city"
                required
                value={formData.shipping.city}
                onChange={handleChange}
              >
                <option value="" disabled>
                  縣/市
                </option>
                <option value="台北市">台北市</option>
                <option value="台中市">台中市</option>
                <option value="高雄市">高雄市</option>
              </select>
              <div className="invalid-tooltip">請選擇縣/市!</div>
            </div>

            <div className="col-md-3 position-relative">
              <input
                type="text"
                className="form-control"
                id="shipping-zip"
                name="shipping.zip"
                placeholder="郵遞區號"
                required
                pattern="^\d{3,5}$"
                value={formData.shipping.zip}
                onChange={handleChange}
              />
              <div className="invalid-tooltip">請輸入郵遞區號!</div>
            </div>

            <div className="col-md-6 position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="shipping-addr"
                  name="shipping.addr"
                  placeholder="地址"
                  required
                  value={formData.shipping.addr}
                  onChange={handleChange}
                />
                <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3"></div>
              </div>
              <div className="invalid-tooltip">請輸入送達地址!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-80">
        <button
          type="submit"
          className="btn btn-save rounded-pill align-bottom"
        >
          存檔
        </button>
      </div>
    </form>
  );
}
