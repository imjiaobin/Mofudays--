const CartCardPhone = ({
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
      <div className="px-16-sm">
        <div className="table-container-bg p-16-sm mb-8-sm d-none-min-sm">
          {/* 圖片+品項+關閉+單價 */}
          <div className="d-flex justify-content-between align-items-center mb-16-sm">
            {/* 圖片+品項 */}
            <div className="d-flex align-items-center">
              <img
                src={productImg}
                alt="新手爸媽安心組"
                className="table-img rounded-4 me-5"
              />
              <div className="py-8-sm">
                <p className="table-title fw-bold mb-8-sm">{title}</p>
                <p className="table-text fw-normal">
                  零食 x {content?.snacks?.length ?? 0}
                </p>
                <p className="table-text fw-normal">
                  保健罐頭 x {content?.household?.length ?? 0}
                </p>
                <p className="table-text fw-normal">
                  互動小物 x {content?.toys?.length ?? 0}
                </p>
              </div>
            </div>

            {/* 刪除+單價 */}
            <div className="d-flex flex-column align-items-center">
              <button
                type="button"
                className="btn-close p-14-sm mb-24-sm"
                aria-label="Close"
                onClick={onDelete}
              ></button>
              <p className="text-center text-brown-300 mb-3">${price}</p>
            </div>
          </div>

          {/* 數量+小計 */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center w-40-sm">
              <div className="input-group">
                <button
                  className="btn btn-quantity px-3 py-3"
                  type="button"
                  onClick={onDecrease}
                >
                  －
                </button>
                <input
                  type="text"
                  className="form-control text-center input-number fs-14-sm px-0"
                  value={quantity}
                  readOnly
                  tabIndex="-1"
                  aria-label="Example text with two button addons"
                />
                <button
                  className="btn btn-quantity px-3 py-3"
                  type="button"
                  onClick={onIncrease}
                >
                  ＋
                </button>
              </div>
            </div>
            <p className="text-center">小計 ${total}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCardPhone;
