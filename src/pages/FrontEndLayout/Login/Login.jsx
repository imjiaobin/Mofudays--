import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as bootstrap from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../app/layouts/components/Header/Header";
import Footer from "../../../app/layouts/components/Footer/Footer";
import { useAuth } from "../../../contexts/AuthContext";
import "./Login.scss";

//圖片載入
import loginSlider01 from "../../../assets/images/common/login-slider-01.png";
import loginSlider02 from "../../../assets/images/common/login-slider-02.png";
import loginSlider03 from "../../../assets/images/common/login-slider-03.png";

const API_BASE_URL = "http://localhost:3000";

export default function Login() {
  const { login } = useAuth(); // 取得全域登入函式
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [apiError, setApiError] = useState(""); // 僅保留全域 API 錯誤
  // const [wasValidated, setWasValidated] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 輪播初始化
  useEffect(() => {
    if (!carouselRef.current) return;

    const instance = bootstrap.Carousel.getOrCreateInstance(
      carouselRef.current,
      {
        interval: 3000,
        ride: "carousel",
        pause: false, // 可選：不要 hover 暫停
        touch: true,
        wrap: true,
      },
    );

    instance.cycle();

    return () => instance.dispose(); // 切頁時清掉，避免重複綁定
  }, []);

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        email: data.email,
        password: data.password,
      });

      // 從回傳資料中取出 accessToken 和 user 物件
      const { accessToken, user } = res.data;

      if (!accessToken) throw new Error("登入成功但未取得 token");

      // 決定儲存空間 (根據「記住我」勾選狀態)
      const storage = data.rememberMe ? localStorage : sessionStorage;

      // 儲存 Token
      storage.setItem("token", accessToken);

      // 新增：儲存 userId (從 user 物件中取出 id)
      if (user && user.id) {
        //建議儲存字串，轉成 String 較安全
        storage.setItem("userId", String(user.id));
      }

      // 呼叫 Context 的登入 (維持原樣)
      login(user, accessToken, data.rememberMe);

      // 跳轉頁面
      navigate("/", { replace: true });
    } catch (err) {
      console.error("登入錯誤詳情：", err.response?.data);
      const status = err?.response?.status;
      if (status === 400 || status === 401) {
        setError("password", { type: "manual", message: "帳號或密碼錯誤" });
        setError("email", { type: "manual", message: " " });
      } else {
        setApiError("登入失敗，伺服器連線異常");
      }
    }
  };

  return (
    <>
      {/* <Header /> */}
      <main>
        {/* <Announcement /> */}

        <div className="container login-section py-9">
          <div className="split-card overflow-hidden">
            <div className="row g-0">
              {/* <!-- 輪播圖 --> */}
              <section className="col-6 d-none p-0 d-md-block">
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
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
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
                        src={loginSlider03}
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
                    ></span>
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
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </section>
              {/* <!-- 登入表單 --> */}
              <section className="col-12 col-md-6 p-0">
                <div className="login-form">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="text-center mb-7">
                      <h2 className="text-brown-500">會員登入</h2>
                    </div>

                    {apiError && (
                      <div className="alert alert-danger" role="alert">
                        {apiError}
                      </div>
                    )}

                    {/* Email 欄位 */}
                    <div className="mb-4 d-flex align-items-center">
                      <label
                        htmlFor="email"
                        className="form-label flex-shrink-0 me-4 text-brown-500"
                      >
                        帳號
                      </label>
                      <div className="w-100">
                        <input
                          type="email"
                          id="email"
                          placeholder="輸入你的帳號"
                          // 6. 註冊與驗證規則
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          {...register("email", {
                            required: "請輸入 Email",
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

                    {/* Password 欄位 */}
                    <div className="mb-5 d-flex align-items-center">
                      <label
                        htmlFor="password"
                        className="form-label flex-shrink-0 me-4 text-brown-500"
                      >
                        密碼
                      </label>
                      <div className="w-100">
                        <input
                          type="password"
                          id="password"
                          placeholder="輸入你的密碼"
                          className={`form-control ${errors.password ? "is-invalid" : ""}`}
                          {...register("password", {
                            required: "請輸入密碼",
                            minLength: { value: 6, message: "密碼至少 6 位" },
                          })}
                        />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>

                    {/* Remember me */}
                    <div className="d-flex justify-content-between mb-5">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          {...register("rememberMe")}
                        />
                        <label
                          className="form-check-label text-brown-500"
                          htmlFor="rememberMe"
                        >
                          記住我
                        </label>
                      </div>
                      <div className="forgot-password">
                        <a href="#" className="text-brown-500">
                          忘記密碼？
                        </a>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="d-grid mb-9">
                      <button
                        className="btn btn-form-login w-100"
                        type="submit"
                        disabled={isSubmitting} // 使用 RHF 內建的提交狀態
                      >
                        {isSubmitting ? "登入中..." : "登入"}
                      </button>
                    </div>

                    {/* Signup */}
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="mb-0 me-2 text-brown-300">還不是會員嗎？</p>
                      <Link to="/signup">
                        <button
                          type="button"
                          className="btn btn-form-signup fw-bold"
                          disabled={isSubmitting}
                        >
                          馬上加入
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
