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
        <div className="row align-items-center">
          <div className="col-3"></div>
          <div className="col-4">
            <AnnouncementCarousel items={announcementMessages} />
          </div>

          <div className="col-1"></div>

          <div className="col-2 text-center">
            <AnnouncementButton isLoggedIn={isAuthed} />
          </div>

          <div className="col-2 text-end">
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
