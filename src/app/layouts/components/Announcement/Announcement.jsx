import { useState } from "react";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import AnnouncementButton from "./components/AnnouncementButton";
import { useAuth } from "../../../../contexts/AuthContext";
import "./Announcement.scss";

const Announcement = () => {
  //編輯公告訊息陣列
  const announcementMessages = [
    "新註冊會員：首單現折$60",
    "滿千免運優惠中！",
    "訂閱禮盒，每月驚喜送到家",
  ];

  const { isAuthed } = useAuth();
  //公告欄關閉功能狀態
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <nav className="announcement">
      <div className="container">
        <div className="row align-items-center g-2">
          {" "}
          {/* 加入 g-2 增加間距 */}
          {/* 1. 跑馬燈：手機版佔 10，留 2 給關閉按鈕；桌機版維持原本比例 */}
          <div className="col-10 col-md-4 offset-md-3">
            <AnnouncementCarousel items={announcementMessages} />
          </div>
          {/* 2. 按鈕：手機版置中並換行；桌機版恢復原本排列 */}
          <div className="col-12 col-md-2 text-center order-last order-md-0">
            <AnnouncementButton isLoggedIn={isAuthed} />
          </div>
          {/* 3. 關閉按鈕：絕對定位或在手機版靠右 */}
          <div className="col-2 col-md-2 text-end">
            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              aria-label="Close"
              onClick={() => setIsVisible(false)}
            ></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Announcement;
