import { filterOrdersByTab } from "./components/subscriptionHelpers";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "./components/MemberOrderCard";
import {
  getUserOrders,
  cancelSubscriptions,
  getUserDogs,
  addToCart,
} from "../../../api/Subscriptionapi";

import petToy from "../../../assets/images/userCenter/pet-toy.png";
import petSnack from "../../../assets/images/userCenter/pet_snack.png";

import { toast } from "react-toastify";

const TABS = [
  { key: "all", label: "訂閱總覽" },
  { key: "completed", label: "已完成" },
  { key: "processing", label: "進行中" },
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

  // ── 再次訂閱：選狗 modal state ───────────────────────────────
  const [resubscribeOrder, setResubscribeOrder] = useState(null); // 暫存待再訂閱的 order
  const [dogs, setDogs] = useState([]);
  const [selectedDogId, setSelectedDogId] = useState(null);
  const [isResubmitting, setIsResubmitting] = useState(false);

  // ── 取得訂單列表 ─────────────────────────────────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        toast.error(`操作失敗：${err.message || "請稍後再試"}`);
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
    if (cancellingId && cancellingId !== orderId) {
      setCancellingId(null);
      setSelectedItems([]);
    }
  };

  const handleStartCancel = (orderId) => {
    setCancellingId(orderId);
    setSelectedItems([]);
  };

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
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      setCancellingId(null);
      setSelectedItems([]);
    } catch (err) {
      toast.error(`操作失敗：${err.message || "請稍後再試"}`);
    }
  };

  // ── 再次訂閱：開啟選狗 modal ─────────────────────────────────
  const handleResubscribe = async (order) => {
    try {
      const dogList = await getUserDogs();
      if (!dogList || dogList.length === 0) {
        alert("找不到寵物資料，請先建立寵物檔案。");
        return;
      }
      setDogs(dogList);
      // 若只有一隻狗，直接預選
      setSelectedDogId(dogList.length === 1 ? dogList[0].id : null);
      setResubscribeOrder(order);
    } catch (err) {
      toast.error(`操作失敗：${err.message || "請稍後再試"}`);
    }
  };

  // ── 再次訂閱：確認選狗後寫入 cart ───────────────────────────
  const handleConfirmResubscribe = async () => {
    if (!selectedDogId || !resubscribeOrder) return;
    const dog = dogs.find((d) => d.id === selectedDogId);
    if (!dog) return;

    setIsResubmitting(true);
    try {
      // 只對非已取消的 subscriptions 新增購物車
      const activeSubs = resubscribeOrder.subscriptions.filter(
        (s) => s.subscriptionStatus !== "已取消",
      );
      await Promise.all(
        activeSubs.map((sub) => addToCart(sub, dog, resubscribeOrder.month)),
      );
      setResubscribeOrder(null);
      setSelectedDogId(null);
      navigate("/cart");
    } catch (err) {
      toast.error(`操作失敗：${err.message || "請稍後再試"}`);
    } finally {
      setIsResubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setResubscribeOrder(null);
    setSelectedDogId(null);
    setDogs([]);
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

      {/* 選狗 Modal（自訂 overlay，避免觸發全域 .modal 樣式） */}
      {resubscribeOrder && (
        <div
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "32px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            {/* 標題 */}
            <h5 className="fw-bold text-brown mb-1">選擇訂閱寵物</h5>
            <p className="p3 text-brown mb-3">
              請選擇這次再次訂閱要對應的寵物：
            </p>

            {/* 狗狗列表 */}
            <div className="d-flex flex-column gap-2 mb-4">
              {dogs.map((dog) => (
                <label
                  key={dog.id}
                  className={`d-flex align-items-center gap-3 p-3 rounded-3 border ${
                    selectedDogId === dog.id ? "border-orange" : "border-light"
                  }`}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedDogId === dog.id ? "#FFF5F0" : "#fff",
                  }}
                >
                  <input
                    type="radio"
                    name="dogSelect"
                    className="form-check-input mt-0"
                    checked={selectedDogId === dog.id}
                    onChange={() => setSelectedDogId(dog.id)}
                  />
                  <div>
                    <div className="fw-bold p2">{dog.name}</div>
                    <div className="p4 text-brown">
                      {dog.size === "S"
                        ? "小型犬"
                        : dog.size === "M"
                          ? "中型犬"
                          : "大型犬"}
                      ·{dog.ageLabel}
                      {dog.allergies?.length > 0 && (
                        <span>·過敏：{dog.allergies.join("、")}</span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* 按鈕 */}
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-gray rounded-pill px-4 b3"
                onClick={handleCloseModal}
              >
                取消
              </button>
              <button
                className={`btn btn-orange text-white rounded-pill px-4 b3 ${
                  !selectedDogId || isResubmitting ? "disabled" : ""
                }`}
                onClick={handleConfirmResubscribe}
                disabled={!selectedDogId || isResubmitting}
              >
                {isResubmitting ? "處理中..." : "確認並加入購物車"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
