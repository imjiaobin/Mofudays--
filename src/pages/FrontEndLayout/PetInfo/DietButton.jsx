const DietButton = ({
  dietId,
  ingredients,
  icon,
  svg,
  checked,
  onChange,
  disabled,
}) => {
  return (
    <>
      <div
        className="btn-group w-100-sm"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check"
          name="pet-diet"
          id={dietId}
          autoComplete="off"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <label className="btn btn-primary btn-diet py-3 px-5" htmlFor={dietId}>
          <div className="d-flex justify-content-between align-items-center">
            <p>{ingredients}</p>
            <p className={icon}></p>
            {svg}
          </div>
        </label>
      </div>
    </>
  );
};

export default DietButton;
