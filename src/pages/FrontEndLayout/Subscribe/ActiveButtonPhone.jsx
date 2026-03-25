const ActiveButtonPhone = ({
  active1,
  active2,
  active3,
  onBack,
  onSubmit,
  onExtra,
}) => {
  return (
    <div className="text-center d-none-min-sm px-5-5-sm">
      <div className="row">
        {active3 && (
          <div className="col-12 mb-3">
            <button
              className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm w-100"
              role="button"
              onClick={onExtra}
            >
              {active3}
            </button>
          </div>
        )}
        {active1 && (
          <div className="col-12 mb-3">
            <button
              className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm w-100"
              role="button"
              onClick={onBack}
            >
              {active1}
            </button>
          </div>
        )}
        <div className="col-12">
          <button
            className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm w-100"
            role="button"
            onClick={onSubmit}
          >
            {active2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveButtonPhone;
