import "./PetInfo.scss";

import ProgressBar1 from "../Subscribe/ProgressBar1";

import healthImg1 from "../../assets/images/subscribe/image_btn_02.png";
import healthImg2 from "../../assets/images/subscribe/image_btn_02.png";
import healthImg3 from "../../assets/images/subscribe/image_btn_03.png";
import playImg1 from "../../assets/images/subscribe/image_btn_04.png";
import playImg2 from "../../assets/images/subscribe/image_btn_05.png";
import playImg3 from "../../assets/images/subscribe/image_btn_06.png";
import dogIllustration from "../../assets/images/subscribe/Illustration-dog.png";
import feedIllustration from "../../assets/images/subscribe/Illustration-feed.png";

function PetInfo() {
  return (
    <>
      <main className="pet-info py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar1 />

          {/* 毛孩資料卡片 */}
          <div className="card-bg py-9 px-12-sm mb-6 mb-0-sm">
            <div className="row justify-content-center">
              {/* 標題 */}
              <div className="col-10">
                <h4 className="fw-bold text-primary-500 text-center-sm mb-40">
                  幫助我們先認識你的毛孩～
                </h4>
              </div>
              {/* 左邊欄位 */}
              <div className="col-4 col-12-sm pe-5 pe-12-sm">
                <div className="px-16-sm">
                  {/* 毛孩名稱 */}
                  <div className="pet-name mb-7 mb-24-sm">
                    <label
                      htmlFor="pet-name"
                      className="form-label d-flex align-items-center mb-4"
                    >
                      <p className="icon-dog fs-24 fs-20-sm fs-20-sm me-3"></p>
                      <p className="item-title fw-bold">毛孩的名字是？</p>
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="pet-name"
                      placeholder="輸入毛孩的名字 / 暱稱"
                    />
                  </div>

                  {/* 毛孩性別 */}
                  <div className="pet-gender mb-7 mb-24-sm">
                    <div className="d-flex align-items-center mb-4">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold">
                        毛孩是什麼性別？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <div
                      className="btn-group w-100"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="pet-gender"
                        id="male"
                        autoComplete="off"
                      />
                      <label className="btn btn-diet py-3 px-5" htmlFor="male">
                        男生
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="pet-gender"
                        id="female"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-diet py-3 px-5"
                        htmlFor="female"
                      >
                        女生
                      </label>
                    </div>
                  </div>

                  {/* 毛孩歲數 */}
                  <div className="pet-year mb-7 mb-24-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        毛孩幾歲了？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      我們將會根據年紀，準備適合的零食與小物
                    </p>
                    <div className="dropdown">
                      <button
                        className="form-select text-start border py-3 px-5"
                        type="button"
                        id="pet-year"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        選擇年齡
                      </button>
                      <ul
                        className="dropdown-menu w-100"
                        aria-labelledby="pet-year"
                      >
                        <li className="dropdown-item">
                          幼犬 ( 出生 ～ 1 歲左右 )
                        </li>
                        <li className="dropdown-item">1 ～ 3 歲</li>
                        <li className="dropdown-item">4 ～ 6 歲</li>
                        <li className="dropdown-item">7 歲以上</li>
                      </ul>
                    </div>
                  </div>

                  {/* 毛孩體型 */}
                  <div className="pet-size mb-7 mb-24-sm">
                    <div className="d-flex align-items-center mb-2">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold">
                        牠是什麼體型的狗狗？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      我們將會參考體型，準備適合的用品
                    </p>

                    <div className="dropdown">
                      <button
                        className="form-select text-start border py-3 px-5"
                        type="button"
                        id="pet-size"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        選擇體型
                      </button>
                      <ul
                        className="dropdown-menu w-100"
                        aria-labelledby="pet-size"
                      >
                        <li className="dropdown-item">
                          小型犬（ ex. 博美、貴賓、吉娃娃 ）
                        </li>
                        <li className="dropdown-item">
                          中型犬（ ex. 柴犬、邊境牧羊犬、鬆獅 ）
                        </li>
                        <li className="dropdown-item">
                          大型犬（ ex. 黃金獵犬、哈士奇、拉布拉多 ）
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右邊欄位 */}
              <div className="col-6 col-12-sm">
                <div className="px-16-sm">
                  {/* 過敏食材 */}
                  <div className="pet-diet mb-7 mb-24-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        毛孩有什麼過敏或忌口的食材？( 可複選 )
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      有沒有讓毛孩一吃就搔癢、過敏的食物呢？請讓我們幫你避開～
                    </p>

                    {/* 食材按鈕 */}
                    <div className="diet d-flex flex-wrap gap-3 gap-8-sm">
                      {/* 雞肉 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="drumstick"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="drumstick"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>雞肉</p>
                            <p className="icon-drumstick"></p>
                          </div>
                        </label>
                      </div>

                      {/* 牛肉 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="beef"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="beef"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>牛肉</p>
                            <p className="icon-beef"></p>
                          </div>
                        </label>
                      </div>

                      {/* 豬肉 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="ham"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="ham"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>豬肉</p>
                            <p className="icon-ham"></p>
                          </div>
                        </label>
                      </div>

                      {/* 羊肉 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="sheep"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="sheep"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>羊肉</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M6 11V16C6 19.3137 8.68629 22 12 22V22C15.3137 22 18 19.3137 18 16V11"
                                stroke="#A3A3A3"
                                strokeWidth="2"
                              />
                              <path
                                d="M6 12L4 12C2.89543 12 2 12.8954 2 14V14C2 15.1046 2.89543 16 4 16L6 16"
                                stroke="#A3A3A3"
                                strokeWidth="2"
                              />
                              <path
                                d="M18 12L20 12C21.1046 12 22 12.8954 22 14V14C22 15.1046 21.1046 16 20 16L18 16"
                                stroke="#A3A3A3"
                                strokeWidth="2"
                              />
                              <path
                                d="M12 22V19"
                                stroke="#A3A3A3"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10 17L12 18.5L14 17"
                                stroke="#A3A3A3"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M12 2L12 1L12 1L12 2ZM16.5293 5.21191L15.5856 5.54277L15.8416 6.27303L16.6128 6.20842L16.5293 5.21191ZM16.7998 5.2002L16.7998 4.2002L16.7997 4.2002L16.7998 5.2002ZM20 8.40039L21 8.40051V8.40039H20ZM16.7998 11.5996L16.7997 12.5996H16.7998V11.5996ZM14.6729 10.7861L15.3385 10.0399L14.7594 9.52325L14.1152 9.95608L14.6729 10.7861ZM12 11.5996L12 12.5996H12V11.5996ZM9.32617 10.7861L9.88399 9.95617L9.23988 9.52326L8.66064 10.0398L9.32617 10.7861ZM7.2002 11.5996L7.2002 12.5996L7.20026 12.5996L7.2002 11.5996ZM4 8.40039L3 8.40039L3 8.40051L4 8.40039ZM7.2002 5.2002L7.20026 4.2002H7.2002V5.2002ZM7.46973 5.21191L7.38654 6.20845L8.15751 6.27281L8.41343 5.54271L7.46973 5.21191ZM12 2V3C13.6558 3 15.0659 4.0603 15.5856 5.54277L16.5293 5.21191L17.473 4.88105C16.6813 2.62305 14.5326 1 12 1V2ZM16.5293 5.21191L16.6128 6.20842C16.6775 6.203 16.7397 6.2002 16.7999 6.2002L16.7998 5.2002L16.7997 4.2002C16.6777 4.2002 16.5595 4.20588 16.4458 4.21541L16.5293 5.21191ZM16.7998 5.2002V6.2002C18.0148 6.2002 19 7.18536 19 8.40039H20H21C21 6.08079 19.1194 4.2002 16.7998 4.2002V5.2002ZM20 8.40039L19 8.40027C18.9999 9.61493 18.015 10.5996 16.7998 10.5996V11.5996V12.5996C19.119 12.5996 20.9997 10.7201 21 8.40051L20 8.40039ZM16.7998 11.5996L16.7999 10.5996C16.2397 10.5996 15.7301 10.3892 15.3385 10.0399L14.6729 10.7861L14.0072 11.5324C14.7469 12.1923 15.7247 12.5995 16.7997 12.5996L16.7998 11.5996ZM14.6729 10.7861L14.1152 9.95608C13.5103 10.3624 12.7844 10.5996 12 10.5996V11.5996V12.5996C13.195 12.5996 14.3072 12.2365 15.2305 11.6162L14.6729 10.7861ZM12 11.5996L12 10.5996C11.215 10.5996 10.4886 10.3625 9.88399 9.95617L9.32617 10.7861L8.76835 11.6161C9.69216 12.237 10.805 12.5996 12 12.5996L12 11.5996ZM9.32617 10.7861L8.66064 10.0398C8.26875 10.3892 7.75959 10.5996 7.20014 10.5996L7.2002 11.5996L7.20026 12.5996C8.2755 12.5995 9.25248 12.1917 9.9917 11.5325L9.32617 10.7861ZM7.2002 11.5996V10.5996C5.98502 10.5996 5.00015 9.61493 5 8.40027L4 8.40039L3 8.40051C3.00028 10.7201 4.88101 12.5996 7.2002 12.5996V11.5996ZM4 8.40039H5C5 7.18536 5.98517 6.2002 7.2002 6.2002V5.2002V4.2002C4.8806 4.2002 3 6.08079 3 8.40039H4ZM7.2002 5.2002L7.20014 6.2002C7.25951 6.2002 7.32138 6.20301 7.38654 6.20845L7.46973 5.21191L7.55291 4.21538C7.44031 4.20598 7.32248 4.2002 7.20026 4.2002L7.2002 5.2002ZM7.46973 5.21191L8.41343 5.54271C8.93302 4.06041 10.3438 3 12 3L12 2L12 1C9.46756 1 7.3177 2.62261 6.52602 4.88112L7.46973 5.21191Z"
                                fill="#A3A3A3"
                              />
                            </svg>
                          </div>
                        </label>
                      </div>

                      {/* 魚 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="fish"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="fish"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>魚</p>
                            <p className="icon-fish"></p>
                          </div>
                        </label>
                      </div>

                      {/* 穀類 ( 小麥/玉米 ) */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="wheat"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="wheat"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>穀類 ( 小麥/玉米 )</p>
                            <p className="icon-wheat"></p>
                          </div>
                        </label>
                      </div>

                      {/* 乳製品 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="milk"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="milk"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>乳製品</p>
                            <p className="icon-milk"></p>
                          </div>
                        </label>
                      </div>

                      {/* 蛋 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="egg"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="egg"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>蛋</p>
                            <p className="icon-egg"></p>
                          </div>
                        </label>
                      </div>

                      {/* 無 */}
                      <div
                        className="btn-group w-100-sm"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="pet-diet"
                          id="x"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet py-3 px-5"
                          htmlFor="x"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <p>無</p>
                            <p className="icon-x"></p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 保健需求 */}
                  <div className="pet-health mb-7 mb-24-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        想替毛孩加強什麼保健需求？
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      最近毛孩有沒有哪個部分想特別照顧的呢？我們會貼心幫你挑選對應的營養品
                    </p>

                    <div className="d-grid d-block-sm gap-5 card-grid">
                      <div className="card border-0 mb-8-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="health"
                          id="joint"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
                          htmlFor="joint"
                        >
                          <img
                            src={healthImg1}
                            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
                            alt="關節保健"
                          />
                          <div className="card-body p-0">
                            <p className="text-start-sm">關節保健</p>
                          </div>
                        </label>
                      </div>

                      <div className="card border-0 mb-8-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="health"
                          id="digestion"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
                          htmlFor="digestion"
                        >
                          <img
                            src={healthImg2}
                            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
                            alt="消化幫助"
                          />
                          <div className="card-body p-0">
                            <p className="text-start-sm">消化幫助</p>
                          </div>
                        </label>
                      </div>

                      <div className="card border-0 mb-8-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="health"
                          id="skin"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
                          htmlFor="skin"
                        >
                          <img
                            src={healthImg3}
                            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
                            alt="美毛/皮膚問題"
                          />
                          <div className="card-body p-0">
                            <p className="text-start-sm">美毛/皮膚問題</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 互動方式 */}
                  <div className="pet-play mb-7 mb-48-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        毛孩平常最喜歡哪種互動方式？
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      你平常都怎麼與毛孩互動的呢？讓我們更了解牠的個性與喜好！
                    </p>

                    <div className="d-grid d-block-sm gap-5 card-grid">
                      <div className="card border-0 mb-8-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="play"
                          id="brainpower"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
                          htmlFor="brainpower"
                        >
                          <img
                            src={playImg1}
                            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
                            alt="喜歡腦力激盪"
                          />
                          <div className="card-body p-0">
                            <p className="text-start-sm">喜歡腦力激盪</p>
                          </div>
                        </label>
                      </div>

                      <div className="card border-0 mb-8-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="play"
                          id="bite"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
                          htmlFor="bite"
                        >
                          <img
                            src={playImg2}
                            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
                            alt="愛玩愛咬"
                          />
                          <div className="card-body p-0">
                            <p className="text-start-sm">愛玩愛咬</p>
                          </div>
                        </label>
                      </div>

                      <div className="card border-0 mb-8-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="play"
                          id="walk"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
                          htmlFor="walk"
                        >
                          <img
                            src={playImg3}
                            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
                            alt="愛出門走走"
                          />
                          <div className="card-body p-0">
                            <p className="text-start-sm">愛出門走走</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 定位圖 */}
            <img
              src={dogIllustration}
              alt="狗狗插畫"
              className="dog-illustration d-none-sm"
            />
            <img
              src={feedIllustration}
              alt="飼料插畫"
              className="feed-illustration d-none-sm"
            />

            {/* 儲存按鈕 */}
            <div className="text-center d-none-min-sm">
              <a
                className="btn btn-primary rounded-pill btn-subscribe fs-18-sm px-100 w-100-sm"
                href="./plan.html"
                role="button"
              >
                儲存並繼續
              </a>
            </div>
          </div>

          {/* 儲存按鈕 */}
          <div className="text-center d-none-sm">
            <a
              className="btn btn-primary rounded-pill btn-subscribe fs-18-sm px-100 w-100-sm"
              href="./plan.html"
              role="button"
            >
              儲存並繼續
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default PetInfo;
