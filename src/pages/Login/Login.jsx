import { useState, useEffect, useRef } from "react";
import "./Login.scss";
import axios from "axios";
import * as bootstrap from "bootstrap";
import { Link } from "react-router-dom";

//圖片載入
import loginSlider01 from "../../assets/images/common/login-slider-01.png";
import loginSlider02 from "../../assets/images/common/login-slider-02.png";
import loginSlider03 from "../../assets/images/common/login-slider-03.png";

export default function Login() {
  const formRef = useRef(null);
  const carouselRef = useRef(null);
  const [wasValidated, setWasValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
                  className="carousel slide"
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
                  <form
                    ref={formRef}
                    className={`needs-validation ${wasValidated ? "was-validated" : ""}`}
                    noValidate
                  >
                    <div className="text-center mb-7">
                      <h2 className="text-brown-500">會員登入</h2>
                    </div>
                    {/* <!-- 帳號 --> */}
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
                          className="form-control w-100"
                          id="email"
                          placeholder="輸入你的帳號"
                          required
                        />
                        <div className="invalid-feedback">
                          帳號不存在，請重新輸入
                        </div>
                      </div>
                    </div>
                    {/* <!-- 密碼 --> */}
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
                          className="form-control w-100"
                          id="password"
                          placeholder="輸入你的密碼"
                          required
                        />
                        <div className="invalid-feedback">
                          密碼錯誤，請重新輸入
                        </div>
                      </div>
                    </div>
                    {/* <!-- 記住我&忘記密碼 --> */}
                    <div className="d-flex justify-content-between mb-5">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="rememberme"
                        />
                        <label
                          className="form-check-label text-brown-500"
                          htmlFor="rememberme"
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
                    {/* <!-- 登入按鈕 --> */}
                    <div className="d-grid mb-9">
                      <button
                        className="btn btn-form-login w-100"
                        type="submit"
                      >
                        登入
                      </button>
                    </div>
                    {/* <!-- 註冊連結 --> */}
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="mb-0 me-2 text-brown-300">還不是會員嗎？</p>
                      <Link to="/signup">
                        <button
                          type="button"
                          className="btn btn-form-signup fw-bold"
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
