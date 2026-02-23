import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCarts,
  deleteCart,
  getOrders,
  createOrder,
  getCurrentUserId,
} from "../../../api/planApi";

import "./Checkout.scss";
import ProgressBar2 from "../Subscribe/ProgressBar2";
import OrderList from "./OrderList";
import CheckoutInfo from "./CheckoutInfo";
import ActiveButtonPhone from "../Subscribe/ActiveButtonPhone.jsx";
import ActiveButtonWeb from "../Subscribe/ActiveButtonWeb.jsx";

function Checkout() {
  const [carts, setCarts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
    district: "",
    street: "",
    tel: "",
    email: "",
    paymentMethod: "",
    remark: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    city: "",
    district: "",
    street: "",
    tel: "",
    email: "",
    paymentMethod: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCarts(getCurrentUserId()).then(setCarts).catch(console.error);
  }, []);

  const grandTotal = carts.reduce((sum, c) => sum + c.planPrice * c.planQty, 0);

  // 錯誤提示
  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // 表單驗證
  const handlePlaceOrder = async () => {
    if (isSubmitting) return;

    const telReg = /^(09\d{2}-\d{3}-\d{3}|0\d-\d{3}-\d{4}|0\d-\d{4}-\d{4})$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: !form.name.trim() ? "請輸入姓名" : "",
      city: !form.city ? "請選擇縣市" : "",
      district: !form.district ? "請選擇地區" : "",
      street: !form.street.trim() ? "請輸入街道與門牌" : "",
      tel: !form.tel.trim()
        ? "請輸入手機號碼"
        : !telReg.test(form.tel.trim())
          ? "格式錯誤"
          : "",
      email: !form.email.trim()
        ? "請輸入電子郵件"
        : !emailReg.test(form.email.trim())
          ? "電子郵件格式錯誤"
          : "",
      paymentMethod: !form.paymentMethod ? "請選擇付款方式" : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    try {
      setIsSubmitting(true);
      const userId = getCurrentUserId();
      const existingOrders = await getOrders();
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      const maxNum = existingOrders.reduce((max, order) => {
        const match = order.id?.match(/-(\d{4})$/);
        return match ? Math.max(max, parseInt(match[1])) : max;
      }, 0);
      const nextNum = String(maxNum + 1).padStart(4, "0");
      const orderId = `MOF${dateStr}-${nextNum}`;
      const shippedDate = new Date(today);
      shippedDate.setDate(shippedDate.getDate() + 3);
      const nextShippedDate = new Date(shippedDate);
      nextShippedDate.setMonth(nextShippedDate.getMonth() + 1);

      const orderPayload = {
        id: orderId,
        userId,
        month: carts[0]?.totalCycles ?? 1,
        orderDate: today.toISOString(),
        orderTotalAmount: grandTotal,
        currency: "TWD",
        paymentStatus: "未付款",
        paymentMethod: form.paymentMethod,
        buyerInfo: {
          name: form.name,
          email: form.email,
          phone: form.tel,
          address: `${form.city}${form.district}${form.street}`,
        },
        note: form.remark,
        subscriptions: carts.map((cart, i) => ({
          subscriptionId: `${orderId}-${i + 1}`,
          planName: cart.planName,
          planPrice: cart.planPrice,
          planQty: cart.planQty,
          content: cart.content,
          currentCycleIndex: 0,
          shippingStatus: "待出貨",
          shippedDate: shippedDate.toISOString(),
          nextShippedDate: nextShippedDate.toISOString(),
          subscriptionStatus: "訂閱中",
        })),
      };

      await createOrder(orderPayload);
      await Promise.all(carts.map((c) => deleteCart(c.id)));
      navigate(`/finish?orderId=${orderId}`);
    } catch (err) {
      console.error("建立訂單失敗", err);
      alert("建立訂單時發生錯誤，請確認網路連線或稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="checkout py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar2 title="訂單確認" />

          {/* 訂單明細卡片 */}
          <div className="card-bg py-9 px-110 px-12-sm mb-6 mb-0-sm">
            <div className="px-16-sm">
              {/* 訂單明細 */}
              <OrderList carts={carts} grandTotal={grandTotal} />

              {/* 結帳資訊 */}
              <CheckoutInfo
                form={form}
                setForm={setForm}
                errors={errors}
                clearError={clearError}
              />
            </div>

            {/* 儲存按鈕手機版 */}
            <ActiveButtonPhone
              active1="回上一步"
              active2="確認付款"
              onBack={() => navigate("/cart")}
              onSubmit={handlePlaceOrder}
            />
          </div>

          {/* 儲存按鈕網頁版 */}
          <ActiveButtonWeb
            active1="回上一步"
            active2="確認付款"
            onBack={() => navigate("/cart")}
            onSubmit={handlePlaceOrder}
          />
        </div>
      </main>
    </>
  );
}

export default Checkout;
