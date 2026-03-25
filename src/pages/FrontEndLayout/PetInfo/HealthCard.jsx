const HealthCard = ({ healthId, healthImg, healthCare, checked, onChange }) => {
  return (
    <>
      <div className="card border-0 mb-8-lg">
        <input
          type="radio"
          className="btn-check"
          name="health"
          id={healthId}
          autoComplete="off"
          checked={checked}
          onChange={onChange}
        />
        <label
          className="btn btn-health h-100 d-flex-lg align-item-center-lg px-5 py-5 p-16-lg p-8-md p-16-sm"
          htmlFor={healthId}
        >
          <img
            src={healthImg}
            className="card-img-top rounded-4 radius-8-sm w-30-lg w-27-sm mb-2 mb-0-lg me-24-lg"
            alt={healthCare}
          />
          <div className="card-body p-0">
            <p className="text-start-lg">{healthCare}</p>
          </div>
        </label>
      </div>
    </>
  );
};

export default HealthCard;
