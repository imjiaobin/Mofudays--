import "../OrderLists.scss";

export default function MemberOrderCardHeader({
  order,
  isExpanded,
  derivedStatus,
  statusType,
  onClick,
}) {
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return isoString.slice(0, 10).replace(/-/g, "/");
  };

  return (
    <div
      className={`subscription-card-header ${isExpanded ? "subscription-card-header--expanded" : ""}`}
      onClick={onClick}
    >
      {/* ── 桌機版：橫排五欄 ── */}
      <div className="subscription-card-header__desktop">
        <div className="subscription-card-header__col subscription-card-header__col--date">
          {formatDate(order.orderDate)}
        </div>
        <div className="subscription-card-header__col subscription-card-header__col--id">
          {order.id}
        </div>
        <div className="subscription-card-header__col">{order.month} 個月</div>
        <div className="subscription-card-header__col subscription-card-header__col--amount">
          NT$ {order.orderTotalAmount?.toLocaleString() ?? "-"}
        </div>
        <div className="subscription-card-header__col subscription-card-header__col--status">
          <span
            className={`subscription-card-header__badge subscription-card-header__badge--${statusType}`}
          >
            {derivedStatus}
          </span>
        </div>
        <div
          className={`subscription-card-header__chevron ${isExpanded ? "subscription-card-header__chevron--expanded" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── 手機版：直排 label/value + 展開文字按鈕 ── */}
      <div className="subscription-card-header__mobile">
        <div className="subscription-card-header__mobile-row">
          <span className="subscription-card-header__mobile-label">
            訂閱時間
          </span>
          <span className="subscription-card-header__mobile-value">
            {formatDate(order.orderDate)}
          </span>
        </div>
        <div className="subscription-card-header__mobile-row">
          <span className="subscription-card-header__mobile-label">
            訂單編號
          </span>
          <span className="subscription-card-header__mobile-value subscription-card-header__mobile-value--id">
            {order.id}
          </span>
        </div>
        <div className="subscription-card-header__mobile-row">
          <span className="subscription-card-header__mobile-label">
            訂閱期數
          </span>
          <span className="subscription-card-header__mobile-value">
            {order.month} 個月
          </span>
        </div>
        <div className="subscription-card-header__mobile-row">
          <span className="subscription-card-header__mobile-label">
            訂單金額
          </span>
          <span className="subscription-card-header__mobile-value subscription-card-header__mobile-value--amount">
            NT$ {order.orderTotalAmount?.toLocaleString() ?? "-"}
          </span>
        </div>
        <div className="subscription-card-header__mobile-row">
          <span className="subscription-card-header__mobile-label">
            訂單狀態
          </span>
          <span
            className={`subscription-card-header__badge subscription-card-header__badge--${statusType}`}
          >
            {derivedStatus}
          </span>
        </div>

        {/* 展開 / 收合 文字按鈕 */}
        <div className="subscription-card-header__mobile-toggle">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            className={`subscription-card-header__mobile-chevron ${isExpanded ? "subscription-card-header__mobile-chevron--expanded" : ""}`}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#FC762F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{isExpanded ? "收合詳細內容" : "展開詳細內容"}</span>
        </div>
      </div>
    </div>
  );
}
