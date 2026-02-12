import { useEffect, useMemo, useRef, useState } from "react";
import { Carousel } from "bootstrap";

/** ✅ 卡片資料改成常數（component 外） */
export const UNBOX_CARDS = [
  {
    name: "豆豆",
    meta: "柴犬 5 歲",
    img: "/assets/images/member/member_shiba.png",
    imgAlt: "豆豆",
    backTitle: "豆豆",
    backText:
      "「豆豆一看到開箱盒就立刻湊上來，眼神超專注，好像在當檢查官！裡面有小零食、玩具，還有專屬牠的寵物小卡，完全是柴隊長認證過的驚喜組合！」",
  },
  {
    name: "Haru",
    meta: "哈士娃 1 歲",
    img: "/assets/images/member/member_chihwahwa.png",
    imgAlt: "Haru",
    frontImgClass: "object-position-right-center",
    pawClass: "object-position-center",
    backTitle: "Haru",
    backText:
      "「Haru 戴上 Angry Bird 毛帽的同時，也開心迎接自己的驚喜盒！一邊賣萌一邊拆，發現裡面有最愛的小零食、玩具，還有一張專屬小卡，整個活動瞬間變成牠的派對秀啦！」",
  },
  {
    name: "可可",
    meta: "貴賓犬 2 歲",
    img: "/assets/images/member/member_poodle.png",
    imgAlt: "可可",
    backTitle: "可可",
    backText:
      "「可可小小的身影蹲在盒子旁，乖巧地等著開箱。當看到裡面有牠愛的小零食、可愛玩具，還有獨一無二的專屬寵物小卡，眼神都閃閃發亮，彷彿在說：『這是專屬於我的幸福禮物呢 💖』」",
  },
  {
    name: "奶昔",
    meta: "邊境牧羊犬 2 歲",
    img: "/assets/images/member/member_shapper.png",
    imgAlt: "奶昔",
    backTitle: "奶昔",
    backText:
      "「奶昔一如既往地衝在最前面，奔跑的樣子就像把整個草原都踩在腳下 🐾！開箱盒一打開，小零食和玩具立刻成了牠的新目標，而那張專屬的小卡更讓人忍不住想珍藏。這份滿滿的能量，就是牠收到禮物時最真實的笑容！」",
  },
  {
    name: "布丁",
    meta: "巴哥犬 2 歲",
    img: "/assets/images/member/member_pug.png",
    imgAlt: "布丁",
    backTitle: "布丁",
    backText:
      "「布丁最愛湊熱鬧，這次看到開箱盒眼睛都亮了 ✨！小零食、玩具一樣都不能少，還有專屬小卡更是讓主人感動。牠滿足的表情彷彿在說：『這是屬於我的驚喜大禮包！』」",
  },
  {
    name: "阿福",
    meta: "米克斯 4 歲",
    img: "/assets/images/member/member_mix.png",
    imgAlt: "阿福",
    backTitle: "阿福",
    backText:
      "「阿福是一看到開箱盒就立刻衝上來的急先鋒 ！小零食和玩具馬上就被牠盯上，專屬寵物小卡讓主人心裡暖呼呼。果然米克斯的快樂能量，連開箱都特別熱鬧！」",
  },
  {
    name: "雪球 & 雪寶",
    meta: "博美 3 歲 / 3歲",
    img: "/assets/images/member/member_bomei.png",
    imgAlt: "雪球&雪寶",
    backTitle: "雪球(右) & 雪寶(左)",
    backText:
      "「開箱的瞬間，奶油和棉花立刻湊上來，兩顆小雪球擠在一起，一起分享這份驚喜。小零食讓牠們搖著小尾巴，玩具變成了搶來搶去的快樂源泉！」",
  },
  {
    name: "皮蛋",
    meta: "米克斯 7 歲",
    img: "/assets/images/member/member_mix_1.jpg",
    imgAlt: "皮蛋",
    backTitle: "皮蛋",
    backText:
      "「皮蛋一臉專注地守在開箱盒旁，好像在等著主人說一聲『可以開動！』小零食讓牠眼睛一亮，玩具馬上就被叼走，而那張專屬寵物小卡更是讓人心裡滿滿感動!」",
  },
];

export default function UnboxCarousel() {
  const carouselRef = useRef(null);
  const bsRef = useRef(null);

  const [groupSize, setGroupSize] = useState(getGroupSize());

  const slides = useMemo(() => {
    const out = [];
    for (let i = 0; i < UNBOX_CARDS.length; i += groupSize) {
      out.push(UNBOX_CARDS.slice(i, i + groupSize));
    }
    return out;
  }, [groupSize]);

  // resize → 更新 groupSize（含 debounce）
  useEffect(() => {
    let t = null;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setGroupSize(getGroupSize()), 60);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // groupSize 改變時 → dispose / 重建 Carousel instance（避免狀態混亂）
  useEffect(() => {
    if (!carouselRef.current) return;

    if (bsRef.current) {
      bsRef.current.dispose();
      bsRef.current = null;
    }

    bsRef.current = Carousel.getOrCreateInstance(carouselRef.current, {
      interval: false,
      ride: false,
      wrap: true,
    });

    return () => {
      if (bsRef.current) {
        bsRef.current.dispose();
        bsRef.current = null;
      }
    };
  }, [groupSize]);

  return (
    <div
      id="petUnboxCarousel"
      ref={carouselRef}
      className="carousel slide w-100"
      data-bs-ride="false"
      data-bs-interval="false"
      data-bs-wrap="true"
    >
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#petUnboxCarousel"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`第 ${idx + 1} 頁`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((group, slideIdx) => (
          <div key={slideIdx} className={`carousel-item ${slideIdx === 0 ? "active" : ""}`}>
            <div className="row g-4">
              {group.map((card) => (
                <UnboxFlipCard key={card.name} card={card} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#petUnboxCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">上一頁</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#petUnboxCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">下一頁</span>
      </button>
    </div>
  );
}

function UnboxFlipCard({ card }) {
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="flip-card h-100">
        <div className="flip-inner">
          <div className="flip-face flip-front">
            <div className="p-1">
              <img src={card.img} className={`card-img-top ${card.frontImgClass ?? ""}`.trim()} alt={card.imgAlt} />
            </div>

            <div className="d-flex justify-content-between p-16">
              <div>
                <h5 className="card-title mb-1">{card.name}</h5>
                <p className="card-text mb-0 p2">{card.meta}</p>
              </div>

              <img
                src="/assets/images/member/footprint_patten 2.png"
                alt="小腳印"
                className={`img-single-paw ${card.pawClass ?? ""}`.trim()}
              />
            </div>
          </div>

          <div className="flip-face flip-back d-flex flex-column justify-content-center align-items-center text-center p-16">
            <h6 className="card-title-back mb-4 fw-700">{card.backTitle}</h6>
            <p className="card-text-back mb-0 p3">{card.backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getGroupSize() {
  const w = window.innerWidth;
  if (w <= 576) return 1;
  if (w < 768) return 2;
  return 4;
}