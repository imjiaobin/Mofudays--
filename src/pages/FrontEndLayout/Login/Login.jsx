import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as bootstrap from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../slices/userAuthSlice";
import "./Login.scss";

import loginSlider01 from "../../../assets/images/common/login-slider-01.png";
import loginSlider02 from "../../../assets/images/common/login-slider-02.png";
import loginSlider03 from "../../../assets/images/common/login-slider-03.png";

import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

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
        pause: false,
        touch: true,
        wrap: true,
      },
    );
    instance.cycle();
    return () => instance.dispose();
  }, []);

  const onSubmit = async (data) => {
    const result = await dispatch(
      userLogin({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }),
    );

    if (userLogin.fulfilled.match(result)) {
      toast.success("登入成功！歡迎回來 👋");
      navigate("/", { replace: true });
    } else {
      // result.payload 就是 rejectWithValue 傳回的錯誤訊息
      const errMsg = result.payload || "登入失敗";
      setError("password", { type: "manual", message: errMsg });
      setError("email", { type: "manual", message: " " });
    }
  };

  return (
    <>
      <main>
        <div className="container login-section py-9">
          <div className="split-card overflow-hidden">
            <div className="row g-0">
              {/* <!-- 輪播圖 --> */}
              <section className="col-lg-6 d-none p-0 d-lg-flex flex-column">
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

              {/* 登入表單 */}
              <section className="col-lg-6 p-0">
                <div className="login-form">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="text-center mb-7">
                      <h2 className="text-brown-500 text-nowrap">會員登入</h2>
                    </div>

                    {/* Email */}
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

                    {/* Password */}
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
                    <div className="d-flex justify-content-between align-items-center mb-5 gap-2">
                      <div className="form-check mb-0 flex-shrink-0 me-md-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          {...register("rememberMe")}
                        />
                        <label
                          className="form-check-label text-brown-500 text-nowrap"
                          htmlFor="rememberMe"
                        >
                          記住我
                        </label>
                      </div>
                      <div className="forgot-password flex-shrink-0 ">
                        <a href="#" className="text-brown-500 text-nowrap">
                          忘記密碼？
                        </a>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="d-grid mb-9">
                      <button
                        className="btn btn-form-login w-100"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "登入中..." : "登入"}
                      </button>
                    </div>

                    {/* Signup */}
                    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-2">
                      <p className="mb-0 me-2 text-brown-300">還不是會員嗎？</p>
                      <Link
                        to="/signup"
                        className="d-flex justify-content-center"
                      >
                        <button
                          type="button"
                          className="btn btn-form-signup fw-bold text-nowrap"
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
    </>
  );
}
