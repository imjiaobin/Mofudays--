import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addToCart, getCarts, getCurrentUserId } from "../../../api/planApi";

import "./Plan.scss";
import ProgressBar1 from "../Subscribe/ProgressBar1.jsx";
import PlanCard from "./PlanCard.jsx";
import ActiveButtonPhone from "../Subscribe/ActiveButtonPhone.jsx";
import ActiveButtonWeb from "../Subscribe/ActiveButtonWeb.jsx";

import planImg from "../../../assets/images/subscribe/plan-img.png";

function Plan() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const saved = JSON.parse(localStorage.getItem("planState") || "{}");
  const formData = state?.formData ?? saved.formData;
  const dogId = state?.dogId ?? saved.dogId;
  const generatedPlans = state?.generatedPlans ?? saved.generatedPlans;

  useEffect(() => {
    if (selectedPlan) localStorage.setItem("selectedPlan", selectedPlan);
  }, [selectedPlan]);

  const handleBack = () =>
    navigate("/petinfo", { state: { dogId, fromPlan: true } });

  const handleSubmitPlan = async () => {
    if (!selectedPlan) {
      alert("請先選擇一個方案");
      return;
    }

    const planIndex = { plan1: 0, plan2: 1, plan3: 2 }[selectedPlan];
    const plan = generatedPlans[planIndex];
    const userId = getCurrentUserId(); // 未來換 auth 只改這一行

    const cartPayload = {
      userId,
      dogId: dogId ?? null,
      planName: plan.name,
      planPrice: plan.planPrice,
      planQty: 1,
      totalCycles: plan.months,
      pet: {
        name: formData?.petName,
        gender: formData?.gender,
        size: formData?.size,
        allergy:
          formData?.allergy?.filter((a) => a !== "NONE").join("、") || "無",
      },
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: {
        snacks: (plan.items?.treats ?? []).map((t) => ({
          treatId: t.id,
          qty: 1,
        })),
        toys: (plan.items?.toys ?? []).map((t) => ({ toyId: t.id, qty: 1 })),
        household: (plan.items?.household ?? []).map((h) => ({
          itemId: h.id,
          qty: 1,
        })),
      },
    };

    try {
      const existingCarts = await getCarts(userId);
      const existingCart = existingCarts.find(
        (c) => c.userId === userId && c.dogId === (dogId ?? null),
      );

      if (existingCart) {
        alert(
          "此毛孩已有訂閱方案在購物車中，請先完成結帳，或至購物車刪除後再重新添加。",
        );
        navigate("/cart");
        return;
      }
      await addToCart(cartPayload);
      navigate("/cart");
    } catch (err) {
      console.error("加入購物車失敗", err);
    }
  };

  return (
    <>
      <main className="plan py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar1 step={2} />

          {/* 推薦方案 */}
          <div className="card-bg py-9 px-110 px-60-lg px-12-sm mb-6 mb-0-sm">
            <div className="justify-content-center">
              {/* 標題 */}
              <div className="col-12">
                <h4 className="fw-bold text-primary-500 text-center-sm mb-40 mb-24-sm">
                  選擇方案
                </h4>
              </div>

              <div className="col-12 d-flex d-block-md gap-5">
                {/* 左邊欄位 */}
                <div className="plan-title justify-content-center px-26 p-16-md mb-24-md">
                  <img
                    src={planImg}
                    alt="推薦方案"
                    className="mb-32 mb-16-sm"
                  />
                  <div>
                    <h5 className="fs-20-sm ls-5 mb-4 mb-16-sm">
                      給毛孩的三種驚喜提案
                    </h5>
                    <p className="fs-14-sm text-brown-300 d-none-sm">
                      為了讓你能更輕鬆找到最適合毛孩的盒子，
                      <br />
                      我們依照內容物、用途與毛孩特性整理出三種不同的訂閱組合。
                      <br />
                      無論你是新手爸媽，或是想給毛孩更多陪伴，我們都準備了合適的選擇。
                    </p>
                    <p className="fs-14-sm text-brown-300 d-none-min-sm">
                      為了讓你能更輕鬆找到最適合毛孩的盒子，
                      我們依照內容物、用途與毛孩特性整理出三種不同的訂閱組合。
                      <br />
                      無論你是新手爸媽，或是想給毛孩更多陪伴，我們都準備了合適的選擇。
                    </p>
                  </div>
                </div>

                {/* 右邊欄位 */}
                <div className="plan-item mb-48-sm">
                  {/* 方案一 */}
                  <PlanCard
                    id="plan1"
                    title={generatedPlans?.[0]?.name}
                    price={generatedPlans?.[0]?.planPrice}
                    text={generatedPlans?.[0]?.subtitle}
                    content={{
                      treats: generatedPlans?.[0]?.items?.treats?.length ?? 0,
                      toys: generatedPlans?.[0]?.items?.toys?.length ?? 0,
                      household:
                        generatedPlans?.[0]?.items?.household?.length ?? 0,
                    }}
                    selectedPlan={selectedPlan}
                    onSelect={setSelectedPlan}
                  ></PlanCard>
                  {/* 方案二 */}
                  <PlanCard
                    id="plan2"
                    title={generatedPlans?.[1]?.name}
                    price={generatedPlans?.[1]?.planPrice}
                    text={generatedPlans?.[1]?.subtitle}
                    content={{
                      treats: generatedPlans?.[1]?.items?.treats?.length ?? 0,
                      toys: generatedPlans?.[1]?.items?.toys?.length ?? 0,
                      household:
                        generatedPlans?.[1]?.items?.household?.length ?? 0,
                    }}
                    selectedPlan={selectedPlan}
                    onSelect={setSelectedPlan}
                  ></PlanCard>
                  {/* 方案三 */}
                  <PlanCard
                    id="plan3"
                    title={generatedPlans?.[2]?.name}
                    price={generatedPlans?.[2]?.planPrice}
                    text={generatedPlans?.[2]?.subtitle}
                    content={{
                      treats: generatedPlans?.[2]?.items?.treats?.length ?? 0,
                      toys: generatedPlans?.[2]?.items?.toys?.length ?? 0,
                      household:
                        generatedPlans?.[2]?.items?.household?.length ?? 0,
                    }}
                    selectedPlan={selectedPlan}
                    onSelect={setSelectedPlan}
                  ></PlanCard>
                </div>
              </div>
            </div>

            {/* 儲存按鈕手機版 */}
            <ActiveButtonPhone
              active1="回上一步"
              active2="加入購物車"
              onBack={handleBack}
              onSubmit={handleSubmitPlan}
            />
          </div>

          {/* 儲存按鈕網頁版 */}
          <ActiveButtonWeb
            active1="回上一步"
            active2="加入購物車"
            onBack={handleBack}
            onSubmit={handleSubmitPlan}
          />
        </div>
      </main>
    </>
  );
}
export default Plan;
