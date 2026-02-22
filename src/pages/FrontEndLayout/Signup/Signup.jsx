import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Signup.scss";
import axios from "axios";
import * as bootstrap from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../app/layouts/components/Header/Header";
import Footer from "../../../app/layouts/components/Footer/Footer";

//圖片載入
import loginSlider01 from "../../../assets/images/common/login-slider-01.png";
import loginSlider02 from "../../../assets/images/common/login-slider-02.png";
import longinSlider03 from "../../../assets/images/common/login-slider-03.png";

const API_BASE_URL = "http://localhost:3000";

export default function Signup() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  // const [wasValidated, setWasValidated] = useState(false);

  // 1. 初始化 React Hook Form
  const {
    register,
    handleSubmit,
    watch, // 用於監控密碼欄位以進行比對
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      nickname: "",
      birthday: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
    },
  });

  // 監控密碼欄位數值，供「確認密碼」比對使用
  const passwordValue = watch("password");

  // 輪播初始化
  useEffect(() => {
    if (!carouselRef.current) return;
    const instance = bootstrap.Carousel.getOrCreateInstance(
      carouselRef.current,
      {
        interval: 3000,
        ride: "carousel",
      },
    );
    return () => instance.dispose();
  }, []);

  const onSubmit = async (data) => {
    try {
      const { passwordConfirm, ...registerData } = data;

      // 定義 res 變數
      const res = await axios.post(`${API_BASE_URL}/register`, registerData);

      console.log("註冊成功回傳資料：", res.data);

      alert("註冊成功！");
      navigate("/login");
    } catch (err) {
      // 區分錯誤類型，方便除錯
      if (err.response) {
        // 這是 API 回傳的錯誤 (e.g. 400, 409, 500)
        console.error("API 錯誤詳情：", err.response.data);
        const status = err.response.status;
        const errorMsg = err.response.data;

        if (status === 400 || status === 409) {
          if (typeof errorMsg === "string" && errorMsg.includes("Email")) {
            setError("email", { type: "manual", message: "此 Email 已被註冊" });
          } else {
            alert("註冊資料格式錯誤，請檢查欄位");
          }
        } else {
          alert("註冊失敗，伺服器連線異常");
        }
      } else {
        console.error("JavaScript 或網路錯誤：", err.message);
        alert("程式執行發生錯誤，請查看控制台");
      }
    }
  };

  // const [formData, setFormData] = useState({
  //   name: "",
  //   nickname: "",
  //   birthday: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  //   passwordConfirm: "",
  //   address: "",
  // });

  // const handleChange = (e) => {
  //   const { id, value } = e.target;

  //   // 把 id 轉成 state key
  //   const keyMap = {
  //     name: "name",
  //     nickname: "nickname",
  //     birthday: "birthday",
  //     phone: "phone",
  //     email: "email",
  //     password: "password",
  //     "password-confirm": "passwordConfirm",
  //     address: "address",
  //   };

  //   const key = keyMap[id];
  //   if (!key) return;

  //   setFormData((prev) => ({ ...prev, [key]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formEl = formRef.current;
  //   if (!formEl) return;

  //   // 先跑瀏覽器內建驗證（required / type / pattern 等）
  //   const ok = formEl.checkValidity();
  //   setWasValidated(true);

  //   if (!ok) return;

  //   // 表單都合法：你在這裡串接註冊 API
  //   // console.log(formData);
  // };

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
                  className="carousel slide h-100"
                  data-bs-ride="carousel"
                  ref={carouselRef}
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
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="text-center mb-7">
                      <h2 className="text-brown-500 mb-4">會員註冊</h2>
                      <p className="text-brown-500">
                        請填寫下方個人資料，以完成註冊流程!
                      </p>
                    </div>

                    {/* 姓名 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        姓名<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="text"
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          placeholder="輸入你的姓名"
                          {...register("name", { required: "姓名為必填" })}
                        />
                        <div className="invalid-feedback">
                          {errors.name?.message}
                        </div>
                      </div>
                    </div>

                    {/* 暱稱 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        暱稱
                      </label>
                      <div className="w-100">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="輸入用戶暱稱"
                          {...register("nickname")}
                        />
                      </div>
                    </div>

                    {/* 生日 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        生日<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="date"
                          className={`form-control ${errors.birthday ? "is-invalid" : ""}`}
                          {...register("birthday", { required: "請選擇生日" })}
                        />
                        <div className="invalid-feedback">
                          {errors.birthday?.message}
                        </div>
                      </div>
                    </div>

                    {/* 手機 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        手機<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="tel"
                          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                          placeholder="0912345678"
                          {...register("phone", {
                            required: "手機為必填",
                            pattern: {
                              value: /^09\d{8}$/,
                              message: "手機格式不正確",
                            },
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.phone?.message}
                        </div>
                      </div>
                    </div>

                    {/* 信箱 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        電子信箱<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="email"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          placeholder="example@mail.com"
                          {...register("email", {
                            required: "Email 為必填",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Email 格式不正確",
                            },
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.email?.message}
                        </div>
                      </div>
                    </div>

                    {/* 密碼 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        密碼<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="password"
                          className={`form-control ${errors.password ? "is-invalid" : ""}`}
                          placeholder="請輸入密碼"
                          {...register("password", {
                            required: "密碼為必填",
                            minLength: {
                              value: 8,
                              message: "密碼至少需 8 位元",
                            },
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>

                    {/* 確認密碼 */}
                    <div className="mb-4 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        確認密碼<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="password"
                          className={`form-control ${errors.passwordConfirm ? "is-invalid" : ""}`}
                          placeholder="再次輸入密碼"
                          {...register("passwordConfirm", {
                            required: "請再次輸入密碼",
                            validate: (value) =>
                              value === passwordValue || "兩次密碼輸入不一致",
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.passwordConfirm?.message}
                        </div>
                      </div>
                    </div>

                    {/* 地址 */}
                    <div className="mb-6 d-flex align-items-start">
                      <label className="form-label flex-shrink-0 col-3 me-2 text-brown-500 pt-1">
                        地址<sup className="inp-required">*</sup>
                      </label>
                      <div className="w-100">
                        <input
                          type="text"
                          className={`form-control ${errors.address ? "is-invalid" : ""}`}
                          placeholder="輸入你的通訊地址"
                          {...register("address", { required: "地址為必填" })}
                        />
                        <div className="invalid-feedback">
                          {errors.address?.message}
                        </div>
                      </div>
                    </div>

                    <div className="d-grid mb-9">
                      <button
                        className="btn btn-form-login w-100"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "註冊中..." : "立即加入"}
                      </button>
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                      <p className="mb-0 me-2 text-brown-300">已經是會員？</p>
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
