import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const AnnouncementCarousel = ({ items }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      allowTouchMove={false}
    >
      {items.map((text, index) => (
        <SwiperSlide key={index}>
          <p className="mb-0 text-center">{text}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AnnouncementCarousel;
