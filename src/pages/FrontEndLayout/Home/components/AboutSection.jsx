import React, { useEffect } from "react";
import aboutImg from "../../../../assets/images/index/about_img.png";
import aboutHeadline from "../../../../assets/images/index/02_about_headline_desktop.svg";
import footprintPatten from "../../../../assets/images/index/about_footprint_patten.svg";

const AboutSection = () => {
  useEffect(() => {
    const styleId = "about-extra-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes footprintFloat {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        .about .decor.footprint {
          animation: footprintFloat 5s ease-in-out infinite;
        }
        .about .col-5:first-child img {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          border-radius: 12px;
        }
        .about .col-5:first-child img:hover {
          transform: scale(1.03) rotate(-1deg);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .about .p1 {
          transition: color 0.3s ease;
        }
        .about .p1:hover {
          color: var(--bs-primary, #f0854a);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section className="about position-relative bg-secondary-300">
      <div className="container py-9">
        <div className="row justify-content-center g-5">
          <div
            className="col-12 col-md-10 col-lg-5 mb-4 mb-lg-0"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img src={aboutImg} alt="about" className="img-fluid w-100" />
          </div>

          <div className="col-12 col-md-10 col-lg-5 d-flex flex-column justify-content-center  align-items-center align-items-lg-start mx-auto mx-lg-0">
            <img
              src={aboutHeadline}
              alt="about_headline"
              className="mb-4 about-headline-desktop mx-auto mx-lg-0"
              style={{ maxWidth: "100%", height: "auto" }}
              data-aos="fade-down"
              data-aos-delay="200"
            />
            <div className="text-center text-lg-start w-100">
              <h3 className="p1" data-aos="fade-up" data-aos-delay="300">
                毛日和，靈感來自日文的「OO日和」
              </h3>
              <h3 className="p1" data-aos="fade-up" data-aos-delay="400">
                意指最適合做某件事的好日子
              </h3>
              <h3 className="p1" data-aos="fade-up" data-aos-delay="500">
                我們相信，毛孩是家人，
                <br className="mobile-br" />
                每一天都該是他們的幸福日子
              </h3>
            </div>
          </div>
        </div>
      </div>

      <img src={footprintPatten} alt="footprint" className="decor footprint" />
    </section>
  );
};

export default AboutSection;
