import { useState, useEffect } from "react";
import { useNavigate, useBlocker } from "react-router-dom";
import { getUserProfile } from "../../../api/userApi";
import {
  getCarts,
  deleteCart,
  getOrders,
  createOrder,
  getCurrentUserId,
} from "../../../api/planApi";

import "./Checkout.scss";
import CheckoutProgressBar from "../Subscribe/CheckoutProgressBar.jsx";
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
  const [memberProfile, setMemberProfile] = useState(null);
  const [useMemberData, setUseMemberData] = useState(false);
  const navigate = useNavigate();

  const hasFormData =
    form.name !== "" ||
    form.tel !== "" ||
    form.email !== "" ||
    form.city !== "" ||
    form.street !== "" ||
    form.paymentMethod !== "" ||
    form.remark !== "";

  // 攔截路由跳頁
  const blocker = useBlocker(hasFormData);
  useEffect(() => {
    if (blocker.state !== "blocked") return;
    if (blocker.location?.pathname === "/payment") {
      blocker.proceed();
      return;
    }
    if (window.confirm("離開此頁面後，已填寫的資料將會清空，確定要離開嗎？")) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker]);

  // 攔截瀏覽器關閉 / 重新整理
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!hasFormData) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasFormData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carts = await getCarts(getCurrentUserId());
        setCarts(carts);
        const profile = await getUserProfile();
        if (profile) setMemberProfile(profile);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const grandTotal = carts.reduce((sum, c) => sum + c.planPrice * c.planQty, 0);

  const handleUseMemberData = (checked) => {
    setUseMemberData(checked);
    if (checked && memberProfile) {
      setErrors((prev) => ({
        ...prev,
        name: "",
        city: "",
        district: "",
        street: "",
        tel: "",
        email: "",
      }));
      setForm((prev) => ({
        ...prev,
        name: memberProfile.name || "",
        tel: memberProfile.phone || "",
        email: memberProfile.email || "",
        city: memberProfile.shippingCity || memberProfile.city || "",
        district:
          memberProfile.shippingDistrict || memberProfile.district || "",
        street: memberProfile.shippingAddress || memberProfile.address || "",
      }));
    } else {
      setForm((prev) => ({
        name: "",
        city: "",
        district: "",
        street: "",
        tel: "",
        email: "",
        paymentMethod: prev.paymentMethod,
        remark: prev.remark,
      }));
    }
  };

  // 錯誤提示
  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // 表單驗證
  const handlePlaceOrder = async () => {
    if (isSubmitting) return;

    const telReg = /^(\d{10}|(?!09)\d{9})$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: !form.name.trim() ? "請輸入姓名" : "",
      city: !form.city ? "請選擇縣市" : "",
      district: !form.district ? "請選擇地區" : "",
      street: !form.street.trim() ? "請輸入街道與門牌" : "",
      tel: !form.tel.trim()
        ? "請輸入手機號碼"
        : !telReg.test(form.tel.trim())
          ? "請檢查是否輸入錯誤"
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
        paymentStatus: "已付款",
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
          dogId: cart.dogId, // 每筆訂單補上狗狗ID BY James
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
      navigate(`/payment?orderId=${orderId}`, { replace: true });
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
          <CheckoutProgressBar title="訂單確認" step={2} />

          {/* 訂單明細卡片 */}
          <div className="card-bg py-9 px-110 px-60-lg px-12-sm mb-6 mb-0-sm">
            <div className="px-16-sm">
              {/* 訂單明細 */}
              <OrderList carts={carts} grandTotal={grandTotal} />

              {/* 結帳資訊 */}
              <CheckoutInfo
                form={form}
                setForm={setForm}
                errors={errors}
                clearError={clearError}
                memberProfile={memberProfile}
                useMemberData={useMemberData}
                onUseMemberDataChange={handleUseMemberData}
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
