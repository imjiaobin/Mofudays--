import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCarts,
  deleteCart,
  updateCartQty,
  updateCartCycles,
  getCurrentUserId,
} from "../../../api/planApi";

import "./Cart.scss";

import ProgressBar2 from "../Subscribe/ProgressBar2";
import CartCardWeb from "./CartCardWeb";
import CartCardPhone from "./CartCardPhone";
import ActiveButtonPhone from "../Subscribe/ActiveButtonPhone.jsx";
import ActiveButtonWeb from "../Subscribe/ActiveButtonWeb.jsx";

import productImg1 from "../../../assets/images/subscribe/product-img-01.png";

function Cart() {
  const [carts, setCarts] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(
    () => JSON.parse(localStorage.getItem("selectedPeriod")) ?? null,
  );
  const navigate = useNavigate();

  // 取得購物車資料
  useEffect(() => {
    const userId = getCurrentUserId();
    getCarts(userId)
      .then((data) => {
        setCarts(data);
        if (data.length > 0 && data[0].totalCycles) {
          setSelectedPeriod(data[0].totalCycles);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedPeriod", JSON.stringify(selectedPeriod));
  }, [selectedPeriod]);

  // 刪除
  const handleDelete = async (cartId) => {
    await deleteCart(cartId);
    setCarts((prev) => prev.filter((c) => c.id !== cartId));
  };

  // 減少數量
  const handleDecrease = async (cart) => {
    if (cart.planQty <= 1) return;
    const updated = await updateCartQty(cart.id, cart.planQty - 1);
    setCarts((prev) => prev.map((c) => (c.id === cart.id ? updated : c)));
  };

  // 增加數量
  const handleIncrease = async (cart) => {
    const updated = await updateCartQty(cart.id, cart.planQty + 1);
    setCarts((prev) => prev.map((c) => (c.id === cart.id ? updated : c)));
  };

  // 計算總計
  const grandTotal = carts.reduce((sum, c) => sum + c.planPrice * c.planQty, 0);

  return (
    <>
      <main className="cart py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 title="購物車" step={1} />

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
                {carts.map((cart) => (
                  <CartCardWeb
                    key={cart.id}
                    productImg={productImg1}
                    title={cart.planName}
                    price={cart.planPrice}
                    content={cart.content}
                    quantity={cart.planQty}
                    total={cart.planPrice * cart.planQty}
                    onDelete={() => handleDelete(cart.id)}
                    onDecrease={() => handleDecrease(cart)}
                    onIncrease={() => handleIncrease(cart)}
                  />
                ))}

                {/* 表格手機版 */}
                {carts.map((cart) => (
                  <CartCardPhone
                    key={cart.id}
                    productImg={productImg1}
                    title={cart.planName}
                    price={cart.planPrice}
                    content={cart.content}
                    quantity={cart.planQty}
                    total={cart.planPrice * cart.planQty}
                    onDelete={() => handleDelete(cart.id)}
                    onDecrease={() => handleDecrease(cart)}
                    onIncrease={() => handleIncrease(cart)}
                  />
                ))}
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
                      checked={selectedPeriod === 1}
                      onChange={() => setSelectedPeriod(1)}
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
                      checked={selectedPeriod === 3}
                      onChange={() => setSelectedPeriod(3)}
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
                      checked={selectedPeriod === 6}
                      onChange={() => setSelectedPeriod(6)}
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
                      checked={selectedPeriod === 12}
                      onChange={() => setSelectedPeriod(12)}
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
                    每月
                    <span className="fs-24 fw-medium px-2">
                      ${grandTotal.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* 訂單合計手機版 */}
              <div className="col-12-sm d-none-min-sm mb-24-sm">
                <div className="px-16-sm">
                  <div className="total-bg d-flex justify-content-between align-items-center px-5 py-4">
                    <h6 className="ls-5">訂單合計</h6>
                    <p className="total-text fw-bold fs-16-sm text-end">
                      每月
                      <span className="fs-24 fw-medium px-2">
                        ${grandTotal.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 儲存按鈕手機版 */}
            <ActiveButtonPhone
              active1="回上一步"
              active2="確認結帳"
              active3="加入新的訂閱"
              onBack={() => navigate(-1)}
              onExtra={() => navigate("/petinfo")}
              onSubmit={async () => {
                if (!selectedPeriod) {
                  alert("請選擇訂閱期數");
                  return;
                }
                await Promise.all(
                  carts.map((c) => updateCartCycles(c.id, selectedPeriod)),
                );
                localStorage.removeItem("selectedPeriod");
                navigate("/checkout");
              }}
            />
          </div>
        </div>

        {/* 儲存按鈕網頁版 */}
        <ActiveButtonWeb
          active1="回上一步"
          active2="確認結帳"
          active3="加入新的訂閱"
          onBack={() => navigate(-1)}
          onExtra={() => navigate("/petinfo")}
          onSubmit={async () => {
            if (!selectedPeriod) {
              alert("請選擇訂閱期數");
              return;
            }
            await Promise.all(
              carts.map((c) => updateCartCycles(c.id, selectedPeriod)),
            );
            localStorage.removeItem("selectedPeriod");
            navigate("/checkout");
          }}
        />
      </main>
    </>
  );
}

export default Cart;
