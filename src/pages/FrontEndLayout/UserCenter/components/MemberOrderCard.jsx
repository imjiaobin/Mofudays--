import MemberOrderCardHeader from "./MemberOrderCardHeader";
import MemberOrderCardBody from "./MemberOrderCardBody";
import { deriveOrderStatus, getStatusType } from "./subscriptionHelpers";
import "../OrderLists.scss";

/**
 * MemberOrderCard（SubscriptionCard）
 *
 * Props:
 * - order           {object}   完整訂單資料（來自 API）
 * - isExpanded      {boolean}  是否展開
 * - isCancelling    {boolean}  是否進入取消流程
 * - selectedItems   {array}    勾選的 subscriptionId 陣列
 * - onToggleExpand  {function} () => void
 * - onStartCancel   {function} () => void
 * - onConfirmCancel {function} () => void
 * - onToggleItem    {function} (subscriptionId) => void
 * - onResubscribe   {function} () => void
 */
export default function MemberOrderCard({
  order,
  isExpanded,
  isCancelling,
  selectedItems = [],
  onToggleExpand,
  onStartCancel,
  onConfirmCancel,
  onToggleItem,
  onResubscribe,
}) {
  const derivedStatus = deriveOrderStatus(order.subscriptions);
  const statusType = getStatusType(derivedStatus);

  return (
    <div className="subscription-card">
      <MemberOrderCardHeader
        order={order}
        isExpanded={isExpanded}
        derivedStatus={derivedStatus}
        statusType={statusType}
        onClick={onToggleExpand}
      />

      {isExpanded && (
        <MemberOrderCardBody
          subscriptions={order.subscriptions}
          order={order}
          isCancelling={isCancelling}
          selectedItems={selectedItems}
          onToggleItem={onToggleItem}
          onStartCancel={onStartCancel}
          onConfirmCancel={onConfirmCancel}
          onResubscribe={onResubscribe}
        />
      )}
    </div>
  );
}
