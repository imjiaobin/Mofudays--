import "./Plan.scss";
import ProgressBar1 from "../Subscribe/ProgressBar1.jsx";
import PlanCard from "../Subscribe/PlanCard.jsx";

import planImg from "../../assets/images/subscribe/plan-img.png";

const ActiveButtonPhone = () => {
  return (
    <div className="text-center d-none-min-sm px-5-5-sm">
      <div className="row">
        <div className="col-6-sm">
          <a
            className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
            href="./pet-info.html"
            role="button"
          >
            回上一頁
          </a>
        </div>
        <div className="col-6-sm">
          <a
            className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
            href="./checkout.html"
            role="button"
          >
            儲存並繼續
          </a>
        </div>
      </div>
    </div>
  );
};
const ActiveButtonWeb = () => {
  return (
    <div className="text-center d-none-sm">
      <a
        className="btn btn-primary rounded-pill btn-active-white fs-18-sm fw-medium-sm ls-10-sm px-40 me-6 me-24-sm"
        href="./pet-info.html"
        role="button"
      >
        回上一頁
      </a>
      <a
        className="btn btn-primary rounded-pill btn-active fs-18-sm fw-medium-sm ls-10-sm px-40"
        href="./checkout.html"
        role="button"
      >
        儲存並繼續
      </a>
    </div>
  );
};

function Plan() {
  return (
    <>
      <main className="plan py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar1 />

          {/* 推薦方案 */}
          <div className="card-bg py-9 px-12-sm mb-6 mb-0-sm">
            <div className="row justify-content-center">
              {/* 標題 */}
              <div className="col-10">
                <h4 className="fw-bold text-primary-500 text-center-sm mb-40">
                  選擇方案
                </h4>
              </div>

              <div className="col-10 d-flex gap-5">
                {/* 左邊欄位 */}
                <div className="plan-title justify-content-center px-26">
                  <img src={planImg} alt="推薦方案" className="mb-32" />
                  <div>
                    <h5 className="mb-4 ls-5 text-center-sm">
                      給毛孩的三種驚喜提案
                    </h5>
                    <p className="text-brown-300">
                      為了讓你能更輕鬆找到最適合毛孩的盒子，
                      <br />
                      我們依照內容物、用途與毛孩特性整理出三種不同的訂閱組合。
                      <br />
                      無論你是新手爸媽，或是想給毛孩更多陪伴，我們都準備了合適的選擇。
                    </p>
                  </div>
                </div>

                {/* 右邊欄位 */}
                <div className="plan-item">
                  {/* 方案一 */}
                  <PlanCard
                    id="plan1"
                    title="新手爸媽安心組"
                    price="699"
                    text="給第一次養毛孩的你，一份剛剛好的照顧"
                  ></PlanCard>
                  {/* 方案二 */}
                  <PlanCard
                    id="plan2"
                    title="活力成長探索組"
                    price="899"
                    text="給每天都充滿活力、喜歡探索世界的孩子"
                  ></PlanCard>
                  {/* 方案三 */}
                  <PlanCard
                    id="plan3"
                    title="豪華寵愛禮物組"
                    price="1,299"
                    text="每月為毛孩送上一份滿滿儀式感的大禮"
                  ></PlanCard>
                </div>
              </div>
            </div>

            {/* 儲存按鈕手機版 */}
            <ActiveButtonPhone />
          </div>

          {/* 儲存按鈕網頁版 */}
          <ActiveButtonWeb />
        </div>
      </main>
    </>
  );
}

export default Plan;
