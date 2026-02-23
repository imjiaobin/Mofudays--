import { useNavigate } from "react-router-dom";

// --- 圖片引入  ---
// 標題與裝飾
import processHeadlineDesktop from "../../../../assets/images/index/04_process_headline_desktop.svg";
import processHeadlineMobile from "../../../../assets/images/index/04_process_headline_mobile.svg";
import boxHeadlineDesktop from "../../../../assets/images/index/05_box_headline_desktop.svg";
import boxHeadlineMobile from "../../../../assets/images/index/05_box_headline_mobile.svg";
import openboxDecor from "../../../../assets/images/index/process_openbox_patten.svg";
import petsSayDecor from "../../../../assets/images/index/pets_say.png";

// 步驟圖與 Icon
import step01Img from "../../../../assets/images/index/step_01.png";
import step02Img from "../../../../assets/images/index/step_02.png";
import step03Img from "../../../../assets/images/index/step_03.png";
import step01Icon from "../../../../assets/images/index/service_step_1.svg";
import step02Icon from "../../../../assets/images/index/service_step_2.svg";
import step03Icon from "../../../../assets/images/index/service_step_3.svg";
import step04Icon from "../../../../assets/images/index/service_step_4.svg";

// 盒子卡片圖
import box01 from "../../../../assets/images/index/box_01.png";
import box02 from "../../../../assets/images/index/box_02.png";
import box03 from "../../../../assets/images/index/box_03.png";

// import { checkLoginStatus } from "../../../../api/userApi";

const ProcessSection = () => {
  const navigate = useNavigate();

  // 處理「立即訂閱」的點擊事件(cookie版)
  // const handleSubscribe = (e) => {
  //   e.preventDefault();

  //   // 取得 document.cookie 中的 mofuToken
  //   const getCookie = (name) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(";").shift();
  //   };

  //   const mofuToken = getCookie("mofuToken");

  //   if (mofuToken) {
  //     // 有 Token：跳轉到 PetInfo
  //     navigate("/pet-info");
  //   } else {
  //     // 無 Token：提示並跳轉到 Signup
  //     alert("請先註冊並登入會員，即可開始為毛孩訂閱專屬驚喜盒！");
  //     navigate("/signup");
  //   }
  // };

  // 處理「立即訂閱」的點擊事件
  const handleSubscribeClick = () => {
    navigate("/petinfo");
  };
  return (
    <section className="process position-relative">
      <div className="container py-9 py-md-11">
        {/* --- 流程標題 --- */}
        <img
          src={processHeadlineDesktop}
          alt="process_headline"
          className="mb-3 d-none d-md-block mx-auto"
        />
        <img
          src={processHeadlineMobile}
          alt="process_headline_mobile"
          className="mb-3 d-block d-md-none mx-auto"
        />
        <h3 className="mb-6 title-large text-center text-primary-500">
          每月一盒讓他感受到你的心意
        </h3>

        {/* --- 流程步驟 (4步) --- */}
        <div className="process-steps">
          {/* 步驟1: 圖左文右 */}
          <div className="row d-flex justify-content-center mb-md-5">
            <div className="col-md-4 col-12 process-item image-item me-md-5 order-1 order-md-1">
              <img src={step01Img} alt="step1" />
            </div>
            <div className="col-md-4 col-12 process-item text-item order-2 order-md-2">
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

          {/* 步驟2: 文左圖右 */}
          <div className="row d-flex justify-content-center mb-md-5">
            <div className="col-md-4 col-12 process-item text-item me-md-5 order-2 order-md-1">
              <div className="step-icon">
                <img src={step02Icon} alt="foot_step2" />
              </div>
              <div className="text-content ms-4">
                <h4 className="title-medium">看推薦！</h4>
                <p>根據毛孩資料，推薦最適合的驚喜盒</p>
                <p>專屬於你們的每日幸福</p>
              </div>
            </div>
            <div className="col-md-4 col-12 process-item image-item order-1 order-md-2">
              <img src={step02Img} alt="step2" />
            </div>
          </div>

          {/* 步驟3: 圖左文右 */}
          <div className="row d-flex justify-content-center mb-md-5">
            <div className="col-md-4 col-12 process-item image-item me-md-5 order-1 order-md-1">
              <img src={step03Img} alt="step3" />
            </div>
            <div className="col-md-4 col-12 process-item text-item order-2 order-md-2">
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

          {/* 步驟4: 文左圖右 (註: 根據您的 HTML，這張圖用了 step_01) */}
          <div className="row d-flex justify-content-center mb-9 mb-md-11">
            <div className="col-md-4 col-12 process-item text-item me-md-5 order-2 order-md-1">
              <div className="step-icon">
                <img src={step04Icon} alt="foot_step4" />
              </div>
              <div className="text-content ms-4">
                <h4 className="title-medium">享受寵物盒！</h4>
                <p>開箱專屬毛孩的幸福時光</p>
                <p>從吃、玩到健康都被照顧到</p>
              </div>
            </div>
            <div className="col-md-4 col-12 process-item image-item order-1 order-md-2">
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
          />
          <img
            src={boxHeadlineMobile}
            alt="05_box_headline_mobile"
            className="mb-6 d-block d-md-none mx-auto"
          />

          <section className="product-section">
            <div className="product-layout">
              {/* 第一張卡片 */}
              <div className="product-card">
                <div className="card-background">
                  <img src={box01} alt="box1" className="product-image" />
                </div>
                <div className="card-text">零食 1～2 包</div>
              </div>

              {/* 第一個連接 icon */}
              <div className="connect-icon">
                <div className="icon-circle"></div>
              </div>

              {/* 第二張卡片 */}
              <div className="product-card">
                <div className="card-background">
                  <img src={box02} alt="box2" className="product-image" />
                </div>
                <div className="card-text">玩具 1～2 個</div>
              </div>

              {/* 第二個連接 icon */}
              <div className="connect-icon">
                <div className="icon-circle"></div>
              </div>

              {/* 第三張卡片 */}
              <div className="product-card">
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
        >
          立即訂閱
        </button>

        {/* --- 裝飾圖片 --- */}
        <img src={openboxDecor} alt="openbox" className="decor openbox" />
        <img src={petsSayDecor} alt="pets_say" className="decor petsay" />
      </div>
    </section>
  );
};

export default ProcessSection;
