const OrderItem = ({ months, planName, planPrice, planQty, content }) => {
  const snacks = content?.snacks?.length ?? 0;
  const household = content?.household?.length ?? 0;
  const toys = content?.toys?.length ?? 0;

  return (
    <>
      <div className="table-container-bg fs-14-sm d-flex py-4 px-4-sm pe-12-sm mb-2">
        {/* 訂閱期數 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          {months}
        </div>
        {/* 品項 */}
        <div className="col-table-4">
          <p className="table-title fw-bold mb-2 mb-4-sm">{planName}</p>
          <p className="table-text fw-normal">
            零食 x {snacks} + 保健罐頭 x {household} + 互動小物 x {toys}
          </p>
        </div>
        {/* 單價 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          ${planPrice}
        </div>
        {/* 數量 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          {planQty}
        </div>
        {/* 小計 */}
        <div className="col-table-1-5 d-flex justify-content-center align-items-center">
          ${(planPrice * planQty).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
