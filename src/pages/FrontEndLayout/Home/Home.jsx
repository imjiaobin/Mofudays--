import { useState } from "react";
import "./Home.scss";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServiceSection from "./components/ServiceSection";
import ProcessSection from "./components/ProcessSection";
import ReviewCarouselSection from "./components/ReviewCarouselSection";
import FloatingChat from "./components/FloatingChat";
import Announcement from "../../../app/layouts/components/Announcement/Announcement";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <Announcement />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <ProcessSection />
      <ReviewCarouselSection />
      <FloatingChat
        isOpen={isChatOpen}
        toggleChat={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}

export default Home;
