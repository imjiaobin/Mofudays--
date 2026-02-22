const PlanCard = ({
  id,
  title,
  price,
  text,
  content,
  selectedPlan,
  onSelect,
}) => {
  const isSelected = selectedPlan === id;
  return (
    <div
      className="btn-group w-100-sm"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="recommended-plan"
        id={id}
        autoComplete="off"
        onChange={() => onSelect(id)}
      />
      <label
        className="btn btn-primary btn-plan fw-normal py-5 px-5"
        htmlFor={id}
      >
        <div className="d-flex justify-content-between mb-2">
          <p className="fs-6 fw-bold">{title}</p>
          <p className="total-text text-end fs-14">
            <span className="plan-price fw-medium pe-1">${price}</span>
            /月
          </p>
        </div>
        <p className="text-brown-300 text-start mb-4">{text}</p>

        {isSelected && (
          <>
            <div className="d-flex justify-content-between align-item-center mb-4">
              <div className="include-line my-10-5"></div>
              <p className="fs-14 text-brown-100 mx-5">包含</p>
              <div className="include-line my-10-5"></div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-brown-300">零食</p>
              <div className="number-box fw-medium">
                x{content?.treats ?? 0}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-brown-300">保健罐頭</p>
              <div className="number-box fw-medium">
                x{content?.household ?? 0}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-brown-300">互動小玩具</p>
              <div className="number-box fw-medium">x{content?.toys ?? 0}</div>
            </div>
          </>
        )}
      </label>
    </div>
  );
};

export default PlanCard;
