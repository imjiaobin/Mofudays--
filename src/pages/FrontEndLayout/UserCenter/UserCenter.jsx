import { useEffect } from "react";
import UserProfile from "./UserProfile";
import MemberExclusives from "./MemberExclusive";

// scss載入
import "./userCenter.scss";

// 圖片載入
import heroYellowPattern from "../../../assets/images/userCenter/hero_yellow_pattern.png";
import heroGreenPattern from "../../../assets/images/userCenter/hero_green_pattern.png";
import OrderList from "./OrderLists";

// 主元件
export default function UserInfo() {
  useEffect(() => {
    document.title = "會員中心";
  }, []);

  return (
    <main className="member-center position-relative mb-80">
      <div className="container">
        {/* 裝飾圖：先確定你圖片放哪裡（建議 public/assets/...） */}
        <img
          src={heroYellowPattern}
          alt="黃色裝飾"
          className="position-absolute yellow-patten-1 z-3"
        />
        <img
          src={heroGreenPattern}
          alt="綠色裝飾"
          className="position-absolute green-patten-1 me-0 z-3"
        />

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 position-relative">
            {/* tab區塊 */}
            <ul
              className="nav nav-pills d-flex align-items-end"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item me-16" role="presentation">
                <button
                  className="btn button-outline-primary btn-member active rounded-pill"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="true"
                >
                  <span className="icon-user-round-pen align-bottom"></span>
                  <span className="ms-2">會員資料</span>
                </button>
              </li>

              <li className="nav-item me-16" role="presentation">
                <button
                  className="btn button-outline-primary btn-member rounded-pill"
                  id="pills-orderlists-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-orderlists"
                  type="button"
                  role="tab"
                  aria-controls="pills-orderlists"
                  aria-selected="false"
                >
                  <span className="icon-receipt-text align-bottom"></span>
                  <span className="ms-2">訂單管理</span>
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="btn button-outline-primary btn-member rounded-pill"
                  id="pills-exclusives-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-exclusives"
                  type="button"
                  role="tab"
                  aria-controls="pills-exclusives"
                  aria-selected="false"
                >
                  <span className="icon-ticket-check align-bottom"></span>
                  <span className="ms-2">會員專屬活動</span>
                </button>
              </li>
            </ul>

            {/* 頁面內容 */}
            <div
              className="tab-content p-48 bg-yellow bg-radius py-40 px-55"
              id="pills-tabContent"
            >
              {/* tab-會員資料 */}
              <div
                className="member-data tab-pane fade show active"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex={0}
              >
                <UserProfile />
              </div>

              {/* tab-訂閱資料 */}
              <div
                className="member-orderlist tab-pane fade mt-16"
                id="pills-orderlists"
                role="tabpanel"
                aria-labelledby="pills-orderlists-tab"
                tabIndex={0}
              >
                <OrderList />
              </div>

              {/* Member */}
              <div
                className="tab-pane fade theme-event"
                id="pills-exclusives"
                role="tabpanel"
                aria-labelledby="pills-exclusives-tab"
                tabIndex={0}
              >
                <MemberExclusives />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
