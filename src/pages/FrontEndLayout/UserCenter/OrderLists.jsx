import {
  filterOrdersByTab,
  buildResubscribePayload,
} from "./components/subscriptionHelpers";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "./components/MemberOrderCard";
import {
  getUserOrders,
  cancelSubscriptions,
} from "../../../api/subscriptionApi";

// 裝飾圖片路徑（路徑依專案實際位置調整）
import petToy from "../../../assets/images/userCenter/pet-toy.png";
import petSnack from "../../../assets/images/userCenter/pet_snack.png";

const TABS = [
  { key: "all", label: "訂閱總覽" },
  { key: "completed", label: "已完成" },
  { key: "processing", label: "進行中" },
  // { key: "partial", label: "部分取消" },
  { key: "cancelled", label: "已取消" },
];

const PAGE_SIZE = 5;

export default function OrderLists() {
  const navigate = useNavigate();

  // ── 資料 state ──────────────────────────────────────────────
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── UI state ────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // ── 取得訂單列表 ─────────────────────────────────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        setError("訂單資料載入失敗，請稍後再試。");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ── Tab 篩選 + 分頁 ──────────────────────────────────────────
  const filteredOrders = useMemo(
    () => filterOrdersByTab(orders, activeTab),
    [orders, activeTab],
  );

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE) || 1;

  const currentItems = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ── 事件 handlers ────────────────────────────────────────────

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setExpandedId(null);
    setCancellingId(null);
    setSelectedItems([]);
  };

  const handleToggleExpand = (orderId) => {
    setExpandedId((prev) => (prev === orderId ? null : orderId));
    // 切換卡片時清除取消流程
    if (cancellingId && cancellingId !== orderId) {
      setCancellingId(null);
      setSelectedItems([]);
    }
  };

  const handleStartCancel = (orderId) => {
    setCancellingId(orderId);
    setSelectedItems([]);
  };

  // 取消流程的返回：由 onToggleItem 用特殊 id 觸發
  const handleToggleItem = (subscriptionId) => {
    if (subscriptionId === "__cancel_mode_exit__") {
      setCancellingId(null);
      setSelectedItems([]);
      return;
    }
    setSelectedItems((prev) =>
      prev.includes(subscriptionId)
        ? prev.filter((id) => id !== subscriptionId)
        : [...prev, subscriptionId],
    );
  };

  const handleConfirmCancel = async (orderId) => {
    if (selectedItems.length === 0) return;
    try {
      const updated = await cancelSubscriptions(orderId, selectedItems);
      // 用更新後的資料取代本地對應訂單
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      setCancellingId(null);
      setSelectedItems([]);
    } catch (err) {
      alert("取消失敗，請稍後再試。");
    }
  };

  const handleResubscribe = (order) => {
    const payload = buildResubscribePayload(order);
    // 將資料存入 sessionStorage，讓 /cart 頁面取用
    sessionStorage.setItem("resubscribePayload", JSON.stringify(payload));
    navigate("/cart");
  };

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="member-orderlist mt-32">
      {/* 標題 + Tab 列 */}
      <div className="d-flex justify-content-between align-items-center mb-24">
        <h2 className="h2 fw-900">訂閱管理</h2>
        <ul className="nav nav-tabs border-0" id="myTab">
          {TABS.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link rounded-pill px-4 ms-2 border-0 ${
                  activeTab === tab.key
                    ? "bg-orange text-white active"
                    : "text-brown bg-transparent"
                }`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 欄位標題列 */}
      <div className="row text-center mb-3 px-4 fw-500 p2">
        <div className="col">訂閱時間</div>
        <div className="col">訂單編號</div>
        <div className="col">訂閱期數</div>
        <div className="col">訂單金額</div>
        <div className="col">訂單狀態</div>
      </div>

      {/* 訂閱卡片列表 */}
      <div className="subscription-list">
        {isLoading && (
          <div className="text-center py-5 text-brown">載入中...</div>
        )}
        {error && <div className="text-center py-5 text-danger">{error}</div>}
        {!isLoading && !error && currentItems.length === 0 && (
          <div className="text-center py-5 text-brown">
            目前沒有符合的訂閱紀錄
          </div>
        )}
        {!isLoading &&
          !error &&
          currentItems.map((order) => (
            <SubscriptionCard
              key={order.id}
              order={order}
              isExpanded={expandedId === order.id}
              isCancelling={cancellingId === order.id}
              selectedItems={selectedItems}
              onToggleExpand={() => handleToggleExpand(order.id)}
              onStartCancel={() => handleStartCancel(order.id)}
              onConfirmCancel={() => handleConfirmCancel(order.id)}
              onToggleItem={handleToggleItem}
              onResubscribe={() => handleResubscribe(order)}
            />
          ))}
      </div>

      {/* 裝飾圖片 */}
      <div className="d-flex justify-content-end align-items-end mt-16 me-32">
        <img
          src={petToy}
          alt="toy"
          className="img-shake me-16"
          style={{ width: "80px" }}
        />
        <img
          src={petSnack}
          alt="snack"
          className="img-shake"
          style={{ width: "100px" }}
        />
      </div>

      {/* 分頁 */}
      <nav className="mt-32">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link border-0 bg-transparent text-brown"
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item mx-1 ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className={`page-link rounded-2 border-0 ${
                  currentPage === i + 1
                    ? "bg-orange text-white"
                    : "bg-light text-brown"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link border-0 bg-transparent text-brown"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
