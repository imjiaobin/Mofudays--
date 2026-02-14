import serviceStep1 from "../../assets/images/subscribe/service_step_1.svg";
import serviceStep2 from "../../assets/images/subscribe/service_step_2.svg";

const ProgressBar1 = () => {
  return (
    <div className="d-flex justify-content-between align-items-center flex-col-sm px-110 px-24-sm mb-6 mb-24-sm">
      {/* 標題 */}
      <div className="title py-5-5-sm mb-32-sm">
        <h2 className="fw-bold mb-2 text-center-sm">簡單 2 步驟</h2>
        <p className="fw-bold text-center-sm">為毛孩送上每月一盒溫暖心意</p>
      </div>

      {/* 進度條 */}
      <div className="step d-flex align-items-center align-item-start-sm">
        <div className="step-item">
          <img
            src={serviceStep1}
            alt="step_1"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14">填寫毛孩資料</p>
        </div>
        <div className="step-line disabled"></div>
        <div className="step-item disabled">
          <img
            src={serviceStep2}
            alt="step_2"
            className="mx-auto d-block mb-2 mb-10-sm"
          />
          <p className="text-center fs-14">查看方案</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar1;
