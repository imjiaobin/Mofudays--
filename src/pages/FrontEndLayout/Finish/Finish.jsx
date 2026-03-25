import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../api/planApi";

import "./Finish.scss";
import ProgressBar2 from "../Subscribe/ProgressBar2";
import FinishOrder from "./FinishOrder";
import ActiveButtonPhone from "../Subscribe/ActiveButtonPhone.jsx";
import ActiveButtonWeb from "../Subscribe/ActiveButtonWeb.jsx";

import finishIllustration from "../../../assets/images/subscribe/Illustration-finish.png";
import balloonIllustration from "../../../assets/images/subscribe/Illustration-balloon.png";

function Finish() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

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
          <ProgressBar2
            title="訂閱成功！"
            subtitle="謝謝你成為毛日和的夥伴"
            step={3}
            className="finish-progress"
          />

          {/* 訂單內容卡片 */}
          <div className="card-bg py-9 px-110 px-60-lg px-12-sm mb-6 mb-0-sm">
            <div className="px-16-sm">
              {/* 感謝訂閱文字 */}
              <div className="fs-14-sm text-center-lg px-12-sm mb-6 mb-24-sm">
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

                  {/* 表格標題網頁版 */}
                  <div className="table-title-bg d-flex py-2 mb-2 d-none-sm">
                    <p className="col-table-1-5 text-center d-none-lg">
                      訂閱期數
                    </p>
                    <p className="col-table-1-5 text-center d-none-min-lg">
                      期數
                    </p>
                    <p className="col-table-4 p-nowrap text-center">品項</p>
                    <p className="col-table-1-5 p-nowrap text-center">單價</p>
                    <p className="col-table-1-5 p-nowrap text-center">數量</p>
                    <p className="col-table-1-5 p-nowrap text-center">小計</p>
                  </div>

                  {/* 表格標題手機版 */}
                  <div className="table-title-bg d-flex py-2 mb-2 d-none-min-sm">
                    <p className="col-table-6 p-nowrap text-center">品項</p>
                    <p className="col-table-2 p-nowrap text-center">數量</p>
                    <p className="col-table-2 p-nowrap text-center">單價</p>
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

              {/* 說明文字電腦版 */}
              <p className="fs-14-sm text-center d-none-lg">
                您可至
                <Link to="/usercenter/orders" className="text-primary-500">
                  訂單管理頁面
                </Link>
                查看訂購紀錄，如有任何問題或其他意見，歡迎
                <a
                  href="mailto:service.maorihe@gmail.com"
                  className="text-primary-500"
                >
                  聯繫我們
                </a>
                ，謝謝!
              </p>
              {/* 說明文字平板版 */}
              <p className="fs-14-sm text-center px-12-sm mb-48-sm d-none-min-lg">
                您可至
                <Link to="/usercenter/orders" className="text-primary-500">
                  訂單管理頁面
                </Link>
                查看訂購紀錄，
                <br />
                如有任何問題或其他意見，歡迎
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
            <ActiveButtonPhone
              active1="返回首頁"
              active2="新增訂單"
              onBack={() => navigate("/")}
              onSubmit={() => navigate("/petinfo")}
            />
          </div>

          {/* 儲存按鈕網頁版 */}
          <ActiveButtonWeb
            active1="返回首頁"
            active2="新增訂單"
            onBack={() => navigate("/")}
            onSubmit={() => navigate("/petinfo")}
          />
        </div>
      </main>
    </>
  );
}

export default Finish;
