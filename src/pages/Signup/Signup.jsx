import { useRef, useState } from "react";
import "./Signup.scss";
import axios from "axios";
import * as bootstrap from "bootstrap";
import { Link } from "react-router-dom";

// 這三個對應你的 EJS include
// import Header from "./app/layouts/components/Header/Header";
// import Announcement from "./layout/Announcement";
// import Footer from "./app/layouts/components/Footer/Footer";

//圖片載入
import loginSlider01 from "../../assets/images/common/login-slider-01.png";
import loginSlider02 from "../../assets/images/common/login-slider-02.png";
import longinSlider03 from "../../assets/images/common/login-slider-03.png";

export default function Signup() {
  const formRef = useRef(null);
  const [wasValidated, setWasValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    birthday: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // 把 id 轉成 state key
    const keyMap = {
      name: "name",
      nickname: "nickname",
      birthday: "birthday",
      phone: "phone",
      email: "email",
      password: "password",
      "password-confirm": "passwordConfirm",
      address: "address",
    };

    const key = keyMap[id];
    if (!key) return;

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formEl = formRef.current;
    if (!formEl) return;

    // 先跑瀏覽器內建驗證（required / type / pattern 等）
    const ok = formEl.checkValidity();
    setWasValidated(true);

    if (!ok) return;

    // 表單都合法：你在這裡串接註冊 API
    // console.log(formData);
  };

  return (
    <>
      {/* <Header /> */}

      <main>
        {/* <Announcement /> */}

        <div className="container login-section pt-9 pb-0 pt-md-9 pb-md-9 px-0">
          <div className="split-card overflow-hidden">
            <div className="row g-0">
              {/* 輪播圖 */}
              <section className="col-6 d-none p-0 d-md-block col-img">
                <div
                  id="carouselExampleInterval"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    />
                    <button
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    />
                    <button
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    />
                  </div>

                  <div className="carousel-inner">
                    <div
                      className="carousel-item active h-100"
                      data-bs-interval="10000"
                    >
                      <img
                        src={loginSlider01}
                        className="d-block w-100 h-100 carousel-img"
                        alt="login-slider-01"
                      />
                    </div>
                    <div
                      className="carousel-item h-100"
                      data-bs-interval="2000"
                    >
                      <img
                        src={loginSlider02}
                        className="d-block w-100 h-100 carousel-img"
                        alt="login-slider-02"
                      />
                    </div>
                    <div className="carousel-item h-100">
                      <img
                        src={longinSlider03}
                        className="d-block w-100 h-100 carousel-img"
                        alt="login-slider-03"
                      />
                    </div>
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon d-none"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon d-none"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </section>

              {/* 註冊表單 */}
              <section className="col-12 col-md-6 p-0">
                <div className="signup-form">
                  <form
                    ref={formRef}
                    className={`needs-validation ${wasValidated ? "was-validated" : ""}`}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="text-center mb-7">
                      <h2 className="text-brown-500 mb-4">會員註冊</h2>
                      <p className="text-brown-500">
                        請填寫下方個人資料，以完成註冊流程!
                      </p>
                    </div>

                    {/* 姓名 */}
                    <div className="mb-4 d-flex align-items-center">
                      <label
                        htmlFor="name"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        姓名<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control w-100"
                          id="name"
                          placeholder="輸入你的姓名"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 暱稱 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="nickname"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        暱稱
                      </label>
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control w-100"
                          id="nickname"
                          placeholder="輸入你的用戶暱稱"
                          value={formData.nickname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 生日 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="birthday"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        生日<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="date"
                          className="form-control w-100"
                          id="birthday"
                          required
                          value={formData.birthday}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 手機 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="phone"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        手機<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="tel"
                          className="form-control w-100"
                          id="phone"
                          placeholder="輸入你的手機號碼"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 信箱 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="email"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        電子信箱<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="email"
                          className="form-control w-100"
                          id="email"
                          placeholder="輸入你的信箱"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 密碼 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="password"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        密碼<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="password"
                          className="form-control w-100"
                          id="password"
                          placeholder="輸入你的密碼"
                          required
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 確認密碼 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="password-confirm"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        確認密碼<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="password"
                          className="form-control w-100"
                          id="password-confirm"
                          placeholder="再次輸入你的密碼"
                          required
                          value={formData.passwordConfirm}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 地址 */}
                    <div className="mb-5 d-flex align-items-center mb-6">
                      <label
                        htmlFor="address"
                        className="form-label flex-shrink-0 col-2 me-2 text-brown-500"
                      >
                        地址<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control w-100"
                          id="address"
                          placeholder="輸入你的通訊地址"
                          required
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* 立即加入按鈕 */}
                    <div className="d-grid mb-9">
                      <button
                        className="btn btn-form-login w-100"
                        type="submit"
                      >
                        立即加入
                      </button>
                    </div>

                    {/* 已有帳號連結 */}
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="mb-0 me-2 text-brown-300">已經是會員？</p>

                      {/* react-router 建議用 Link */}
                      {/* <Link to="/login" className="btn btn-form-signup fw-bold">立即登入</Link> */}
                      <Link to="/login">
                        <button
                          type="button"
                          className="btn btn-form-signup fw-bold"
                        >
                          立即登入
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}
