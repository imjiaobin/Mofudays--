import React from "react";

// --- 圖片引入 ---
import headlineDesktop from "../../../assets/images/index/06_comment_headline_desktop.svg";
import headlineMobile from "../../../assets/images/index/06_comment_headline_mobile.svg";
import avatar01 from "../../../assets/images/index/comment_avatar_01.png";
import avatar02 from "../../../assets/images/index/comment_avatar_02.png";
import avatar03 from "../../../assets/images/index/comment_avatar_03.png";
import avatar04 from "../../../assets/images/index/comment_avatar_04.png";
import avatar05 from "../../../assets/images/index/comment_avatar_05.png";

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
        <div
          id="reviewCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* 第一組輪播內容 (包含 4 張卡片) */}
            <div className="carousel-item active">
              <div className="row justify-content-center">
                {/* 卡片 1 */}
                <div className="col-12 col-md-3">
                  <div className="review-card pt-10 pb-12 text-center">
                    <img
                      src={avatar01}
                      className="rounded-circle mb-2 d-flex mx-auto"
                      width="60"
                      height="60"
                      alt="Yuki"
                    />
                    <p className="p3">Yuki·Shiba 媽媽</p>
                    <div className="stars text-warning mb-2">★★★★★</div>
                    <p className="p2">一打開毛日和，Shiba 就興奮地</p>
                    <p className="p2">摇尾巴，超愛那個鴨肉條</p>
                  </div>
                </div>

                {/* 卡片 2 (粉色) */}
                <div className="col-12 col-md-3">
                  <div className="review-card-pink pt-10 pb-12 text-center">
                    <img
                      src={avatar02}
                      className="rounded-circle mb-2 d-flex mx-auto"
                      width="60"
                      height="60"
                      alt="豬皮"
                    />
                    <p className="p3">豬皮的老母</p>
                    <div className="stars text-warning mb-2">★★★★★</div>
                    <p className="p2">每月開箱變成例行節目，現在豬</p>
                    <p className="p2">皮聽到門鈴聲都自動坐好，等他</p>
                    <p className="p2">自己的快遞</p>
                  </div>
                </div>

                {/* 卡片 3 */}
                <div className="col-12 col-md-3">
                  <div className="review-card pt-10 pb-12 text-center">
                    <img
                      src={avatar03}
                      className="rounded-circle mb-2 d-flex mx-auto"
                      width="60"
                      height="60"
                      alt="阿寶"
                    />
                    <p className="p3">雙寶狗媽</p>
                    <div className="stars text-warning mb-2">★★★★★</div>
                    <p className="p2">上個月開箱零食沒馬上給，結果</p>
                    <p className="p2">阿寶氣到把盒子咬破了，新盒子</p>
                    <p className="p2">還沒到，情緒已炸裂</p>
                  </div>
                </div>

                {/* 卡片 4 (粉色) */}
                <div className="col-12 col-md-3">
                  <div className="review-card-pink pt-10 pb-12 text-center">
                    <img
                      src={avatar04}
                      className="rounded-circle mb-2 d-flex mx-auto"
                      width="60"
                      height="60"
                      alt="賓三"
                    />
                    <p className="p3">賓三姊妹的奴才長官</p>
                    <div className="stars text-warning mb-2">★★★★★</div>
                    <p className="p2">最怕三隻同時挑嘴，結果這次三</p>
                    <p className="p2">隻都搶同一條零食！這選品太會</p>
                    <p className="p2">了吧</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 第二組輪播內容 (剩餘卡片) */}
            <div className="carousel-item">
              <div className="row justify-content-center">
                {/* 卡片 5 */}
                <div className="col-12 col-md-3">
                  <div className="review-card pt-10 pb-12 text-center">
                    <img
                      src={avatar05}
                      className="rounded-circle mb-2 d-flex mx-auto"
                      width="60"
                      height="60"
                      alt="Momo"
                    />
                    <p className="p3">Momo 監工中</p>
                    <div className="stars text-warning mb-2">★★★★★</div>
                    <p className="p2">每次開箱都像搶銀行，我才剛拆</p>
                    <p className="p2">一半，Momo 就已經開吃了...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 輪播控制鈕 (選配，若 HTML 原本有請保留) */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarouselSection;
