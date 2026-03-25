const FinishOrder = ({ months, planName, planPrice, planQty, content }) => {
  const snacks = content?.snacks?.length ?? 0;
  const household = content?.household?.length ?? 0;
  const toys = content?.toys?.length ?? 0;

  return (
    <div className="table-container-bg fs-14-sm d-flex py-4 py-20-sm px-4-sm pe-12-sm mb-2 flex-wrap-sm">
      {/* 訂閱期數 */}
      <div className="col-table-1-5 d-flex justify-content-center align-items-center d-none-sm">
        {months}
      </div>
      {/* 品項 */}
      <div className="col-table-4 col-table-6-sm ps-24-sm">
        <p className="table-title fw-bold mb-2 mb-4-sm">{planName}</p>
        <p className="table-text fw-normal">
          零食 x {snacks} + 保健罐頭 x {household} + 互動小物 x {toys}
        </p>
      </div>
      {/* 單價 */}
      <div className="col-table-1-5 col-table-2-sm d-flex justify-content-center align-items-center">
        ${planPrice}
      </div>
      {/* 數量 */}
      <div className="col-table-1-5 col-table-2-sm d-flex justify-content-center align-items-center">
        {planQty}
      </div>
      {/* 小計 */}
      <div className="col-table-1-5 d-flex justify-content-center align-items-center d-none-sm">
        ${(planPrice * planQty).toLocaleString()}
      </div>

      {/* 分隔線 */}
      <div className="col-12-sm table-line mt-16-sm d-none-min-sm"></div>

      {/* 訂閱期數+小計 手機版 */}
      <div className="d-flex text-end-sm mt-16-sm w-100 d-none-min-sm">
        <div className="col-table-6 text-start-sm ps-24-sm d-none-min-sm">
          {months} 期
        </div>
        <div className="col-table-2"></div>
        <div className="col-table-2 d-flex justify-content-center align-items-center">
          ${(planPrice * planQty).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default FinishOrder;
