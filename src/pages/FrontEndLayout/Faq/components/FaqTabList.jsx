import React from "react";

const FaqTabList = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "subscribe", label: "關於訂閱" },
    { id: "delivery", label: "關於配送" },
    { id: "payment", label: "付款與方案" },
    { id: "safety", label: "內容與安全" },
  ];

  return (
    <ul className="faq-tabs d-flex align-items-end">
      {tabs.map((tab) => (
        <li key={tab.id}>
          <div
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ cursor: "pointer" }}
          >
            {tab.label}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FaqTabList;
