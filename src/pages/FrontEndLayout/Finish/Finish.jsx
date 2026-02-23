import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getOrderById } from "../../../api/planApi";

import "./Finish.scss";
import ProgressBar2 from "../Subscribe/ProgressBar2";
import FinishOrder from "./FinishOrder";

import finishIllustration from "../../../assets/images/subscribe/Illustration-finish.png";
import balloonIllustration from "../../../assets/images/subscribe/Illustration-balloon.png";

function Finish() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId).then(setOrder).catch(console.error);
    }
  }, [orderId]);

  const grandTotal = order?.orderTotalAmount ?? 0;

  return (
    <>
      <main className="finish py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 title="訂閱成功！" subtitle="謝謝你成為毛日和的夥伴" />

          {/* 訂單內容卡片 */}
          <div className="card-bg py-9 px-110 px-12-sm mb-6 mb-0-sm">
            <div className="px-16-sm">
              {/* 感謝訂閱文字 */}
              <div className="fs-14-sm text-center-sm px-12-sm mb-6 mb-24-sm">
                <p className="text-brown-300 mb-1">
                  親愛的客戶您好，您的訂單我們已經收到，感謝您訂閱毛日盒!
                </p>
                <p className="text-brown-300">
                  以下為您的訂購明細，記得拍下毛孩開箱照片與大家分享唷🥳
                </p>
              </div>

              {/* 訂單明細 */}
              <div className="row-table mb-6 mb-24-sm">
                {/* 表格 */}
                <div className="col-table-10">
                  <h5 className="mb-5 ls-5 text-center-sm">訂單明細</h5>

                  {/* 表格標題 */}
                  <div className="table-title-bg fs-14-sm d-flex py-2 px-4-sm mb-2">
                    {/* 網頁版 */}
                    <p className="col-table-1-5 text-center d-none-sm">
                      訂閱期數
                    </p>
                    {/* 手機版 */}
                    <p className="col-table-1-5 text-center p-nowrap d-none-min-sm">
                      期數
                    </p>
                    <p className="col-table-4 p-nowrap text-center">品項</p>
                    <p className="col-table-1-5 p-nowrap text-center">單價</p>
                    <p className="col-table-1-5 p-nowrap text-center">數量</p>
                    <p className="col-table-1-5 p-nowrap text-center">小計</p>
                  </div>

                  {order?.subscriptions.map((sub) => (
                    <FinishOrder
                      key={sub.subscriptionId}
                      months={order?.month}
                      planName={sub.planName}
                      planPrice={sub.planPrice}
                      planQty={sub.planQty}
                      content={sub.content}
                    />
                  ))}
                </div>

                {/* 訂單合計 */}
                <div className="col-table-10">
                  <div className="total-bg d-flex justify-content-between align-items-center py-9-5 px-5">
                    <h6 className="col-table-5 text-start p-nowrap">
                      訂單合計
                    </h6>
                    <p className="col-table-5 total-text fs-16-sm fw-bold text-end p-nowrap">
                      每月
                      <span className="fs-24 fw-medium ps-2">
                        ${grandTotal.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 說明文字 */}
              <p className="fs-14-sm text-center px-12-sm mb-48-sm">
                您可到
                <a href="./member.html" className="text-primary-500">
                  訂單查詢
                </a>
                查看訂購紀錄，如有任何問題或其他意見，歡迎
                <a
                  href="mailto:service.maorihe@gmail.com"
                  className="text-primary-500"
                >
                  聯繫我們
                </a>
                ，謝謝!
              </p>
            </div>

            {/* 定位圖 */}
            <img
              src={finishIllustration}
              alt="完成訂閱插畫"
              className="finish-illustration d-none-sm"
            />
            <img
              src={balloonIllustration}
              alt="氣球插畫"
              className="balloon-illustration d-none-sm"
            />

            {/* 儲存按鈕手機版 */}
            <div className="text-center d-none-min-sm px-5-5-sm">
              <div className="row">
                <div className="col-6-sm">
                  <Link
                    className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    to="/"
                    role="button"
                  >
                    返回首頁
                  </Link>
                </div>
                <div className="col-6-sm">
                  <Link
                    className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    to="/petinfo"
                    role="button"
                  >
                    新增訂單
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 儲存按鈕網頁版 */}
          <div className="text-center d-none-sm">
            <Link
              className="btn btn-primary rounded-pill btn-active-white px-40 me-6"
              to="/"
              role="button"
            >
              返回首頁
            </Link>
            <Link
              className="btn btn-primary rounded-pill btn-active px-40"
              to="/petinfo"
              role="button"
            >
              新增訂單
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Finish;
