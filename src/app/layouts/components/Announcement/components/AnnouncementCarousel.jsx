import React from "react";

const AnnouncementCarousel = ({ items }) => {
  return (
    <div
      id="announcementCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        {items.map((text, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <p className="mb-0 text-center">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementCarousel;
