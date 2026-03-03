import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

import MemberOrderCard from "./components/MemberOrderCard";
import { filterOrdersByTab } from "./components/subscriptionHelpers";

import {
  fetchUserOrders,
  cancelOrderSubscriptions,
  fetchUserDogs,
  resubscribeToCart,
  selectOrders,
  selectDogs,
  selectOrderStatus,
  selectDogsStatus,
  selectResubStatus,
} from "../../../slices/orderSlice";

import "./OrderLists.scss";

const TABS = [
  { key: "all", label: "訂閱總覽" },
  { key: "completed", label: "已完成" },
  { key: "processing", label: "進行中" },
  { key: "cancelled", label: "已取消" },
];

const PAGE_SIZE = 5;

export default function OrderLists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Redux state ──────────────────────────────────────────────
  const orders = useSelector(selectOrders);
  const dogs = useSelector(selectDogs);
  const orderStatus = useSelector(selectOrderStatus);
  const dogsStatus = useSelector(selectDogsStatus);
  const resubStatus = useSelector(selectResubStatus);

  const isLoading = orderStatus === "loading";
  const isResubmitting = resubStatus === "loading";

  // ── Local UI state ───────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [resubscribeOrder, setResubscribeOrder] = useState(null);
  const [selectedDogId, setSelectedDogId] = useState(null);

  // ── 初始載入訂單 ─────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchUserOrders())
      .unwrap()
      .catch((msg) => toast.error(`載入失敗：${msg}`));
  }, [dispatch]);

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

  // ── Handlers ─────────────────────────────────────────────────
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
    if (!selectedItems.length) return;
    dispatch(
      cancelOrderSubscriptions({ orderId, subscriptionIds: selectedItems }),
    )
      .unwrap()
      .then(() => {
        setCancellingId(null);
        setSelectedItems([]);
      })
      .catch((msg) => toast.error(`操作失敗：${msg}`));
  };

  const handleResubscribe = async (order) => {
    dispatch(fetchUserDogs())
      .unwrap()
      .then((dogList) => {
        if (!dogList?.length) {
          alert("找不到寵物資料，請先建立寵物檔案。");
          return;
        }
        setSelectedDogId(dogList.length === 1 ? dogList[0].id : null);
        setResubscribeOrder(order);
      })
      .catch((msg) => toast.error(`操作失敗：${msg}`));
  };

  const handleConfirmResubscribe = () => {
    if (!selectedDogId || !resubscribeOrder) return;
    const dog = dogs.find((d) => d.id === selectedDogId);
    if (!dog) return;

    dispatch(resubscribeToCart({ order: resubscribeOrder, dog }))
      .unwrap()
      .then(() => {
        setResubscribeOrder(null);
        setSelectedDogId(null);
        navigate("/cart");
      })
      .catch((msg) => toast.error(`操作失敗：${msg}`));
  };

  const handleCloseModal = () => {
    setResubscribeOrder(null);
    setSelectedDogId(null);
  };

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="member-orderlist mt-32">
      <div className="member-orderlist__header">
        <h2 className="member-orderlist__title h2">訂閱管理</h2>
        <div className="member-orderlist__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`member-orderlist__tab-btn ${activeTab === tab.key ? "member-orderlist__tab-btn--active" : ""}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="member-orderlist__orange-box">
        <div className="member-orderlist__table-header">
          <span>訂閱時間</span>
          <span>訂單編號</span>
          <span>訂閱期數</span>
          <span>訂單金額</span>
          <span>訂單狀態</span>
          <span className="chevron-spacer" />
        </div>

        <div className="member-orderlist__card-list">
          {isLoading && (
            <div className="member-orderlist__loading">載入中...</div>
          )}

          {!isLoading && currentItems.length === 0 && (
            <div className="member-orderlist__empty">
              目前沒有符合的訂閱紀錄
            </div>
          )}

          {!isLoading &&
            currentItems.map((order) => (
              <MemberOrderCard
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

        <div className="member-orderlist__footer">
          <div className="member-orderlist__pagination">
            <button
              className="member-orderlist__page-btn member-orderlist__page-btn--arrow"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`member-orderlist__page-btn ${currentPage === i + 1 ? "member-orderlist__page-btn--active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="member-orderlist__page-btn member-orderlist__page-btn--arrow"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* 再次訂閱 Modal */}
      {resubscribeOrder && (
        <div className="resubscribe-modal" onClick={handleCloseModal}>
          <div
            className="resubscribe-modal__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="resubscribe-modal__title">選擇訂閱寵物</h5>
            <p className="resubscribe-modal__subtitle">
              請選擇這次再次訂閱要對應的寵物：
            </p>

            <div className="resubscribe-modal__dog-list">
              {dogsStatus === "loading" && <div>載入寵物資料中...</div>}
              {dogs.map((dog) => (
                <label
                  key={dog.id}
                  className={`resubscribe-modal__dog-item ${selectedDogId === dog.id ? "resubscribe-modal__dog-item--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="dogSelect"
                    className="resubscribe-modal__dog-radio"
                    checked={selectedDogId === dog.id}
                    onChange={() => setSelectedDogId(dog.id)}
                  />
                  <div>
                    <div className="resubscribe-modal__dog-name">
                      {dog.name}
                    </div>
                    <div className="resubscribe-modal__dog-meta">
                      {dog.size === "S"
                        ? "小型犬"
                        : dog.size === "M"
                          ? "中型犬"
                          : "大型犬"}
                      · {dog.ageLabel}
                      {dog.allergies?.length > 0 && (
                        <span> · 過敏：{dog.allergies.join("、")}</span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="resubscribe-modal__footer">
              <button
                className="subscription-card-body__btn subscription-card-body__btn--ghost"
                onClick={handleCloseModal}
              >
                取消
              </button>
              <button
                className="subscription-card-body__btn subscription-card-body__btn--primary"
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
