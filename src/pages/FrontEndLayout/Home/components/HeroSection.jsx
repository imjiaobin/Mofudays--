import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 引入圖片
import heroHeadlineDesktop from "../../../../assets/images/index/01_hero_headline_desktop.svg";
import heroHeadlineMobile from "../../../../assets/images/index/01_hero_headline_mobile.svg";
import heroImg from "../../../../assets/images/index/hero_img.png";
import bonePatten from "../../../../assets/images/index/hero_bone_patten.svg";
import greenPatten from "../../../../assets/images/index/hero_green_patten.svg";
import yellowPatten from "../../../../assets/images/index/hero_yellow_patten.svg";
import { checkLoginStatus } from "../../../../api/userApi";
import { toast } from "react-toastify";

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 裝飾圖浮動 + 按鈕特效
    const styleId = "hero-extra-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatSway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        .hero .decor.bone {
          animation: floatSway 5s ease-in-out infinite;
        }
        .hero .decor.green_patten {
          animation: floatUpDown 4s ease-in-out infinite;
        }
        .hero .decor.yellow_patten {
          animation: floatUpDown 6s ease-in-out infinite 1s;
        }
        .hero .hero-image-col img {
          animation: floatUpDown 5s ease-in-out infinite 0.5s;
        }
        .hero .btn-subscribe {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hero .btn-subscribe:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .hero .btn-subscribe:active {
          transform: translateY(0px) scale(0.98);
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
    <section className="hero position-relative">
      <div className="container py-11">
        <div className="row justify-content-center g-5">
          <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center">
            <img
              src={heroHeadlineDesktop}
              alt="headline"
              className="hero-headline d-none d-md-block"
              data-aos="fade-right"
              data-aos-delay="100"
            />
            <img
              src={heroHeadlineMobile}
              alt="headline-mobile"
              className="hero-headline-mobile d-block d-md-none"
              data-aos="fade-down"
              data-aos-delay="100"
            />
            <div
              className="custom-dashed border-dashed my-4 my-md-6"
              data-aos="fade-in"
              data-aos-delay="300"
            ></div>
            <h2
              className="h5 text-brown-300 mb-4 mb-md-12 ls-10 hero-subtitle"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              每月一盒小驚喜，
              <br className="d-block d-sm-none" />
              讓陪伴更輕鬆也更有温度
            </h2>
            <button
              type="button"
              className="btn rounded-pill btn-primary btn-subscribe hero-button"
              onClick={handleSubscribeClick}
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              立即訂閱
            </button>
          </div>

          <div
            className="col-lg-6 hero-image-col"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img src={heroImg} className="img-fluid w-100" alt="hero_img" />
          </div>
        </div>
      </div>

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
