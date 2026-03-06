/* 
    功能: 取得 AdminDasboard 所需資料
    最新更新時間: 2025/03/05
    更新內容: 新增, 用於簡化 AdminDashboard.jsx 中 code 
    回傳值 : 訂單/訂閱/會員資料, API回傳狀態, 載入狀態, 
*/
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { adminToast, getErrorMessage } from "../utils/adminToast";

const API_BASE = import.meta.env.VITE_API_BASE;

export function useDashboardData() {
  const [orders, setOrders] = useState([]);               // 訂單資料 
  const [subscriptions, setSubscriptions] = useState([]); // 訂閱資料
  const [members, setMembers] = useState([]);             // 會員資料

  const [loading, setLoading] = useState(true);           // API回傳狀態
  const [refreshing, setRefreshing] = useState(false);    // 給資料重整用的狀態
  const [errorMsg, setErrorMsg] = useState("");           // 錯誤資料

  // 取得訂單/訂閱/會員資料 => 用 useCallback 避免每次畫面改變一直重新打 API
  const fetchDashboardData = useCallback(async () => {
    const [ordersRes, subsRes, usersRes] = await Promise.all([
      axios.get(`${API_BASE}/orders`),
      axios.get(`${API_BASE}/subscriptions`),
      axios.get(`${API_BASE}/users`, { params: { role: "user" } }),
    ]);

    return {
      // 這邊用 isArray 驗證, 避免回傳資料的問題浪費 debug 時間 
      orders: Array.isArray(ordersRes.data) ? ordersRes.data : [],
      subscriptions: Array.isArray(subsRes.data) ? subsRes.data : [],
      members: Array.isArray(usersRes.data) ? usersRes.data : [],
    };
  }, []);
  
  // 合併 初次載入資料 和 重新整理資料的狀態
  const load = useCallback(
    async (mode = "init") => {
      const isRefresh = mode === "refresh";

      const toastId = isRefresh
        ? adminToast.loading("重新整理儀表板資料中...")
        : null;

      try {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        setErrorMsg("");

        const data = await fetchDashboardData();

        setOrders(data.orders);
        setSubscriptions(data.subscriptions);
        setMembers(data.members);

        if (toastId) {
          adminToast.update(toastId, {
            type: "success",
            render: "儀表板資料已更新",
          });
        }
      } catch (error) {

        const message = getErrorMessage(error, "資料載入失敗，請稍後再試");
        setErrorMsg(message);

        if (toastId) {
          adminToast.update(toastId, { type: "error", render: message });
        } else {
          adminToast.error(message, { toastId: "dashboard-init-fail" });
        }
      } finally {

        if (isRefresh) setRefreshing(false);
        else setLoading(false);
      }
    },
    [fetchDashboardData],
  );

  useEffect(() => {
    load("init");
  }, [load]);

  return {
    orders,        // 訂單資料
    subscriptions, // 訂閱資料
    members,       // 會員資料
    loading,       // API回傳狀態
    errorMsg,      // API錯誤資訊
    refreshing,    // 資料重整狀態
    refresh: () => load("refresh"), // 給dashboard重新整理資料用
  };
}