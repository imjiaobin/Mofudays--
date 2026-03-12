import { useState, useEffect } from "react";
import "./Home.scss";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import ProcessSection from "./components/ProcessSection";
import ReviewCarouselSection from "./components/ReviewCarouselSection";
import FloatingChat from "./components/FloatingChat";
import NewsModal from "./components/NewsModal";
import Announcement from "../../../app/layouts/components/Announcement/Announcement";

function Home() {
  console.log("Build Mode API:", import.meta.env.VITE_API_BASE);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); //FloatingChat 預設關閉

  // 最新消息彈窗：首頁加載時打開
  useEffect(() => {
    // 模擬稍微延遲後開啟，增加使用者體驗
    const timer = setTimeout(() => {
      setIsNewsModalOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="app-wrapper">
      <Announcement />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <ProcessSection />
      <ReviewCarouselSection />

      {/* 浮動元件與彈窗 */}
      {/* Modal 顯示開關 */}
      {isNewsModalOpen && (
        <NewsModal onClose={() => setIsNewsModalOpen(false)} />
      )}

      {/* FloatingChat 元件 */}
      <FloatingChat
        isOpen={isChatOpen}
        toggleChat={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}

export default Home;
