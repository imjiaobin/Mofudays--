import "./Cart.scss";
import ProgressBar2 from "../Subscribe/ProgressBar2.jsx";

import productImg1 from "../../assets/images/subscribe/product-img-01.png";
import productImg2 from "../../assets/images/subscribe/product-img-02.png";
import productImg3 from "../../assets/images/subscribe/product-img-03.png";

const CartCard = ({ productImg, title, price, quantity, total }) => {
  return (
    <>
      <div className="table-container-bg d-flex py-4 mb-2 d-none-sm">
        {/* 圖片+品項 */}
        <div className="col-table-5 d-flex ps-4">
          <img
            src={productImg}
            alt={title}
            className="img-fluid table-img rounded-4 me-5"
          />
          <div>
            <p className="table-title fw-bold mb-4">{title}</p>
            <p className="table-text fw-normal mb-1">零食 x 3</p>
            <p className="table-text fw-normal mb-1">保健罐頭 x 2</p>
            <p className="table-text fw-normal mb-1">互動小物 x 2</p>
          </div>
        </div>

        {/* 單價 */}
        <div className="col-table-1 d-flex justify-content-center align-items-center">
          ${price}
        </div>

        {/* 數量 */}
        <div className="col-table-2 d-flex align-items-center">
          <div className="input-group px-4" style={{ height: "48px" }}>
            <button className="btn btn-quantity px-4 py-3" type="button">
              －
            </button>
            <input
              type="text"
              className="form-control text-center input-number px-0"
              value={quantity}
              readOnly
              tabIndex="-1"
              aria-label="Example text with two button addons"
            />
            <button className="btn btn-quantity px-4 py-3" type="button">
              ＋
            </button>
          </div>
        </div>

        {/* 小計 */}
        <div className="col-table-1 d-flex justify-content-center align-items-center">
          ${total}
        </div>

        {/* 關閉 */}
        <div className="col-table-1 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
};

function Cart() {
  return (
    <>
      <main className="cart py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 />

          {/* 訂閱內容卡片 */}
          <div className="card-bg py-9 px-110 px-12-sm mb-6 mb-0-sm">
            <div className="row-table">
              {/* 訂閱內容表格 */}
              <div className="col-table-10 mb-7">
                <h5 className="mb-5 ls-5 text-center-sm">訂閱內容</h5>

                {/* 表格標題列 */}
                <div className="table-title-bg d-flex py-2 mb-2 d-none-sm">
                  <p className="col-table-2 text-center"></p>
                  <p className="col-table-3 text-center">品項</p>
                  <p className="col-table-1 text-center">單價</p>
                  <p className="col-table-2 text-center">數量</p>
                  <p className="col-table-1 text-center">小計</p>
                  <p className="col-table-1 text-center"></p>
                </div>

                {/* 表格網頁版 */}
                {/* 第一列 */}
                <CartCard
                  productImg={productImg1}
                  title="新手爸媽安心組"
                  price="699"
                  quantity="3"
                  total="2,097"
                />

                {/* 第二列 */}
                <CartCard
                  productImg={productImg2}
                  title="青春汪能量補給包"
                  price="699"
                  quantity="2"
                  total="1,398"
                />

                {/* 第三列 */}
                <CartCard
                  productImg={productImg3}
                  title="牛氣補補能量盒"
                  price="699"
                  quantity="1"
                  total="699"
                />

                {/* 表格手機版 */}
                {/* 第一列 */}
                <div className="px-16-sm">
                  <div className="table-container-bg p-16-sm mb-8-sm d-none-min-sm">
                    {/* 圖片+品項+關閉+單價 */}
                    <div className="d-flex justify-content-between align-items-center mb-16-sm">
                      {/* 圖片+品項 */}
                      <div className="d-flex align-items-center">
                        <img
                          src={productImg1}
                          alt="新手爸媽安心組"
                          className="table-img rounded-4 me-5"
                        />
                        <div className="py-8-sm">
                          <p className="table-title fw-bold mb-8-sm">
                            新手爸媽安心組
                          </p>
                          <p className="table-text fw-normal">零食 x 3</p>
                          <p className="table-text fw-normal">保健罐頭 x 2</p>
                          <p className="table-text fw-normal">互動小物 x 2</p>
                        </div>
                      </div>

                      {/* 關閉+單價 */}
                      <div className="d-flex flex-column align-items-center">
                        <button
                          type="button"
                          className="btn-close p-14-sm mb-24-sm"
                          aria-label="Close"
                        ></button>
                        <p className="text-center text-brown-300 mb-3">$699</p>
                      </div>
                    </div>

                    {/* 數量+小計 */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center w-40-sm">
                        <div className="input-group">
                          <button
                            className="btn btn-quantity px-3 py-3"
                            type="button"
                          >
                            －
                          </button>
                          <input
                            type="text"
                            className="form-control text-center input-number fs-14-sm px-0"
                            value="3"
                            readOnly
                            tabIndex="-1"
                            aria-label="Example text with two button addons"
                          />
                          <button
                            className="btn btn-quantity px-3 py-3"
                            type="button"
                          >
                            ＋
                          </button>
                        </div>
                      </div>
                      <p className="text-center">小計 $2,097</p>
                    </div>
                  </div>
                </div>

                {/* 第二列 */}
                <div className="px-16-sm">
                  <div className="table-container-bg p-16-sm mb-8-sm d-none-min-sm">
                    {/* 圖片+品項+關閉+單價 */}
                    <div className="d-flex justify-content-between align-items-center mb-16-sm">
                      {/* 圖片+品項 */}
                      <div className="d-flex mb-16-sm">
                        <img
                          src={productImg2}
                          alt="青春汪能量補給包"
                          className="img-fluid table-img rounded-4 me-5"
                        />
                        <div>
                          <p className="table-title fw-bold mb-8-sm">
                            青春汪能量補給包
                          </p>
                          <p className="table-text fw-normal">零食 x 3</p>
                          <p className="table-text fw-normal">保健罐頭 x 2</p>
                          <p className="table-text fw-normal">互動小物 x 2</p>
                        </div>
                      </div>

                      {/* 關閉+單價 */}
                      <div className="d-flex flex-column align-items-center">
                        <button
                          type="button"
                          className="btn-close p-14-sm mb-24-sm"
                          aria-label="Close"
                        ></button>
                        <p className="text-center text-brown-300 mb-3">$699</p>
                      </div>
                    </div>

                    {/* 數量+小計 */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center w-40-sm">
                        <div className="input-group">
                          <button
                            className="btn btn-quantity px-3 py-3"
                            type="button"
                          >
                            －
                          </button>
                          <input
                            type="text"
                            className="form-control text-center input-number fs-14-sm px-0"
                            value="2"
                            readOnly
                            tabIndex="-1"
                            aria-label="Example text with two button addons"
                          />
                          <button
                            className="btn btn-quantity px-3 py-3"
                            type="button"
                          >
                            ＋
                          </button>
                        </div>
                      </div>
                      <p className="text-center">小計 $2,097</p>
                    </div>
                  </div>
                </div>

                {/* 第三列 */}
                <div className="px-16-sm">
                  <div className="table-container-bg p-16-sm mb-8-sm d-none-min-sm">
                    {/* 圖片+品項+關閉+單價 */}
                    <div className="d-flex justify-content-between align-items-center mb-16-sm">
                      {/* 圖片+品項 */}
                      <div className="d-flex mb-16-sm">
                        <img
                          src={productImg3}
                          alt="牛氣補補能量盒"
                          className="img-fluid table-img rounded-4 me-5"
                        />
                        <div>
                          <p className="table-title fw-bold mb-8-sm">
                            牛氣補補能量盒
                          </p>
                          <p className="table-text fw-normal">零食 x 3</p>
                          <p className="table-text fw-normal">保健罐頭 x 2</p>
                          <p className="table-text fw-normal">互動小物 x 2</p>
                        </div>
                      </div>

                      {/* 關閉+單價 */}
                      <div className="d-flex flex-column align-items-center">
                        <button
                          type="button"
                          className="btn-close p-14-sm mb-24-sm"
                          aria-label="Close"
                        ></button>
                        <p className="text-center text-brown-300 mb-3">$699</p>
                      </div>
                    </div>

                    {/* 數量+小計 */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center w-40-sm">
                        <div className="input-group">
                          <button
                            className="btn btn-quantity px-3 py-3"
                            type="button"
                          >
                            －
                          </button>
                          <input
                            type="text"
                            className="form-control text-center input-number fs-14-sm px-0"
                            value="1"
                            readOnly
                            tabIndex="-1"
                            aria-label="Example text with two button addons"
                          />
                          <button
                            className="btn btn-quantity px-3 py-3"
                            type="button"
                          >
                            ＋
                          </button>
                        </div>
                      </div>
                      <p className="text-center">小計 $2,097</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 選擇訂閱期數 */}
              <div className="col-table-6 col-12-sm mb-56-sm">
                <div className="px-16-sm">
                  <h5 className="mb-5 ls-5 text-center-sm">選擇訂閱期數</h5>
                  <div
                    className="px-0 py-0 w-100 d-flex d-block-sm gap-4"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    {/* 1 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="one-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 mb-8-sm w-25 w-100-sm"
                      htmlFor="one-month"
                      style={{ height: "48px" }}
                    >
                      1 個月
                    </label>

                    {/* 3 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="three-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 mb-8-sm w-25 w-100-sm"
                      htmlFor="three-month"
                      style={{ height: "48px" }}
                    >
                      3 個月
                    </label>

                    {/* 6 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="six-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 mb-8-sm w-25 w-100-sm"
                      htmlFor="six-month"
                      style={{ height: "48px" }}
                    >
                      6 個月
                    </label>

                    {/* 12 個月 */}
                    <input
                      type="radio"
                      className="btn-check"
                      name="subscription-period"
                      id="twelve-month"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-primary btn-diet px-0 py-3 w-25 w-100-sm"
                      htmlFor="twelve-month"
                      style={{ height: "48px" }}
                    >
                      12 個月
                    </label>
                  </div>
                </div>
              </div>

              {/* 訂單合計網頁版 */}
              <div className="col-table-4 d-none-sm">
                <h5 className="mb-5 ls-5 text-center-sm">訂單合計</h5>
                <div
                  className="total-bg px-5 py-9-5"
                  style={{ height: "48px" }}
                >
                  <p className="total-text fw-bold text-end">
                    每月<span className="fs-24 fw-medium px-2">$4,194</span>
                  </p>
                </div>
              </div>

              {/* 訂單合計手機版 */}
              <div className="col-12-sm d-none-min-sm mb-24-sm">
                <div className="px-16-sm">
                  <div className="total-bg d-flex justify-content-between align-items-center px-5 py-4">
                    <h6 className="ls-5">訂單合計</h6>
                    <p className="total-text fw-bold fs-16-sm text-end">
                      每月<span className="fs-24 fw-medium px-2">$4,194</span>
                    </p>
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
                    href="./pet-info.html"
                    role="button"
                  >
                    繼續訂閱
                  </a>
                </div>
                <div className="col-6-sm">
                  <a
                    className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
                    href="./checkout.html"
                    role="button"
                  >
                    確認結帳
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 儲存按鈕網頁版 */}
        <div className="text-center d-none-sm">
          <a
            className="btn btn-primary rounded-pill btn-active-white fs-18-sm fw-medium-sm ls-10-sm px-40 me-6 me-24-sm"
            href="./pet-info.html"
            role="button"
          >
            繼續訂閱
          </a>
          <a
            className="btn btn-primary rounded-pill btn-active fs-18-sm fw-medium-sm ls-10-sm px-40"
            href="./checkout.html"
            role="button"
          >
            確認結帳
          </a>
        </div>
      </main>
    </>
  );
}

export default Cart;
