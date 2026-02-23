const ActiveButtonPhone = ({ active1, active2, onBack, onSubmit }) => {
  return (
    <div className="text-center d-none-min-sm px-5-5-sm">
      <div className="row">
        <div className="col-6-sm">
          <button
            className="btn btn-primary rounded-pill btn-active-white ls-5 fs-18-sm fw-medium-sm px-38-sm"
            role="button"
            onClick={onBack}
          >
            {active1}
          </button>
        </div>
        <div className="col-6-sm">
          <button
            className="btn btn-primary rounded-pill btn-active ls-5 fs-18-sm fw-medium-sm px-38-sm"
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
