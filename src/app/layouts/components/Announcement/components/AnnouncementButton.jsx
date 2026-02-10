import React from "react";

const AnnouncementButton = ({ isLoggedIn }) => {
  const config = isLoggedIn
    ? { text: "會員中心", link: "/profile" }
    : { text: "立即註冊", link: "/signup" };

  return (
    <a href={config.link}>
      <button type="button" className="btn btn-signup py-1 px-3 fw-bold">
        {config.text}
      </button>
    </a>
  );
};

export default AnnouncementButton;
