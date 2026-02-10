import React from "react";
import aboutImg from "../../../assets/images/index/about_img.png";
import aboutHeadline from "../../../assets/images/index/02_about_headline_desktop.svg";
import footprintPatten from "../../../assets/images/index/about_footprint_patten.svg";

const AboutSection = () => {
  return (
    <section className="about position-relative bg-secondary-300">
      <div className="container py-9">
        <div className="row justify-content-center g-5">
          <div className="col-5">
            <img src={aboutImg} alt="about" className="img-fluid w-100" />
          </div>
          <div className="col-5 d-flex flex-column justify-content-center align-items-start">
            <img
              src={aboutHeadline}
              alt="about_headline"
              className="mb-4 about-headline-desktop"
            />
            <h3 className="p1">毛日和，靈感來自日文的「OO日和」</h3>
            <h3 className="p1">意指最適合做某件事的好日子</h3>
            <h3 className="p1">
              我們相信，毛孩是家人，
              <br className="mobile-br" />
              每一天都該是他們的幸福日子
            </h3>
          </div>
        </div>
      </div>
      <img src={footprintPatten} alt="footprint" className="decor footprint" />
    </section>
  );
};

export default AboutSection;
