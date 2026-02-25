import { useNavigate } from "react-router-dom";
import UnboxCarousel from "./UnboxCarousel";
import ThemeEventCard from "./ThemeEventCard";

// --- 圖片資源統一管理區 ---
import imgOpenBox from "../../../assets/images/member/member_open_box.png";
import imgWave from "../../../assets/images/member/member_wave.png";
import imgFirework from "../../../assets/images/member/member_firework.png";
import imgSummerExclusive from "../../../assets/images/member/member_summer_exclusive.png";
import imgFeed from "../../../assets/images/member/Illustration-feed.png";
import imgPlay from "../../../assets/images/member/member_play.png";
import imgThemeEvent1 from "../../../assets/images/member/theme_event_1.png";
import imgThemeEvent2 from "../../../assets/images/member/theme_event_2.png";
import imgThemeEvent3 from "../../../assets/images/member/theme_event_3.png";

export default function MemberExclusives() {
  const navigate = useNavigate();
  return (
    <div className="tab-content bg-yellow bg-radius py-40 px-55">
      {/* 會員專屬優惠 - 毛寶貝開箱秀 */}
      <section className="unbox mt-16 mb-132 position-relative">
        <img
          src={imgOpenBox}
          alt="毛寶貝開箱秀活動圖"
          className="position-absolute start-0 img-open-box img-shake"
        />

        <h2 className="h2 text-center unbox-title mb-12">毛寶貝開箱秀</h2>
        <h4 className="h4 text-center text-secondary-500 mb-4">
          秀出你的小可愛!
        </h4>
        <p className="mb-36 text-center text-teritary-500 p2 fw-500">
          拍下寶貝開箱的照片或影片並投稿分享，即有機會獲得會員點數與專屬小禮物哦~
        </p>

        <div className="row row-cols-1 row-cols-md-4 row-cols-sm-1 g-4 mb-24">
          <UnboxCarousel />
        </div>
      </section>

      {/* 會員限定優惠 */}
      <section className="exclusive mb-132">
        <div className="exclusive-content">
          <div className="auto-show">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <img
                src={imgWave}
                alt="小扇子裝飾圖"
                className="img-wave me-16 img-shake img-reveal"
              />

              <div>
                <h2 className="h2 exclusive-title text-center">會員限定優惠</h2>
                <h4 className="h4 text-center text-secondary-500">
                  夏日感謝祭
                </h4>
                <h4 className="h4 text-center text-secondary-500 mb-4">
                  會員專屬優惠活動
                </h4>
              </div>

              <img
                src={imgFirework}
                alt="煙火裝飾圖"
                className="img-firework-1 ml-16 img-shake img-reveal"
              />
            </div>

            <p className="text-center text-teritary-500 fw-500 p2 mb-4">
              每一位支持「毛日和」的你，都是我們最想感謝的存在！
            </p>
          </div>

          <div className="card mb-3 card-hover p-20 auto-show">
            <div className="row g-0">
              <div className="col-md-5 order-2 order-md-1">
                <div className="card-body text-center pt-200 d-flex flex-column justify-content-center align-items-center">
                  <h3 className="h4 card-title mb-4 fw-900">
                    即日起續訂就送限定折扣!
                  </h3>
                  <p className="card-text p3 mb-4 fw-500">
                    還有機會免費獲得「夏季限定沁涼盒」
                    <br />
                    邀請你和毛孩一起享受專屬的療癒時光!
                  </p>

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary rounded-pill btn-keep-subscribe"
                      type="button"
                    >
                      立即續訂
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-7 order-1 order-md-2">
                <div className="img-wrap h-100">
                  <img
                    src={imgSummerExclusive}
                    className="img-fluid rounded-start summer_exclusive"
                    alt="夏日感謝祭活動圖"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主題活動 */}
      <section className="theme-event">
        <div className="auto-show">
          <div className="position-relative">
            <img
              src={imgFeed}
              alt="飼料裝飾圖"
              className="img-feed img-shake img-reveal"
            />
            <h2 className="h2 text-center mb-2 text-primary-500 mb-4 title-lined">
              主題活動
            </h2>
            <h4 className="h4 text-center text-secondary-500 mb-4">
              專屬你與毛孩的特別時光 !
            </h4>
            <img
              src={imgPlay}
              alt="主人與狗狗互動圖"
              className="img-play img-shake img-reveal"
            />
          </div>

          <p className="mb-36 text-center text-teritary-500 p2 fw-500">
            9月~10月的會員專屬毛孩派對開跑啦！一起熱血 Show
            出愛、探索寵物心聲，還有驚喜福袋等你來拿！
          </p>
        </div>

        {/* 主題活動 Card */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <ThemeEventCard
            img={imgThemeEvent1}
            alt="毛​​麻吉​捐血犬活​動圖"
            title="毛​​麻吉​捐血犬活​動來啦!"
            date="活動日期:  9/19 - 20"
            desc="現​場將​提供​獸醫​健檢、​健康​講座、​免​費狂犬​病​疫苗、​抽好禮，​還有​限量​10​組免​費血檢​名​額！​一起​「Show出熱血」，​加入​捐血​犬行列​吧！​"
            onClick={() => navigate("/member-event-1")}
          />

          <ThemeEventCard
            img={imgThemeEvent2}
            alt="寵物溝通師活動圖"
            title="想更了解毛寶貝嗎?"
            date="活動日期:  9/26 - 27"
            desc={`狗勾其實也常使用尾巴、耳朵等等肢體語言，來向我們傳遞各式各樣的訊息!
特別邀請狗兒行為諮詢師 PAPA 老師來分享，快來一起聽懂、看懂牠們到底在想甚麼吧！`}
            onClick={() => navigate("/member-event-2")}
          />

          <ThemeEventCard
            img={imgThemeEvent3}
            alt="福袋交換日活動圖"
            title="會員限定福袋互換日!"
            date="活動日期:  9/26 - 27"
            desc={`這個月，我們將舉辦一次「毛孩福袋互換」，參加者將獲得一份隨機的驚喜福袋！
裡面可能有別人家毛孩最愛的玩具或點心，也許會是你的寶貝的新歡！`}
            footnote="📌本次活動採會員限定登記制，每人限額登記一份。"
            onClick={() => navigate("/member-event-3")}
          />
        </div>
      </section>
    </div>
  );
}
