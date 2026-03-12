import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// --- 圖片引入 ---
import headlineDesktop from "../../../../assets/images/index/06_comment_headline_desktop.svg";
import headlineMobile from "../../../../assets/images/index/06_comment_headline_mobile.svg";
import avatar01 from "../../../../assets/images/index/comment_avatar_01.png";
import avatar02 from "../../../../assets/images/index/comment_avatar_02.png";
import avatar03 from "../../../../assets/images/index/comment_avatar_03.png";
import avatar04 from "../../../../assets/images/index/comment_avatar_04.png";
import avatar05 from "../../../../assets/images/index/comment_avatar_05.png";
import avatar06 from "../../../../assets/images/index/comment_avatar_01.png";

const reviews = [
  {
    avatar: avatar01,
    alt: "Yuki",
    name: "Yuki·Shiba 媽媽",
    text: "一打開毛日和，Shiba 就興奮地搖尾巴，超愛那個鴨肉條，每次都被牠搶先吃完。",
    pink: false,
  },
  {
    avatar: avatar02,
    alt: "豬皮",
    name: "豬皮的老母",
    text: "每月開箱變成例行節目，現在豬皮聽到門鈴聲都自動坐好，等他自己的快遞。",
    pink: true,
  },
  {
    avatar: avatar03,
    alt: "阿寶",
    name: "雙寶狗媽",
    text: "上個月開箱零食沒馬上給，結果阿寶氣到把盒子咬破了，新盒子還沒到情緒已炸裂。",
    pink: false,
  },
  {
    avatar: avatar04,
    alt: "賓三",
    name: "賓三姊妹的奴才長官",
    text: "最怕三隻同時挑嘴，結果這次三隻都搶同一條零食，這選品也太會了吧。",
    pink: true,
  },
  {
    avatar: avatar05,
    alt: "Momo",
    name: "Momo 監工中",
    text: "每次開箱都像搶銀行，我才剛拆一半，Momo 就已經開吃了，完全不給我反應。",
    pink: false,
  },
  {
    avatar: avatar06,
    alt: "Yuki姊",
    name: "Yuki 的雙胞胎姊姊",
    text: "妹妹一直跟我推薦，終於訂了，結果我家柴也瘋狂搖尾巴，基因果然一樣。",
    pink: true,
  },
];

const ReviewCarouselSection = () => {
  return (
    <section className="comment py-9 py-md-11">
      {/* 標題區 */}
      <div className="container">
        <img
          src={headlineDesktop}
          alt="comment_headline"
          className="mb-6 d-none d-md-block mx-auto img-fluid"
        />
        <img
          src={headlineMobile}
          alt="comment_headline_mobile"
          className="mb-6 d-block d-md-none mx-auto img-fluid"
        />
      </div>

      <div className="container-fluid">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            768: { slidesPerView: 4 },
          }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div
                className={`${r.pink ? "review-card-pink" : "review-card"} pt-10 pb-12 text-center`}
              >
                <img
                  src={r.avatar}
                  className="rounded-circle mb-2 d-flex mx-auto"
                  width="60"
                  height="60"
                  alt={r.alt}
                />
                <p className="p3">{r.name}</p>
                <div className="stars text-warning mb-2">★★★★★</div>
                <p className="p2">{r.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewCarouselSection;
