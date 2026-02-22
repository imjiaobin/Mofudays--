const ActiveButtonWeb = ({ active1, active2, onBack, onSubmit }) => {
  return (
    <div className="text-center d-none-sm">
      <button
        className="btn btn-primary rounded-pill btn-active-white fs-18-sm fw-medium-sm ls-10-sm px-40 me-6 me-24-sm"
        role="button"
        onClick={onBack}
      >
        {active1}
      </button>
      <button
        className="btn btn-primary rounded-pill btn-active fs-18-sm fw-medium-sm ls-10-sm px-40"
        role="button"
        onClick={onSubmit}
      >
        {active2}
      </button>
    </div>
  );
};

export default ActiveButtonWeb;
