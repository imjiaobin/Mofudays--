const CartCardWeb = ({
  productImg,
  title,
  price,
  quantity,
  total,
  content,
  onDelete,
  onDecrease,
  onIncrease,
}) => {
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
            <p className="table-text fw-normal mb-1">
              零食 x {content?.snacks?.length ?? 0}
            </p>
            <p className="table-text fw-normal mb-1">
              保健罐頭 x {content?.household?.length ?? 0}
            </p>
            <p className="table-text fw-normal mb-1">
              互動小物 x {content?.toys?.length ?? 0}
            </p>
          </div>
        </div>

        {/* 單價 */}
        <div className="col-table-1 d-flex justify-content-center align-items-center">
          ${price}
        </div>

        {/* 數量 */}
        <div className="col-table-2 d-flex align-items-center">
          <div className="input-group px-4" style={{ height: "48px" }}>
            <button
              className="btn btn-quantity px-4 py-3"
              type="button"
              onClick={onDecrease}
            >
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
            <button
              className="btn btn-quantity px-4 py-3"
              type="button"
              onClick={onIncrease}
            >
              ＋
            </button>
          </div>
        </div>

        {/* 小計 */}
        <div className="col-table-1 d-flex justify-content-center align-items-center">
          ${total}
        </div>

        {/* 刪除 */}
        <div className="col-table-1 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onDelete}
          ></button>
        </div>
      </div>
    </>
  );
};

export default CartCardWeb;
