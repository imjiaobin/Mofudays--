import { createHashRouter, Navigate } from "react-router-dom";

// layouts（ 這些檔案都要記得import並放 <Outlet /> ）
import FrontLayout from "./layout/FrontEndLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

// FrontLayout
import Home from "./pages/FrontEndLayout/Home/Home";
import FAQ from "./pages/FrontEndLayout/FAQ/FAQ";
import Blog from "./pages/FrontEndLayout/Blog/Blog";

import PetInfo from "./pages/FrontEndLayout/PetInfo/PetInfo";
import Plan from "./pages/FrontEndLayout/Plan/Plan";
import Cart from "./pages/FrontEndLayout/Cart/Cart";
import Checkout from "./pages/FrontEndLayout/Checkout/Checkout";
import Finish from "./pages/FrontEndLayout/Finish/Finish";

//usercenter
import UserCenter from "./pages/FrontEndLayout/UserCenter/UserCenter";
import UserProfile from "./pages/FrontEndLayout/UserCenter/UserProfile";
import OrderLists from "./pages/FrontEndLayout/UserCenter/OrderLists";
import MemberExclusives from "./pages/FrontEndLayout/UserCenter/MemberExclusive";
import MemberEvent1 from "./pages/FrontEndLayout/UserCenter/MemberEvent1";
import MemberEvent2 from "./pages/FrontEndLayout/UserCenter/MemberEvent2";
import MemberEvent3 from "./pages/FrontEndLayout/UserCenter/MemberEvent3";

//再次訂閱 功能測試頁
import ResubscribePreview from "./pages/FrontEndLayout/UserCenter/components/Resubscribepreview";

// Auth pages（ 會員/後台共用同一個 Login 頁面 ）
import Login from "./pages/FrontEndLayout/Login/Login";
import Signup from "./pages/FrontEndLayout/Signup/Signup";

// Admin pages（先做 placeholder 也行）
// 先放 Dashboard 占位，後續再補其他後台頁
import AdminDashboard from "./pages/BackEndLayout/Dashboard/Dashboard";

// 404
import NotFound from "./layout/NotFound";

//API測試頁
import TestAuthPage from "./pages/Test/TestAuthPage";

// auth hooks
import { useAuth } from "./features/auth/hooks";

// 前台會員權限守衛
function RequireAuth({ children }) {
  const { isAuthed, isLoading } = useAuth();

  // 1. 處理讀取中狀態：避免 API 還沒回傳時就執行 Navigate
  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        載入中...
      </div>
    );
  }

  // 2. 判斷是否登入：isAuthed 是基於 token 是否存在
  return isAuthed ? children : <Navigate to="/login" replace />;
}

//後台管理員權限守衛
function RequireAdmin({ children }) {
  const { isAuthed, user, isLoading } = useAuth();

  // 1. 處理讀取中狀態
  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        權限驗證中...
      </div>
    );
  }

  // 2. 權限判斷：user 是從 getUserProfile 回傳的，找不到會是 null
  const isAdmin = user?.role === "admin";

  // 如果已登入且是管理員，准許進入
  if (isAuthed && isAdmin) {
    return children;
  }

  // 3. 權限不符：跳轉回後台專用的登入路徑 /admin/login
  // 這樣能保持 mode="admin" 的一致性
  return <Navigate to="/login" replace />;
}

export const router = createHashRouter([
  // 前台（ FrontLayout ）
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "faq", element: <FAQ /> },
      { path: "blog", element: <Blog /> },
      // { path: "blog/:postId", element: <BlogPost /> },
      { path: "petinfo", element: <PetInfo /> },
      { path: "plan", element: <Plan /> },
      { path: "cart", element: <ResubscribePreview /> },
      { path: "checkout", element: <Checkout /> },
      { path: "finish", element: <Finish /> },

      //暫時移除權限方便測試
      // {
      //   path: "petinfo",
      //   element: (
      //     <RequireAuth>
      //       <PetInfo />
      //     </RequireAuth>
      //   ),
      // },
      // {
      //   path: "plan",
      //   element: (
      //     <RequireAuth>
      //       <Plan />
      //     </RequireAuth>
      //   ),
      // },
      // {
      //   path: "cart",
      //   element: (
      //     <RequireAuth>
      //       <Cart />
      //     </RequireAuth>
      //   ),
      // },
      // {
      //   path: "checkout",
      //   element: (
      //     <RequireAuth>
      //       <Checkout />
      //     </RequireAuth>
      //   ),
      // },
      // {
      //   path: "finish",
      //   element: (
      //     <RequireAuth>
      //       <Finish />
      //     </RequireAuth>
      //   ),
      // },

      // 會員中心
      {
        path: "usercenter",
        //會員中心暫時拿掉權限
        // element: (
        //   <RequireAuth>
        //     <UserCenter />
        //   </RequireAuth>
        // ),
        element: <UserCenter />,
        children: [
          // 預設進入會員中心時導向「會員資料」
          { index: true, element: <Navigate to="profile" replace /> },

          // 三個主要 Tab 頁面
          { path: "profile", element: <UserProfile /> },
          { path: "orders", element: <OrderLists /> },
          { path: "activities", element: <MemberExclusives /> },
        ],
      },

      // 三個活動詳情頁
      { path: "member-event-1", element: <MemberEvent1 /> },
      { path: "member-event-2", element: <MemberEvent2 /> },
      { path: "member-event-3", element: <MemberEvent3 /> },
    ],
  },

  // 登入/註冊（AuthLayout）
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      // 一般登入/註冊
      { path: "login", element: <Login mode="user" /> },
      { path: "signup", element: <Signup /> },

      // 後台登入： 同一個 Login 元件，只是 mode 不同
      { path: "admin/login", element: <Login mode="admin" /> },
    ],
  },

  // 後台（AdminLayout + RequireAdmin）
  {
    path: "/admin",
    //後台暫時拿掉權限
    // element: (
    //   <RequireAdmin>
    //     <AdminLayout />
    //   </RequireAdmin>
    // ),
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      // { path: "products", element: <AdminProducts /> },
      // { path: "orders", element: <AdminOrders /> },
    ],
  },

  //API測試頁
  {
    path: "/test",
    element: <TestAuthPage />,
  },

  // 404
  { path: "*", element: <NotFound /> },
]);
