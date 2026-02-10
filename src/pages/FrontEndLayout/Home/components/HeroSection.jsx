import React from "react";
// 1. 先引入圖片
import heroHeadlineDesktop from "../../../assets/images/index/01_hero_headline_desktop.svg";
import heroHeadlineMobile from "../../../assets/images/index/01_hero_headline_mobile.svg";
import heroImg from "../../../assets/images/index/hero_img.png";
import bonePatten from "../../../assets/images/index/hero_bone_patten.svg";
import greenPatten from "../../../assets/images/index/hero_green_patten.svg";
import yellowPatten from "../../../assets/images/index/hero_yellow_patten.svg";

const HeroSection = () => {
  return (
    <section className="hero position-relative">
      <div className="container py-11">
        <div className="row justify-content-center g-5">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
            {/* 2. 在 src 使用變數 */}
            <img
              src={heroHeadlineDesktop}
              alt="headline"
              className="hero-headline d-none d-md-block"
            />
            <img
              src={heroHeadlineMobile}
              alt="headline-mobile"
              className="hero-headline-mobile d-block d-md-none"
            />

            <div className="custom-dashed border-dashed my-4 my-md-6"></div>
            <h2 className="h5 text-brown-300 mb-4 mb-md-12 ls-10 hero-subtitle">
              每月一盒小驚喜，
              <br className="d-block d-sm-none" />
              讓陪伴更輕鬆也更有温度
            </h2>
            <a
              className="btn rounded-pill btn-primary btn-subscribe hero-button"
              href="#"
              role="button"
            >
              立即訂閱
            </a>
          </div>
          <div className="col-md-6 col-12 hero-image-col">
            <img src={heroImg} className="img-fluid w-100" alt="hero_img" />
          </div>
        </div>
      </div>
      {/* 背景裝飾 */}
      <img
        src={bonePatten}
        alt="bone"
        className="decor bone d-none d-md-block"
      />
      <img src={greenPatten} alt="green" className="decor green_patten" />
      <img src={yellowPatten} alt="yellow" className="decor yellow_patten" />
    </section>
  );
};

export default HeroSection;
