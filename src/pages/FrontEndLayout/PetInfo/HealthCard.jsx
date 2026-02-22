const HealthCard = ({ healthId, healthImg, healthCare, checked, onChange }) => {
  return (
    <>
      <div className="card border-0 mb-8-sm">
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
          className="btn btn-health d-flex-sm align-item-center-sm px-5 py-5 p-16-sm"
          htmlFor={healthId}
        >
          <img
            src={healthImg}
            className="card-img-top rounded-4 radius-8-sm mb-2 mb-0-sm me-24-sm w-27-sm"
            alt={healthCare}
          />
          <div className="card-body p-0">
            <p className="text-start-sm">{healthCare}</p>
          </div>
        </label>
      </div>
    </>
  );
};

export default HealthCard;
