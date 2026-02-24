import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./userCenter.scss";

// 匯入圖片
import faqFootprint from "../../../assets/images/userCenter/FAQ_footprint_patten.png";
import memberPersonal from "../../../assets/images/userCenter/member_personal_1.png";

export default function UserCenterLayout() {
  useEffect(() => {
    document.title = "毛日和-會員中心";
  }, []);

  return (
    <main className="member-center position-relative mb-80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 position-relative">
            <div className="d-flex align-items-center justify-content-between gap-4 mt-16 mb-24">
              <img
                src={faqFootprint}
                alt="腳印"
                className="foot-print"
                aria-hidden="true"
              />
              <div className="flex-fill"></div>

              <img
                src={memberPersonal}
                alt="狗狗"
                className="member-img-tab flex-fill"
              />
            </div>
            <div className="tab-content p-48 bg-yellow bg-radius py-40 px-55">
              <Outlet /> {/* 這裡會渲染 Profile, Orders, 或 Events */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
