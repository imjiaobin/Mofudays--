import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Payment.scss";

function Payment() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 2500);
    const t2 = setTimeout(() => navigate(`/finish?orderId=${orderId}`), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [orderId, navigate]);

  return (
    <main className="payment py-11 py-80-sm">
      <div className="container">
        <div className="payment-content">
          {phase === 1 ? (
            <div className="payment-phase payment-phase--processing">
              <div className="payment-spinner" />
              <p className="payment-text">
                付款處理中
                <span className="payment-dots" />
              </p>
            </div>
          ) : (
            <div className="payment-phase payment-phase--confirmed">
              <svg viewBox="0 0 52 52" className="payment-check-svg">
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  className="payment-check-circle"
                />
                <path d="M14 27l8 8 16-16" className="payment-check-path" />
              </svg>
              <p className="payment-text payment-text--confirmed">已確認訂單</p>
              <p className="payment-subtext">即將跳轉至訂單明細...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Payment;
