import machiDays from "../../../assets/images/memberEvent/毛孩麻吉日主視覺.png";
// scss載入
import "./memberEvent.scss";

export default function MemberEvent1() {
  return (
    <main className="member-activity-1 my-5 my-lg-6">
      <div className="container">
        <div className="row">
          {/* Hero 區塊 */}
          <section className="section-spacer">
            <div className="hero-banner p-3 p-md-4">
              <img
                src={machiDays}
                alt="毛孩麻吉日-活動主視覺"
                className="hero-img rounded"
              />
            </div>
          </section>

          {/* 活動 slogan */}
          <section className="section-spacer mb-80 text-center auto-show">
            <h1 className="h1 mb-24 text-brown-500">
              Show 出熱血，毛孩們來啦！
            </h1>
            <h4 className="h4 text-primary-500 fw-500 mb-16">
              毛孩麻吉日，不只是一場活動，更是每位飼主與毛孩互相守護的承諾。
            </h4>
            <p className="p1 text-neutral-500 mb-3">
              現場將提供免費健檢與疫苗、實用講座與開心抽獎
              <br className="mb-8 d-none d-md-inline" />
              還有機會加入捐血犬貓行列，成為別人毛孩的守護天使!
            </p>
          </section>
        </div>
      </div>

      <div className="row bg-orange">
        <div className="container d-flex justify-content-center align-items-center">
          <section className="container section-spacer activity-describe">
            <div className="row row-col-md-2 row-cols-lg-4 gx-1 text-center mt-32">
              <div className="col d-flex flex-column align-items-center mb-md-3 fade-up">
                <div className="feature-circle mb-24">
                  <img
                    src="/assets/images/member_activities/event_surprise.png"
                    className="img-hover-bigger"
                    alt="驚喜小禮示意圖"
                  />
                </div>
                <h4 className="feature-title mb-20">報名送驚喜小禮</h4>
                <p className="feature-text">毛孩專屬零食＋小玩具</p>
              </div>

              <div className="col d-flex flex-column align-items-center mb-md-3 fade-up">
                <div className="feature-circle text-center mb-24">
                  <img
                    src="/assets/images/member_activities/event_surprise_1.png"
                    className="img-hover-bigger"
                    alt="打卡抽獎示意圖"
                  />
                </div>
                <h4 className="feature-title mb-20">現場打卡再抽</h4>
                <p className="feature-text">加碼周邊、限量好物</p>
              </div>

              <div className="col d-flex flex-column align-items-center fade-up">
                <div className="feature-circle mb-24">
                  <img
                    src="/assets/images/member_activities/event_surprise_2.png"
                    alt="互動闖關示意圖"
                    className="img-hover-bigger"
                  />
                </div>
                <h4 className="feature-title mb-20">麻吉互動闖關</h4>
                <p className="feature-text">完成任務換福袋券</p>
              </div>

              <div className="col d-flex flex-column align-items-center fade-up">
                <div className="feature-circle mb-24">
                  <img
                    src="/assets/images/member_activities/event_surprise_3.png"
                    className="img-hover-bigger"
                    alt="小卡印製示意圖"
                  />
                </div>
                <h4 className="feature-title mb-20">Mofudays 攤位</h4>
                <p className="feature-text">限定小卡現場印製</p>
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
              <div className="col-12 col-md-10 col-lg-8">
                <ul className="timeline">
                  <li>
                    <strong>09:30</strong> — 報到入場
                  </li>
                  <li>
                    <strong>10:00</strong> — 熱身＆注意事項
                  </li>
                  <li>
                    <strong>10:15</strong> — 毛孩短跑賽（初賽）
                  </li>
                  <li>
                    <strong>11:00</strong> — 麻吉互動闖關
                  </li>
                  <li>
                    <strong>11:30</strong> — 頒獎＆合照
                  </li>
                  <li>
                    <strong>12:00</strong> — 活動結束（自由交流）
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 活動資訊 + CTA */}
          <section className="mb-80">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="cta-wrap position-relative p-4 p-md-5 fade-up">
                  <div className="row g-4 align-items-center">
                    <div className="col-12 col-md">
                      <h3 className="h3 mb-16">活動時間</h3>
                      <p className="mb-8 fw-500 ps-4">
                        <strong className="fw-700">日期</strong>：2025 年 10 月
                        11 日（日）09:30–12:00
                      </p>
                      <p className="fw-500 ps-4">
                        <strong className="fw-700">地點</strong>
                        ：毛孩樂園（新北市板橋區××路×段×號）
                        {/* 可加地圖連結 */}
                        <a
                          href="#"
                          className="link-primary ms-1"
                          onClick={(e) => e.preventDefault()}
                        >
                          看地圖
                        </a>
                      </p>
                    </div>

                    <div className="col-12 col-md-auto text-md-end">
                      <div className="position-relative d-inline-block">
                        <a
                          href="#"
                          className="btn btn-primary btn-lg px-4"
                          onClick={(e) => e.preventDefault()}
                        >
                          立即報名
                        </a>
                        <span className="cta-badge"> 報名倒數中! </span>
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
            <h2 className="h1 mb-28 text-center text-primary-500">常見問題</h2>

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
                        Q1. 活動是否免費？
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
                        本活動全程免費參加，現場提供的健檢、疫苗與講座皆為公益服務，歡迎攜帶毛孩一起共襄盛舉。
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
                        Q2. 毛孩有過敏可以參加嗎？
                      </button>
                    </h2>
                    <div
                      id="a2"
                      className="accordion-collapse collapse"
                      aria-labelledby="q2"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A：可以喔！不過建議您先向現場獸醫師說明毛孩的過敏狀況，我們也會盡量避開可能引發過敏的產品或物品。
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
                        Q3. 免費血液檢查怎麼參加？
                      </button>
                    </h2>
                    <div
                      id="a3"
                      className="accordion-collapse collapse"
                      aria-labelledby="q3"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A：免費血液檢查僅限 10
                        名，採現場報名、先到先登記，請提早到場登記以確保名額。
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-up-1">
                    <h2 className="accordion-header" id="q4">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#a4"
                        aria-controls="a4"
                      >
                        Q4. 有行前注意事項嗎？
                      </button>
                    </h2>
                    <div
                      id="a4"
                      className="accordion-collapse collapse"
                      aria-labelledby="q4"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        參加前請確認疫苗、健康狀況良好；現場請全程牽繩並尊重他人與毛孩距離。
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
