// scss載入
import "./memberEvent.scss";
import commBanner from "../../../assets/images/memberEvent/毛孩溝通教室主視覺.png";
import speakerAvatar from "../../../assets/images/memberEvent/pet_communicator.png";

export default function MemberEvent2() {
  return (
    <main className="member-activity-1 my-5 my-lg-6">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          {/* Hero 區塊 */}
          <section className="section-spacer">
            <div className="hero-banner-1 p-3 p-md-4">
              <div className="hero-media">
                <img
                  src={commBanner}
                  alt="毛孩溝通教室-活動主視覺"
                  className="hero-img"
                />
              </div>
            </div>
          </section>

          {/* 活動 slogan */}
          <section className="section-spacer mb-80 text-center auto-show">
            <h1 className="h1 mb-24 text-brown-500">
              傾聽牠的心聲，理解毛孩的世界
            </h1>

            <h4 className="h4 text-primary-500 fw-500 mb-8">
              想知道毛孩為什麼突然不吃飯？為什麼牠害怕某種聲音？
            </h4>

            <h4 className="h4 text-primary-500 fw-500 mb-16">
              也許你曾經試過動物溝通，卻沒有看到效果，覺得只是“花錢繳學費”。
            </h4>

            <p className="p1 text-neutral-500 mb-1">
              那麼，這次的課程你絕對不能錯過！
            </p>

            <p className="p1 text-neutral-500 mb-3">
              我們邀請了資深的狗兒行為諮詢師 - PAPA (楊森僅) 老師。
              <br className="mb-8 d-none d-md-inline" />
              帶您瞭解如何讓你與毛孩的關係更加和諧。
            </p>
          </section>
        </div>
      </div>

      {/* 講師介紹（橘底區） */}
      <div className="bg-orange-1">
        <div className="container">
          <section className="row section-spacer">
            <div className="speaker-card bg-orange-1">
              <div className="row g-4 align-items-center auto-show-1">
                <div className="col-md-5 text-center">
                  <img
                    src={speakerAvatar}
                    alt="講師頭像"
                    className="speaker-avatar"
                  />
                </div>

                <div className="col-md">
                  <h2 className="h2 mb-12">講師介紹</h2>
                  <h3 className="h3 mb-20">PAYA 佩芽（寵物溝通師）</h3>

                  <ul className="p2 mb-16">
                    <li>10+ 年實務經驗，擅長犬貓情緒溝通</li>
                    <li>合作：多家動物醫院／收容所志工訓練</li>
                    <li>著作：〈理解牠的語言〉專欄作者</li>
                  </ul>

                  <p className="p1">
                    課程包含：基礎概念、日常觀察、建立安全感、常見行為問題拆解。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* 活動流程 */}
          <section className="section-spacer auto-show">
            <h2 className="h2 mb-16 text-center text-brown-500">活動流程</h2>
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-8">
                <ul className="timeline">
                  <li>
                    <strong>13:00–13:20</strong> 報到入場
                  </li>
                  <li>
                    <strong>13:20–14:10</strong>{" "}
                    課程一：理解毛孩的「情緒與訊號」
                  </li>
                  <li>
                    <strong>14:15–15:00</strong>{" "}
                    課程二：日常互動建立安全感（含示範）
                  </li>
                  <li>
                    <strong>15:05–15:45</strong> Q&A 與案例討論
                  </li>
                  <li>
                    <strong>15:45–16:00</strong> 合照與散場
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 活動資訊 + CTA */}
          <section className="mb-80">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="cta-wrap-2 position-relative p-4 p-md-5 fade-up">
                  <div className="row g-4 align-items-center">
                    <div className="col-md">
                      <h3 className="h3 mb-16">活動時間</h3>

                      <p className="mb-8 fw-500 ps-4">
                        <strong className="fw-700">日期</strong>：2025 年 11 月
                        1 日（六）013:30-16:00
                      </p>

                      <p className="mb-8 fw-500 ps-4">
                        <strong className="fw-700">地點</strong>
                        ：IEAT國際會議中心2F（台北市中山區松江路350號2F-咖啡空間）
                        {/* 可加地圖連結 */}
                        <a
                          href="#"
                          className="link-primary ms-1"
                          onClick={(e) => e.preventDefault()}
                        >
                          看地圖
                        </a>
                      </p>

                      <p className="fw-500 ps-4">
                        <strong className="fw-700">報名方式</strong> :
                        免費參與，額滿為止!
                      </p>
                    </div>

                    <div className="col-md-auto text-md-end">
                      <div className="position-relative d-inline-block">
                        <a
                          href="#"
                          className="btn btn-primary btn-lg px-4"
                          onClick={(e) => e.preventDefault()}
                        >
                          立即報名
                        </a>
                        <span className="cta-badge"> 限額 30 人 ! </span>
                      </div>
                      <div className="cta-warning mt-2">
                        名額有限，沒有候補喔!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="section-spacer">
            <h2 className="h1 mb-28 text-center text-primary-500 fade-up">
              常見問題
            </h2>

            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="accordion" id="faqAccordion">
                  <div className="accordion-item fade-up-1">
                    <h2 className="accordion-header" id="q1">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#a1"
                        aria-expanded="false"
                        aria-controls="a1"
                      >
                        Q1. 活動可以攜帶毛孩參加嗎？
                      </button>
                    </h2>

                    <div
                      id="a1"
                      className="accordion-collapse collapse"
                      aria-labelledby="q1"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A:
                        這次的講座以教學與互動示範為主，因此現場不開放毛孩入場，以免毛孩因陌生環境感到緊張或受驚。建議您攜帶毛孩的照片或影片，方便在互動練習中使用。
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-up-1">
                    <h2 className="accordion-header" id="q2">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#a2"
                        aria-controls="a2"
                      >
                        Q2. 需要攜帶什麼物品？
                      </button>
                    </h2>

                    <div
                      id="a2"
                      className="accordion-collapse collapse"
                      aria-labelledby="q2"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Ａ：建議您攜帶毛孩的照片（平時生活照或特殊行為照）、筆記本與筆（方便記錄重點）、任何想討論的毛孩行為案例
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-up-1">
                    <h2 className="accordion-header" id="q3">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#a3"
                        aria-controls="a3"
                      >
                        Q3. 如果臨時無法參加，怎麼辦？
                      </button>
                    </h2>

                    <div
                      id="a3"
                      className="accordion-collapse collapse"
                      aria-labelledby="q3"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A：若您報名後臨時無法參加，請於活動前3天通知我們，可選擇全額退費或將名額轉讓給親友。因為活動為免費講座，請務必告知取消，以便將名額釋出給其他有需要的毛爸媽們，謝謝。
                      </div>
                    </div>
                  </div>
                </div>
                {/* /accordion */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
