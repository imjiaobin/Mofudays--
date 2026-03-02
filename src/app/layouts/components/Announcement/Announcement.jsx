import { useState } from "react";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import AnnouncementButton from "./components/AnnouncementButton";
import { useSelector } from "react-redux";
import { selectIsUserAuthed } from "../../../../slices/userAuthSlice";
import "./Announcement.scss";

const Announcement = () => {
  const announcementMessages = [
    "新註冊會員：首單現折$60",
    "滿千免運優惠中！",
    "訂閱禮盒，每月驚喜送到家",
  ];

  const isAuthed = useSelector(selectIsUserAuthed);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <nav className="announcement">
      <div className="container">
        <div className="row align-items-center g-2">
          <div className="col-10 col-md-4 offset-md-3">
            <AnnouncementCarousel items={announcementMessages} />
          </div>
          <div className="col-12 col-md-2 text-center order-last order-md-0">
            <AnnouncementButton isLoggedIn={isAuthed} />
          </div>
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
