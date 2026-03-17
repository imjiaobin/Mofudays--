import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./floating-chat-dogs.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

const SIZE_MAP = { S: "小型", M: "中型", L: "大型" };
const DIET_MAP = { PUPPY: "幼犬", ADULT: "成犬", SENIOR: "熟齡" };

const StatusBadge = ({ status }) => {
  const map = {
    訂閱中: { cls: "fq-badge--active", text: "● 訂閱中" },
    已取消: { cls: "fq-badge--cancelled", text: "○ 已取消" },
    無訂閱: { cls: "fq-badge--none", text: "— 無訂閱" },
  };
  const { cls, text } = map[status] || map["無訂閱"];
  return <span className={`fq-badge ${cls}`}>{text}</span>;
};

const DogList = ({ onBack }) => {
  const [dogs, setDogs] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchData = async () => {
      try {
        const [dogsRes, ordersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/dogs?ownerId=${userId}&isActive=true`, {
            headers,
          }),
          axios.get(`${API_BASE_URL}/600/orders?userId=${userId}`, { headers }),
        ]);

        const dogList = dogsRes.data;
        const orders = ordersRes.data;
        const allSubs = orders.flatMap((o) => o.subscriptions || []);

        const map = {};
        dogList.forEach((dog) => {
          const dogSubs = allSubs.filter((s) => s.dogId === dog.id);
          if (dogSubs.some((s) => s.subscriptionStatus === "訂閱中")) {
            map[dog.id] = "訂閱中";
          } else if (dogSubs.some((s) => s.subscriptionStatus === "已取消")) {
            map[dog.id] = "已取消";
          } else {
            map[dog.id] = "無訂閱";
          }
        });

        setDogs(dogList);
        setStatusMap(map);
      } catch (e) {
        console.error("FloatingChat fetchData error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fq-dog-view">
      <button className="fq-back-btn" type="button" onClick={onBack}>
        <i className="bi bi-arrow-left"></i> 返回
      </button>
      <div className="fq-section-title">我的毛孩</div>
      {loading ? (
        <div className="fq-loading">載入中...</div>
      ) : dogs.length === 0 ? (
        <div className="fq-empty">還沒有毛孩資料 🐾</div>
      ) : (
        <ul className="fq-dog-list">
          {dogs.map((dog) => (
            <li key={dog.id} className="fq-dog-item">
              <span className="fq-dog-emoji">🐶</span>
              <div className="fq-dog-info">
                <span className="fq-dog-name">{dog.name}</span>
                <span className="fq-dog-meta">
                  {SIZE_MAP[dog.size]} · {DIET_MAP[dog.dietStage]}
                </span>
              </div>
              <StatusBadge status={statusMap[dog.id]} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MainMenu = ({ onGoFaq, onGoDogs, isLoggedIn }) => (
  <div className="px-4">
    <a
      href="/faq"
      onClick={onGoFaq}
      className="chat-button mb-2 d-block text-decoration-none"
    >
      常見問題 <i className="bi bi-file-earmark"></i>
    </a>
    {isLoggedIn && (
      <button
        type="button"
        className="chat-button fq-dog-btn d-block w-100 text-decoration-none mb-2"
        onClick={onGoDogs}
      >
        查看我的毛孩 <i className="bi bi-house-heart"></i>
      </button>
    )}
    <a
      href="mailto:service.maorihe@gmail.com"
      className="chat-button mb-2 d-block text-decoration-none"
    >
      傳訊息給我們 <i className="bi bi-envelope"></i>
    </a>
    <div className="chat-footer mt-3 text-center p3">
      上班時間：週一到週五 10:00 - 19:00
    </div>
  </div>
);

const FloatingChat = ({ isOpen, toggleChat }) => {
  const navigate = useNavigate();
  const [view, setView] = useState("menu");
  const isLoggedIn = !!localStorage.getItem("token");
  const isOpenRef = useRef(isOpen);

  // 同步 ref，讓 modal 事件 handler 能拿到最新的 isOpen
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // FocusTrap 防護
  useEffect(() => {
    const modalEl = document.getElementById("newsModal");
    if (!modalEl) return;

    const chatBtn = document.querySelector(".customer-service-btn");
    const chatPanel = document.querySelector(".customer-service-chat");

    const handleShow = () => {
      chatBtn?.setAttribute("inert", "");
      chatPanel?.setAttribute("inert", "");
      // modal 開啟時若 chat 是開的，強制關掉
      if (isOpenRef.current) toggleChat();
    };

    const handleHide = () => {
      chatBtn?.removeAttribute("inert");
      chatPanel?.removeAttribute("inert");
    };

    modalEl.addEventListener("show.bs.modal", handleShow);
    modalEl.addEventListener("hidden.bs.modal", handleHide);

    return () => {
      modalEl.removeEventListener("show.bs.modal", handleShow);
      modalEl.removeEventListener("hidden.bs.modal", handleHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空陣列：只掛一次，透過 ref 拿最新狀態

  const handleToggle = () => {
    toggleChat();
    if (isOpen) setView("menu");
  };

  const goToFaq = (e) => {
    e.preventDefault();
    navigate("/faq");
    handleToggle();
  };

  return (
    <>
      <button
        className="customer-service-btn"
        type="button"
        onClick={handleToggle}
      >
        <span>
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-search"}`}></i>
          {isOpen ? " 關閉視窗" : " 快速查詢"}
        </span>
      </button>

      <div
        className={`customer-service-chat py-3 ${isOpen ? "show" : ""}`}
        id="customerServiceChat"
      >
        <div className="chat-header mb-3 text-center px-4">
          <div className="title-large">
            {view === "dogs" ? "我的毛孩 🐾" : "需要幫忙嗎？"}
          </div>
        </div>
        <div className="chat-body">
          {view === "menu" ? (
            <MainMenu
              onGoFaq={goToFaq}
              onGoDogs={() => setView("dogs")}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <div className="px-4">
              <DogList onBack={() => setView("menu")} />
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fq-overlay" onClick={handleToggle} aria-hidden="true" />
      )}
    </>
  );
};

export default FloatingChat;
