import OrderItem from "./OrderItem";

const OrderList = ({ carts, grandTotal }) => {
  return (
    <>
      {/* 訂單明細 */}
      <div className="row-table mb-6">
        {/* 表格 */}
        <div className="col-table-10">
          <h5 className="mb-5 ls-5 text-center-md">訂單明細</h5>

          {/* 表格標題網頁版 */}
          <div className="table-title-bg d-flex py-2 mb-2 d-none-md">
            <p className="col-table-1-5 text-center d-none-lg">訂閱期數</p>
            <p className="col-table-1-5 text-center d-none-min-lg">期數</p>
            <p className="col-table-4 p-nowrap text-center">品項</p>
            <p className="col-table-1-5 p-nowrap text-center">單價</p>
            <p className="col-table-1-5 p-nowrap text-center">數量</p>
            <p className="col-table-1-5 p-nowrap text-center">小計</p>
          </div>

          {/* 表格標題手機版 */}
          <div className="table-title-bg d-flex py-2 mb-2 d-none-min-md">
            <p className="col-table-6 p-nowrap text-center">品項</p>
            <p className="col-table-2 p-nowrap text-center">數量</p>
            <p className="col-table-2 p-nowrap text-center">單價</p>
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
        <div className="col-table-10 mt-16-sm">
          <div className="total-bg d-flex justify-content-between align-items-center py-9-5 px-5">
            <h6 className="col-table-5 text-start p-nowrap px-0-sm">
              訂單合計
            </h6>
            <p className="col-table-5 total-text fs-16-sm fw-bold text-end p-nowrap px-0-sm">
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
