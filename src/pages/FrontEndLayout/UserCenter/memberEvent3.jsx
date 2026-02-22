// scss載入
import "./memberEvent.scss";
import luckyBagBanner from "../../../assets/images/member/theme_event_3.png";
import step1 from "../../../assets/images/memberEvent/step_item_1.png";
import step2 from "../../../assets/images/memberEvent/step_item_2.png";
import step3 from "../../../assets/images/memberEvent/step_item_3.png";
import step4 from "../../../assets/images/memberEvent/step_item_4.png";

export default function MemberEvent3() {
  return (
    <main className="member-activity-1 my-5 my-lg-6">
      <div className="container">
        <div className="row">
          {/* Hero 區塊 */}
          <section className="section-spacer">
            <div className="hero-banner-2 p-3 p-md-4">
              <img
                src={luckyBagBanner}
                alt="毛孩福袋交換日-活動主視覺"
                className="hero-img rounded"
              />
            </div>
          </section>
        </div>
      </div>

      {/* 黃底 slogan 區 */}
      <div className="row bg-yellow">
        <div className="container">
          <section className="section-spacer my-40 text-center auto-show-1">
            <h1 className="h1 mb-24 text-brown-500">
              用一份驚喜，交換毛孩的快樂！
            </h1>
            <h3 className="h3 fw-500 mb-20 text-primary-500">
              每年毛日和都會舉辦一次「毛孩福袋互換」活動，參加者將獲得一份隨機搭配的驚喜福袋！
            </h3>
            <p className="p1 text-brown-300 mb-3">
              裡面可能有別人家毛孩最愛的玩具或點心，也許會是你的寶貝的新歡！
            </p>
          </section>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* 參與流程 */}
          <section className="section-spacer bottom-lined">
            <h2 className="step-section-title mb-40 text-center auto-show-1">
              參與流程
            </h2>

            <div className="row row-cols-2 row-cols-md-4 g-4">
              <div className="col d-flex flex-column">
                <div className="fade-up-1">
                  <img
                    src={step1}
                    className="feature-circle mb-20 mx-auto img-hover-bigger"
                    alt="步驟1-登記參加"
                  />
                </div>
                <div className="auto-show-1">
                  <h4 className="step-title text-center">1 登記參加</h4>
                  <p className="step-text text-center">填寫報名表單登記參與</p>
                </div>
              </div>

              <div className="col d-flex flex-column">
                <div className="fade-up-1">
                  <img
                    src={step2}
                    className="feature-circle mb-20 mx-auto img-hover-bigger"
                    alt="步驟2-系統配對"
                  />
                </div>
                <div className="auto-show-1">
                  <h4 className="step-title text-center">2 系統配對</h4>
                  <p className="step-text text-center">
                    系統會根據您的毛孩資料
                    <br className="d-md-none" />
                    分配福袋
                  </p>
                </div>
              </div>

              <div className="col d-flex flex-column">
                <div className="fade-up-1">
                  <img
                    src={step3}
                    className="feature-circle mb-20 mx-auto img-hover-bigger"
                    alt="步驟3-寄出福袋"
                  />
                </div>
                <div className="auto-show-1">
                  <h4 className="step-title text-center">3 寄出福袋</h4>
                  <p className="step-text text-center">
                    寄送交換福袋，
                    <br className="d-lg-none" />
                    包含匿名祝福小卡!
                  </p>
                </div>
              </div>

              <div className="col d-flex flex-column">
                <div className="fade-up-1">
                  <img
                    src={step4}
                    className="feature-circle mb-20 mx-auto img-hover-bigger"
                    alt="步驟4-收到驚喜"
                  />
                </div>
                <div className="auto-show-1">
                  <h4 className="step-title text-center">4 收到驚喜</h4>
                  <p className="step-text text-center">
                    收到禮包，
                    <br className="d-lg-none" />
                    歡迎分享開箱!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 注意事項 + CTA */}
          <section className="mb-80">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="mt-20 position-relative p-4 p-md-5">
                  <div className="row g-4 align-items-center auto-show-1">
                    <div className="cta-wrap-3 col-12 col-md">
                      <h3 className="h3 mb-16">【注意事項】</h3>
                      <ul>
                        <li className="mb-8">本活動僅限毛日和會員登記</li>
                        <li className="mb-8">每人限額登記 1 份福袋</li>
                        <li className="mb-8">
                          內容物經篩選，不含過期或危險物品
                        </li>
                        <li className="mb-8">寄送前會再次檢查包裝安全。</li>
                        <li className="mb-8">
                          主辦單位保留活動大綱異動之權利，更新資訊以活動網站內容為主。
                        </li>
                      </ul>
                    </div>

                    <div className="col-12 col-md-auto text-md-end">
                      <div className="position-relative d-inline-block">
                        <a
                          href="#"
                          className="btn btn-primary btn-lg px-4"
                          onClick={(e) => e.preventDefault()}
                        >
                          立即登記參加
                        </a>
                        <span className="cta-badge"> 來抽驚喜! </span>
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
                        Q1. 我的毛孩有過敏，可以註明嗎？
                      </button>
                    </h2>

                    <div
                      id="a1"
                      className="accordion-collapse collapse"
                      aria-labelledby="q1"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A: 可以！您的毛孩資料(包含敏感源)
                        以記錄於系統會員資料中!
                        如果您還有其他想補充的資訊都可以在登記表單中的備註欄為告訴我們，我們會盡量為您配對適合的福袋哦!
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
                        Q2. 如果收到的福袋不適合我的毛孩，怎麼辦？
                      </button>
                    </h2>

                    <div
                      id="a2"
                      className="accordion-collapse collapse"
                      aria-labelledby="q2"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A：您可以將內容轉贈給其他飼主或參加下次互換活動，也可聯繫我們提供回饋意見，幫助下次優化。
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
                        Q3. 可以知道是誰寄給我的嗎？
                      </button>
                    </h2>

                    <div
                      id="a3"
                      className="accordion-collapse collapse"
                      aria-labelledby="q3"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        A：不會喔！為了保留神秘感，寄件人資料將以主辦方資訊呈現，但您會收到對方的小卡祝福。
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
