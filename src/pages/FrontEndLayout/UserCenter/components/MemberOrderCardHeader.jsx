/**
 * SubscriptionCardHeader
 *
 * Props:
 * - order          {object}   完整訂單資料（來自 API）
 * - isExpanded     {boolean}  是否展開
 * - derivedStatus  {string}   由父層計算好的訂單狀態文字（已完成／進行中／已取消／部分取消）
 * - statusType     {string}   對應 className 的狀態 key
 * - onClick        {function} 點擊展開/收合
 */
export default function SubscriptionCardHeader({
  order,
  isExpanded,
  derivedStatus,
  statusType,
  onClick,
}) {
  const termCycles = order.month ?? "-";

  // 日期格式化：ISO → YYYY/MM/DD
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return isoString.slice(0, 10).replace(/-/g, "/");
  };

  return (
    <div
      className="subscription-card-header row text-center align-items-center py-3 px-4 border"
      style={{
        backgroundColor: isExpanded ? "#FFF5F0" : "#F5F5F5",
        borderColor: isExpanded ? "#FFE0D0" : "#E0E0E0",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        borderRadius: isExpanded ? "24px 24px 0 0" : "24px",
        position: "relative",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <div className="col p2 text-brown">{formatDate(order.orderDate)}</div>
      <div className="col p2 fw-bold text-dark">#{order.id}</div>
      <div className="col p2">{termCycles} 個月</div>
      <div className="col p2 fw-bold">
        ${order.orderTotalAmount?.toLocaleString() ?? "-"}
      </div>
      <div
        className="col p2 fw-bold"
        style={{
          color:
            {
              completed: "#4CAF50",
              processing: "#FF9800",
              cancelled: "#F44336",
              partial: "#FF9800",
            }[statusType] ?? "inherit",
        }}
      >
        {derivedStatus}
        <i className={`bi bi-chevron-${isExpanded ? "up" : "down"} ms-2`}></i>
      </div>
    </div>
  );
}
