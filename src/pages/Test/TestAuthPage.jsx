import React, { useState } from "react";
import * as userApi from "../../api/userApi"; // 確保路徑正確

const TestAuthPage = () => {
  const [status, setStatus] = useState("準備就緒");
  const [testResults, setTestResults] = useState({
    profile: null,
    orders: null,
    cart: null,
  });

  // 1. 測試註冊
  const handleRegister = async () => {
    setStatus("註冊中...");
    try {
      const newUser = {
        email: "james@example.com",
        password: "james123",
        name: "james",
        role: "admin", // 設為管理員進行測試
        isActive: true,
      };
      const data = await userApi.registerUser(newUser);
      console.log("註冊成功", data);
      setStatus("註冊成功！可以進行登入測試。");
    } catch (err) {
      setStatus(`註冊失敗: ${err}`);
    }
  };

  // 2. 測試一鍵登入並獲取所有 600 資料
  const handleFullTest = async () => {
    setStatus("登入中...");
    try {
      // A. 登入
      const authData = await userApi.loginUser({
        email: "amy@example.com",
        password: "amy123",
      });

      localStorage.setItem("accessToken", authData.accessToken);
      localStorage.setItem("userId", authData.user.id);

      setStatus("登入成功！正在抓取受保護資料...");

      // B. 平行抓取所有受保護資料
      const [profile, orders, cart] = await Promise.all([
        userApi.getUserProfile(),
        userApi.getUserOrders(),
        userApi.getUserCart(),
      ]);

      setTestResults({ profile, orders, cart });
      setStatus("測試完成！資料已渲染於下方。");
    } catch (err) {
      console.error(err);
      setStatus(`測試流程失敗: ${err}`);
    }
  };

  // 清除資料測試
  const handleLogout = () => {
    localStorage.clear();
    setTestResults({ profile: null, orders: null, cart: null });
    setStatus("已登出並清除資料");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>API 測試頁</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleRegister}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          1. 註冊會員
        </button>
        <button
          onClick={handleFullTest}
          style={{
            padding: "8px",
            background: "#4caf50",
            color: "#fff",
            marginRight: "10px",
          }}
        >
          2. 登入並獲取所有資料 (Profile/Orders/Cart)
        </button>
        <button
          onClick={handleLogout}
          style={{ padding: "8px", background: "#f44336", color: "#fff" }}
        >
          清除 LocalStorage
        </button>
      </div>

      <div
        style={{
          padding: "10px",
          background: "#333",
          color: "#fff",
          borderRadius: "4px",
        }}
      >
        <strong>當前狀態：</strong> {status}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <section>
          <h4>👤 會員資料 (Profile)</h4>
          <pre style={resultStyle}>
            {JSON.stringify(testResults.profile, null, 2)}
          </pre>
          <p>
            Role 驗證: <strong>{testResults.profile?.role || "N/A"}</strong>
          </p>
        </section>

        <section>
          <h4>📦 訂單紀錄 (Orders)</h4>
          <pre style={resultStyle}>
            {JSON.stringify(testResults.orders, null, 2)}
          </pre>
        </section>

        <section>
          <h4>🛒 購物車內容 (Cart)</h4>
          <pre style={resultStyle}>
            {JSON.stringify(testResults.cart, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
};

const resultStyle = {
  background: "#f5f5f5",
  padding: "10px",
  borderRadius: "5px",
  maxHeight: "400px",
  overflow: "auto",
  border: "1px solid #ddd",
  fontSize: "12px",
};

export default TestAuthPage;
