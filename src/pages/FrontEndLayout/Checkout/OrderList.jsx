import OrderItem from "./OrderItem";

const OrderList = ({ carts, grandTotal }) => {
  return (
    <>
      {/* 訂單明細 */}
      <div className="row-table mb-6">
        {/* 表格 */}
        <div className="col-table-10">
          <h5 className="mb-5 ls-5 text-center-sm">訂單明細</h5>

          {/* 表格標題 */}
          <div className="table-title-bg fs-14-sm d-flex py-2 px-4-sm mb-2">
            {/* 網頁版 */}
            <p className="col-table-1-5 text-center d-none-sm">訂閱期數</p>
            {/* 手機版 */}
            <p className="col-table-1-5 text-center p-nowrap d-none-min-sm">
              期數
            </p>
            <p className="col-table-4 p-nowrap text-center">品項</p>
            <p className="col-table-1-5 p-nowrap text-center">單價</p>
            <p className="col-table-1-5 p-nowrap text-center">數量</p>
            <p className="col-table-1-5 p-nowrap text-center">小計</p>
          </div>

          {/* 表格內容 */}
          {carts.map((cart) => (
            <OrderItem
              key={cart.id}
              months={cart.totalCycles}
              planName={cart.planName}
              planPrice={cart.planPrice}
              planQty={cart.planQty}
              content={cart.content}
            />
          ))}
        </div>

        {/* 訂單合計 */}
        <div className="col-table-10">
          <div className="total-bg d-flex justify-content-between align-items-center py-9-5 px-5">
            <h6 className="col-table-5 text-start p-nowrap">訂單合計</h6>
            <p className="col-table-5 total-text fs-16-sm fw-bold text-end p-nowrap">
              每月
              <span className="fs-24 fw-medium ps-2">
                ${grandTotal.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
