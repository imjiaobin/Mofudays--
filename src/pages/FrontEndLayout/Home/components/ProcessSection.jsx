import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// --- 圖片引入 ---
import processHeadlineDesktop from "../../../../assets/images/index/04_process_headline_desktop.svg";
import processHeadlineMobile from "../../../../assets/images/index/04_process_headline_mobile.svg";
import boxHeadlineDesktop from "../../../../assets/images/index/05_box_headline_desktop.svg";
import boxHeadlineMobile from "../../../../assets/images/index/05_box_headline_mobile.svg";
import openboxDecor from "../../../../assets/images/index/process_openbox_patten.svg";
import petsSayDecor from "../../../../assets/images/index/pets_say.png";

import step01Img from "../../../../assets/images/index/step_01.png";
import step02Img from "../../../../assets/images/index/step_02.png";
import step03Img from "../../../../assets/images/index/step_03.png";
import step01Icon from "../../../../assets/images/index/service_step_1.svg";
import step02Icon from "../../../../assets/images/index/service_step_2.svg";
import step03Icon from "../../../../assets/images/index/service_step_3.svg";
import step04Icon from "../../../../assets/images/index/service_step_4.svg";

import box01 from "../../../../assets/images/index/box_01.png";
import box02 from "../../../../assets/images/index/box_02.png";
import box03 from "../../../../assets/images/index/box_03.png";

import { checkLoginStatus } from "../../../../api/userApi";

const ProcessSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const styleId = "process-extra-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes openboxFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes petsayFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .process .decor.openbox {
          animation: openboxFloat 5s ease-in-out infinite;
        }
        .process .decor.petsay {
          animation: petsayFloat 4s ease-in-out infinite 0.5s;
        }
        .process .process-item.image-item img {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .process .process-item.image-item img:hover {
          transform: scale(1.04) translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        }
        .process .step-icon img {
          transition: transform 0.3s ease;
        }
        .process .step-icon img:hover {
          transform: scale(1.15) rotate(-5deg);
        }
        .process .product-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .process .product-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 14px 36px rgba(0,0,0,0.1);
        }
        .process .btn-subscribe {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .process .btn-subscribe:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .process .btn-subscribe:active {
          transform: translateY(0px) scale(0.98);
        }
        .process .icon-circle {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleSubscribeClick = () => {
    const isAuthed = checkLoginStatus();
    if (isAuthed) {
      navigate("/petinfo");
    } else {
      toast.warn("請先登入以使用此功能！");
      navigate("/login");
    }
  };

  return (
    <section className="process position-relative">
      <div className="container py-9 py-md-11">
        {/* --- 流程標題 --- */}
        <img
          src={processHeadlineDesktop}
          alt="process_headline"
          className="mb-3 d-none d-md-block mx-auto"
          data-aos="fade-down"
          data-aos-delay="100"
        />
        <img
          src={processHeadlineMobile}
          alt="process_headline_mobile"
          className="mb-3 d-block d-md-none mx-auto"
          data-aos="fade-down"
          data-aos-delay="100"
        />
        <h3
          className="mb-6 title-large text-center text-primary-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          每月一盒讓他感受到你的心意
        </h3>

        {/* --- 流程步驟 --- */}
        <div className="process-steps">
          {/* 步驟1 */}
          <div className="row d-flex justify-content-center mb-md-5">
            <div
              className="col-md-4 col-12 process-item image-item me-md-5 order-1 order-md-1"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img src={step01Img} alt="step1" />
            </div>
            <div
              className="col-md-4 col-12 process-item text-item order-2 order-md-2"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="step-icon">
                <img src={step01Icon} alt="foot_step1" />
              </div>
              <div className="text-content ms-4">
                <h4 className="title-medium">填資料！</h4>
                <p>為毛孩填寫基本資訊</p>
                <p>我們才能更了解牠的需求與喜好</p>
              </div>
            </div>
          </div>

          {/* 步驟2 */}
          <div className="row d-flex justify-content-center mb-md-5">
            <div
              className="col-md-4 col-12 process-item text-item me-md-5 order-2 order-md-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="step-icon">
                <img src={step02Icon} alt="foot_step2" />
              </div>
              <div className="text-content ms-4">
                <h4 className="title-medium">看推薦！</h4>
                <p>根據毛孩資料，推薦最適合的驚喜盒</p>
                <p>專屬於你們的每日幸福</p>
              </div>
            </div>
            <div
              className="col-md-4 col-12 process-item image-item order-1 order-md-2"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <img src={step02Img} alt="step2" />
            </div>
          </div>

          {/* 步驟3 */}
          <div className="row d-flex justify-content-center mb-md-5">
            <div
              className="col-md-4 col-12 process-item image-item me-md-5 order-1 order-md-1"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img src={step03Img} alt="step3" />
            </div>
            <div
              className="col-md-4 col-12 process-item text-item order-2 order-md-2"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="step-icon">
                <img src={step03Icon} alt="foot_step3" />
              </div>
              <div className="text-content ms-4">
                <h4 className="title-medium">打包寄出！</h4>
                <p>精選内容打包完畢</p>
                <p>用心裝進每一份療癒與驚喜</p>
              </div>
            </div>
          </div>

          {/* 步驟4 */}
          <div className="row d-flex justify-content-center mb-9 mb-md-11">
            <div
              className="col-md-4 col-12 process-item text-item me-md-5 order-2 order-md-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="step-icon">
                <img src={step04Icon} alt="foot_step4" />
              </div>
              <div className="text-content ms-4">
                <h4 className="title-medium">享受寵物盒！</h4>
                <p>開箱專屬毛孩的幸福時光</p>
                <p>從吃、玩到健康都被照顧到</p>
              </div>
            </div>
            <div
              className="col-md-4 col-12 process-item image-item order-1 order-md-2"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <img src={step01Img} alt="step4" />
            </div>
          </div>
        </div>

        {/* --- 驚喜盒標題與內容區 --- */}
        <div className="mb-6">
          <img
            src={boxHeadlineDesktop}
            alt="05_box_headline"
            className="mb-6 d-none d-md-block mx-auto"
            data-aos="zoom-in"
            data-aos-delay="100"
          />
          <img
            src={boxHeadlineMobile}
            alt="05_box_headline_mobile"
            className="mb-6 d-block d-md-none mx-auto"
            data-aos="zoom-in"
            data-aos-delay="100"
          />

          <section className="product-section">
            <div className="product-layout">
              <div
                className="product-card"
                data-aos="flip-left"
                data-aos-delay="100"
              >
                <div className="card-background">
                  <img src={box01} alt="box1" className="product-image" />
                </div>
                <div className="card-text">零食 1～2 包</div>
              </div>

              <div
                className="connect-icon"
                data-aos="fade-in"
                data-aos-delay="250"
              >
                <div className="icon-circle"></div>
              </div>

              <div
                className="product-card"
                data-aos="flip-left"
                data-aos-delay="300"
              >
                <div className="card-background">
                  <img src={box02} alt="box2" className="product-image" />
                </div>
                <div className="card-text">玩具 1～2 個</div>
              </div>

              <div
                className="connect-icon"
                data-aos="fade-in"
                data-aos-delay="450"
              >
                <div className="icon-circle"></div>
              </div>

              <div
                className="product-card"
                data-aos="flip-left"
                data-aos-delay="500"
              >
                <div className="card-background">
                  <img src={box03} alt="box3" className="product-image" />
                </div>
                <div className="card-text">
                  專屬毛寵知識卡
                  <br />1 套
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- 訂閱按鈕 --- */}
        <button
          type="button"
          className="btn rounded-pill btn-primary btn-subscribe px-160 d-flex mx-auto"
          onClick={handleSubscribeClick}
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          立即訂閱
        </button>

        <img src={openboxDecor} alt="openbox" className="decor openbox" />
        <img src={petsSayDecor} alt="pets_say" className="decor petsay" />
      </div>
    </section>
  );
};

export default ProcessSection;
