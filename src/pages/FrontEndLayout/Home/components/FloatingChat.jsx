import React from "react";

const FloatingChat = ({ isOpen, toggleChat }) => {
  return (
    <>
      <button
        className="customer-service-btn"
        type="button"
        onClick={toggleChat}
      >
        <span>
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-chat-dots"}`}></i>
          {isOpen ? " 關閉視窗" : " 客服中心"}
        </span>
      </button>

      {/* 將 d-none 換成你的 SCSS 定義的 show */}
      <div
        className={`customer-service-chat py-12 ${isOpen ? "show" : ""}`}
        id="customerServiceChat"
      >
        <div className="chat-header mb-4 text-center">
          <div className="title-large px-4">您好，我們能提供什麼幫助？</div>
        </div>
        <div className="chat-body mx-12">
          <a href="#" className="chat-button mb-2 d-block text-decoration-none">
            常見問題 <i className="bi bi-file-earmark"></i>
          </a>
          <a href="#" className="chat-button d-block text-decoration-none">
            傳訊息給我們 <i className="bi bi-envelope"></i>
          </a>
          <div className="chat-footer mt-4 text-center p3">
            上班時間：週一到週五 10:00 - 19:00
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingChat;
