import SubscriptionCardHeader from "./MemberOrderCardHeader";
import SubscriptionCardBody from "./MemberOrderCardBody";
import { deriveOrderStatus, getStatusType } from "./subscriptionHelpers";

/**
 * <SubscriptionCard></SubscriptionCard>
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
export default function SubscriptionCard({
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
    <div className="subscription-card-wrapper mb-16">
      <SubscriptionCardHeader
        order={order}
        isExpanded={isExpanded}
        derivedStatus={derivedStatus}
        statusType={statusType}
        onClick={onToggleExpand}
      />

      {isExpanded && (
        <SubscriptionCardBody
          subscriptions={order.subscriptions}
          perCycleAmount={order.perCycleAmount}
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
