const ActiveButtonWeb = ({
  active1,
  active2,
  active3,
  onBack,
  onSubmit,
  onExtra,
}) => {
  return (
    <div className="text-center d-none-sm">
      {active3 && (
        <button
          className={`btn btn-primary rounded-pill btn-active-white fs-20-md fw-medium-sm ls-10-sm px-40 ${active2 ? "me-6 me-24-sm" : ""}`}
          role="button"
          onClick={onExtra}
        >
          {active3}
        </button>
      )}
      {active1 && (
        <button
          className="btn btn-primary rounded-pill btn-active-white fs-20-md fw-medium-sm ls-10-sm px-40 me-6 me-24-sm"
          role="button"
          onClick={onBack}
        >
          {active1}
        </button>
      )}
      {active2 && (
        <button
          className="btn btn-primary rounded-pill btn-active fs-20-md fw-medium-sm ls-10-sm px-40"
          role="button"
          onClick={onSubmit}
        >
          {active2}
        </button>
      )}
    </div>
  );
};

export default ActiveButtonWeb;
