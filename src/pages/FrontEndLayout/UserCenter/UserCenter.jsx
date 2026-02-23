import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./userCenter.scss";

// import heroYellowPattern from "../../../assets/images/userCenter/hero_yellow_pattern.png";
// import heroGreenPattern from "../../../assets/images/userCenter/hero_green_pattern.png";
import faqFootprint from "../../../assets/images/userCenter/FAQ_footprint_patten.png";
import memberPersonal from "../../../assets/images/userCenter/member_personal_1.png";

export default function UserCenter() {
  useEffect(() => {
    document.title = "毛日和-會員中心";
  }, []);

  // 讓 NavLink 套用button class + active 
  const tabBtnClass = ({ isActive }) =>
    [
      "btn",
      "button-outline-primary",
      "btn-member",
      "rounded-pill",
      isActive ? "active" : "",
    ].join(" "); // 保留 css 間的空格

  return (
    <main className="member-center position-relative mb-80">
      <div className="container">
        {/* <img
          src={heroYellowPattern}
          alt="黃色裝飾"
          className="position-absolute yellow-patten-1 z-3"
        />
        <img
          src={heroGreenPattern}
          alt="綠色裝飾"
          className="position-absolute green-patten-1 me-0 z-3"
        /> */}

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 position-relative">
            <div class="d-flex flex-column-reverse flex-lg-row align-items-center align-items-lg-end justify-content-center justify-content-lg-between gap-4 mt-16 mb-24">
              <img src={faqFootprint}
                      alt="三個小腳掌"
                      class="foot-print" aria-hidden="true"></img>
              <ul
                className="nav nav-pills d-flex align-items-end flex-fill ps-80"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item me-16" role="presentation">
                  <NavLink
                    to="profile"
                    end
                    className={tabBtnClass}
                    role="tab"
                    aria-controls="pills-profile"
                  >
                    <span className="icon-user-round-pen align-bottom" />
                    <span className="ms-2">會員資料</span>
                  </NavLink>
                </li>

                <li className="nav-item me-16" role="presentation">
                  <NavLink
                    to="orders"
                    className={tabBtnClass}
                    role="tab"
                    aria-controls="pills-orderlists"
                  >
                    <span className="icon-receipt-text align-bottom" />
                    <span className="ms-2">訂單管理</span>
                  </NavLink>
                </li>

                <li className="nav-item" role="presentation">
                  <NavLink
                    to="events"
                    className={tabBtnClass}
                    role="tab"
                    aria-controls="pills-exclusives"
                  >
                    <span className="icon-ticket-check align-bottom" />
                    <span className="ms-2">會員專屬活動</span>
                  </NavLink>
                </li>
              </ul>
              <img src={memberPersonal} alt="狗狗看著主人訂閱圖" class="member-img-tab flex-fill"></img>
            </div>
            
            <div className="tab-content p-48 bg-yellow bg-radius py-40 px-55">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}