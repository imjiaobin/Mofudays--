import serviceStep1 from "../../../assets/images/subscribe/service_step_1.svg";
import serviceStep2 from "../../../assets/images/subscribe/service_step_2.svg";
import serviceStep3 from "../../../assets/images/subscribe/service_step_3.svg";

const CheckoutProgressBar = ({ title, subtitle, step = 1, className = "" }) => {
  return (
    <div
      className={`progressbar-2 d-flex justify-content-between align-items-center px-110 px-60-lg px-24-sm mb-6 mb-24-sm ${className}`}
    >
      {/* 標題 */}
      <div className="title py-5-5-md mb-32-md">
        <h2 className="fw-bold text-center-lg">{title}</h2>
        {subtitle && <h2 className="fw-bold text-center-lg">{subtitle}</h2>}
      </div>

      {/* 進度條 */}
      <div className="step d-flex justify-content-center align-items-center align-item-start-sm">
        <div className="step-item">
          <img
            src={serviceStep1}
            alt="step_1"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14">購物車</p>
        </div>
        <div className={`step-line${step < 2 ? " disabled" : ""}`}></div>
        <div className={`step-item${step < 2 ? " disabled" : ""}`}>
          <img
            src={serviceStep2}
            alt="step_2"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14 d-none-sm">訂單確認與結帳</p>
          <p className="text-center fs-14 d-none-min-sm">
            訂單確認
            <br />
            與結帳
          </p>
        </div>
        <div className={`step-line${step < 3 ? " disabled" : ""}`}></div>
        <div className={`step-item${step < 3 ? " disabled" : ""}`}>
          <img
            src={serviceStep3}
            alt="step_3"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14">完成訂閱</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgressBar;
