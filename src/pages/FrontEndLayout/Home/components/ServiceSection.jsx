import React from "react";

// --- 圖片引入 ---
import headlineDesktop from "../../../assets/images/index/03_service_headline_desktop.svg";
import headlineMobile from "../../../assets/images/index/03_service_headline_mobile.svg";

// 服務卡片主圖
import service01 from "../../../assets/images/index/service_01.png";
import service02 from "../../../assets/images/index/service_02.png";
import service03 from "../../../assets/images/index/service_03.png";
import service04 from "../../../assets/images/index/service_04.png";

// Hover Icon
import iconTime from "../../../assets/images/index/time.svg";
import iconGem from "../../../assets/images/index/gem.svg";
import iconGift from "../../../assets/images/index/gift.svg";
import iconHeart from "../../../assets/images/index/book-heart.svg";

const ServiceSection = () => {
  return (
    <section className="service">
      <div className="container py-9 py-md-11">
        {/* 標題圖 (RWD) */}
        <img
          src={headlineDesktop}
          alt="service_headline"
          className="mb-3 d-none d-md-block mx-auto"
        />
        <img
          src={headlineMobile}
          alt="service_headline_mobile"
          className="mb-3 d-block d-md-none mx-auto"
        />

        <h3 className="mb-12 mb-md-6 text-center title-large text-primary-500">
          與毛孩創造不一樣的回憶
        </h3>

        <div className="row">
          {/* 卡片 1 */}
          <div className="service_card col-md-3 p-4">
            <div className="image-wrapper mb-5 d-block mx-auto">
              <img
                src={service01}
                alt="service_step_1"
                className="img-fluid w-100"
              />
              <div className="hover-icon">
                <img src={iconTime} alt="time" />
              </div>
            </div>
            <h4 className="title-medium">工作忙碌，難以備貨？</h4>
            <div className="custom-dashed border-dashed my-2 my-md-4"></div>
            <p className="p2">訂閱服務會依照您的需求</p>
            <p className="p2">定期將精選好物送到家</p>
            <p className="p2">省下採買時間、專心陪伴毛孩</p>
          </div>

          {/* 卡片 2 */}
          <div className="service_card col-md-3 p-4">
            <div className="image-wrapper mb-5 d-block mx-auto">
              <img
                src={service02}
                alt="service_step_2"
                className="img-fluid w-100"
              />
              <div className="hover-icon">
                <img src={iconGem} alt="gem" />
              </div>
            </div>
            <h4 className="title-medium">產品過多，選擇困難？</h4>
            <div className="custom-dashed border-dashed my-2 my-md-4"></div>
            <p className="p2">替您嚴選高品質</p>
            <p className="p2">兼具實用與趣味的毛孩用品</p>
            <p className="p2">讓每次開箱都充滿驚喜與安心</p>
          </div>

          {/* 卡片 3 */}
          <div className="service_card col-md-3 p-4">
            <div className="image-wrapper mb-5 d-block mx-auto">
              <img
                src={service03}
                alt="service_step_3"
                className="img-fluid w-100"
              />
              <div className="hover-icon">
                <img src={iconGift} alt="gift" />
              </div>
            </div>
            <h4 className="title-medium">一如既往，毫無驚喜？</h4>
            <div className="custom-dashed border-dashed my-2 my-md-4"></div>
            <p className="p2">每期提供不同主題與新品</p>
            <p className="p2">幫助毛孩嘗試新鮮事物</p>
            <p className="p2">創造更多共同的美好回憶</p>
          </div>

          {/* 卡片 4 */}
          <div className="service_card col-md-3 p-4">
            <div className="image-wrapper mb-5 d-block mx-auto">
              <img
                src={service04}
                alt="service_step_4"
                className="img-fluid w-100"
              />
              <div className="hover-icon">
                <img src={iconHeart} alt="book-heart" />
              </div>
            </div>
            <h4 className="title-medium">多寵家庭，難以管理？</h4>
            <div className="custom-dashed border-dashed my-2 my-md-4"></div>
            <p className="p2">提供多樣化、可彈性調整的方案</p>
            <p className="p2">滿足不同毛孩的需求</p>
            <p className="p2">讓飼主更輕鬆管理每一位寶貝</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
