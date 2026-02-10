import React from "react";
import FaqTabList from "./FaqTabList";

const FaqHeader = ({ activeTab, setActiveTab }) => {
  return (
    <section className="faq mb-5 mb-md-6">
      <div className="d-flex justify-content-between flex-wrap faq-header">
        <div className="faq-title mb-5 mb-md-0">
          <h2 className="mb-2">FAQ</h2>
          <p>常見問題， 解惑那些訂閱的大小事</p>
        </div>
        <FaqTabList activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </section>
  );
};

export default FaqHeader;
