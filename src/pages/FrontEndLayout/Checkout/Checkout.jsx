import "./Checkout.scss";
import ProgressBar2 from "../Subscribe/ProgressBar2";

function Checkout() {
  return (
    <>
      <main className="checkout py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 />

          {/* 訂單明細卡片 */}
          <div className="card-bg py-9 px-110 px-12-sm mb-6 mb-0-sm">
            <div className="px-16-sm">
              {/* 訂單明細 */}
              <div className="row-table mb-6">
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

                  {/* 表格第一列 */}
                  <div className="table-container-bg fs-14-sm d-flex py-4 px-4-sm pe-12-sm mb-2">
                    {/* 訂閱期數 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      3
                    </div>
                    {/* 品項 */}
                    <div className="col-table-4">
                      <p className="table-title fw-bold mb-2 mb-4-sm">
                        新手爸媽安心組
                      </p>
                      <p className="table-text fw-normal">
                        零食 x 3 + 保健罐頭 x 2 + 互動小物 x 2
                      </p>
                    </div>
                    {/* 單價 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      $699
                    </div>
                    {/* 數量 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      3
                    </div>
                    {/* 小計 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      $2,097
                    </div>
                  </div>

                  {/* 表格第二列 */}
                  <div className="table-container-bg fs-14-sm d-flex py-4 px-4-sm pe-12-sm mb-2">
                    {/* 訂閱期數 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      3
                    </div>
                    {/* 品項 */}
                    <div className="col-table-4">
                      <p className="table-title fw-bold mb-2 mb-4-sm">
                        青春汪能量補給包
                      </p>
                      <p className="table-text fw-normal">
                        零食 x 3 + 保健罐頭 x 2 + 互動小物 x 2
                      </p>
                    </div>
                    {/* 單價 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      $699
                    </div>
                    {/* 數量 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      2
                    </div>
                    {/* 小計 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      $1,398
                    </div>
                  </div>

                  {/* 表格第三列 */}
                  <div className="table-container-bg fs-14-sm d-flex py-4 px-4-sm pe-12-sm mb-2">
                    {/* 訂閱期數 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      3
                    </div>
                    {/* 品項 */}
                    <div className="col-table-4">
                      <p className="table-title fw-bold mb-2 mb-4-sm">
                        牛氣補補能量盒
                      </p>
                      <p className="table-text fw-normal">
                        零食 x 3 + 保健罐頭 x 2 + 互動小物 x 2
                      </p>
                    </div>
                    {/* 單價 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      $699
                    </div>
                    {/* 數量 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      1
                    </div>
                    {/* 小計 */}
                    <div className="col-table-1-5 d-flex justify-content-center align-items-center">
                      $699
                    </div>
                  </div>
                </div>

                {/* 訂單合計 */}
                <div className="col-table-10">
                  <div className="total-bg d-flex justify-content-between align-items-center py-9-5 px-5">
                    <h6 className="col-table-5 text-start p-nowrap">
                      訂單合計
                    </h6>
                    <p className="col-table-5 total-text fs-16-sm fw-bold text-end p-nowrap">
                      每月<span className="fs-24 fw-medium ps-2">$4,194</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 結帳資訊 */}
              <div className="row-table mb-48-sm">
                <div className="col-table-10">
                  <h5 className="mb-5 ls-5 text-center-sm">結帳資訊</h5>

                  {/* 個人資訊 */}
                  <div className="personal-info">
                    <div className="table-title-bg px-5 py-2 mb-2">
                      <p>輸入你的個人資訊</p>
                    </div>
                    <div className="row g-2 mb-5 checkout-form">
                      <div className="col-6 col-12-sm px-4-sm">
                        <input
                          type="name"
                          className="form-control"
                          id="checkout-name"
                          placeholder="姓名"
                        />
                      </div>
                      <div className="col-6 col-12-sm px-4-sm">
                        <input
                          type="text"
                          className="form-control"
                          id="checkout-address"
                          placeholder="地址"
                        />
                      </div>
                      <div className="col-6 col-12-sm px-4-sm">
                        <input
                          type="tel"
                          className="form-control"
                          id="checkout-tel"
                          placeholder="電話"
                        />
                      </div>
                      <div className="col-6 col-12-sm px-4-sm">
                        <input
                          type="email"
                          className="form-control"
                          id="checkout-email"
                          placeholder="電子郵件"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 付款方式 */}
                  <div className="payment-method">
                    <div className="table-title-bg px-5 py-2 mb-2">
                      <p>選擇付款方式</p>
                    </div>

                    <div
                      role="group"
                      aria-label="Basic radio toggle button group"
                      className="mb-5 row g-2"
                    >
                      {/* 信用卡 */}
                      <div className="col-3 col-6-sm px-4-sm me-2 me-0-sm">
                        <input
                          type="radio"
                          className="btn-check w-100"
                          name="payment-method"
                          id="credit-card"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet px-0 py-3 w-100"
                          htmlFor="credit-card"
                        >
                          信用卡
                        </label>
                      </div>

                      {/* LINE PAY */}
                      <div className="col-3 col-6-sm px-4-sm">
                        <input
                          type="radio"
                          className="btn-check"
                          name="payment-method"
                          id="LINE-PAY"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-primary btn-diet px-0 py-3 w-100"
                          htmlFor="LINE-PAY"
                        >
                          LINE Pay
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 訂單備註 */}
                  <div className="payment-method">
                    <div className="table-title-bg px-5 py-2 mb-2">
                      <p>訂單備註</p>
                    </div>

                    <div className="form-floating">
                      <textarea
                        className="form-control px-3 py-5"
                        placeholder="備註"
                        id="checkout-remark"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="checkout-remark ps-3">備註</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 儲存按鈕手機版 */}
            <div className="text-center d-none-min-sm px-5-5-sm">
              <div className="row">
                <div className="col-6-sm">
                  <a
                    className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    href="./cart.html"
                    role="button"
                  >
                    回上一步
                  </a>
                </div>
                <div className="col-6-sm">
                  <a
                    className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    href="./finish.html"
                    role="button"
                  >
                    確認付款
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 儲存按鈕 */}
          <div className="text-center d-none-sm">
            <a
              className="btn btn-primary rounded-pill btn-active-white px-40 me-6"
              href="./cart.html"
              role="button"
            >
              回上一步
            </a>
            <a
              className="btn btn-primary rounded-pill btn-active px-40"
              href="./finish.html"
              role="button"
            >
              確認付款
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
