import React from "react";

const NewsModal = ({ onClose }) => {
  return (
    <div className="modal fade" id="newsModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content rounded-4">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
            <div>
              <h5 className="modal-title fw-bold">NEWS</h5>
              <p className="header-subtitle">汪汪來報：這個月的毛毛新鮮事！</p>
            </div>
          </div>
          <div className="modal-body">
            <div className="accordion" id="customAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    全新訂閱頁面上線啦！
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#customAccordion"
                >
                  <div className="accordion-body">
                    系統會更聰明地推薦合適方案。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
