import { createHashRouter, Navigate } from "react-router-dom";

// layouts（ 這些檔案都要記得import並放 <Outlet /> ）
import FrontLayout from "./layout/FrontEndLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminAuthLayout from "./layout/AdminAuthLayout";
// 2026/02/17 納森新增, 避免登入後台頁面後, 仍保留前台頁面之 header 和 footer

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

// Auth pages（ 會員/後台共用同一個 Login 頁面 ）
import Login from "./pages/FrontEndLayout/Login/Login";
import Signup from "./pages/FrontEndLayout/Signup/Signup";

// Admin pages（先做 placeholder 也行）
// 先放 Dashboard 占位，後續再補其他後台頁
// import AdminDashboard from "./pages/BackEndLayout/AdminDashboard/AdminDashboard";
import {
  AdminLogin,
  AdminDashboard,
  AdminOrders,
  AdminSubscriptions,
  AdminInfos,
  AdminUsers,
} from "./pages/BackEndLayout/adminRouterIndex";

// 404
import NotFound from "./layout/NotFound";

//API測試頁
// import TestAuthPage from "./pages/Test/TestAuthPage";

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
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectIsAdminAuthed } from "./slices/adminAuthSlice";
export default function RequireAdmin({ children }) {
  const isAuthed = useSelector(selectIsAdminAuthed);
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
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
      {
        path: "petinfo",
        element: (
          <RequireAuth>
            <PetInfo />
          </RequireAuth>
        ),
      },
      {
        path: "plan",
        element: (
          <RequireAuth>
            <Plan />
          </RequireAuth>
        ),
      },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <Cart />
          </RequireAuth>
        ),
      },
      {
        path: "checkout",
        element: (
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        ),
      },
      {
        path: "finish",
        element: (
          <RequireAuth>
            <Finish />
          </RequireAuth>
        ),
      },

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
          {
            path: "events",
            element: <MemberExclusives />,
          },
        ],
      },
      // {
      //   path: "usercenter",
      //   element: <UserCenter />,
      //   children: [
      //     { index: true, element: <Navigate to="profile" replace /> },
      //     { path: "profile", element: <UserProfile /> },
      //     { path: "orders", element: <OrderLists /> },
      //     { path: "events", element: <MemberExclusives /> },
      //   ]
      // },

      // 三個活動詳情頁
      { path: "member-event-1", element: <MemberEvent1 /> },
      { path: "member-event-2", element: <MemberEvent2 /> },
      { path: "member-event-3", element: <MemberEvent3 /> },
    ],
  },

  // 前台 登入/註冊（AuthLayout）
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login mode="user" /> },
      { path: "signup", element: <Signup /> },
    ],
  },

  // 後台登入頁面 (AdminAuthLayout)
  {
    path: "/admin",
    children: [
      // 後台登入
      {
        element: <AdminAuthLayout />,
        children: [{ path: "login", element: <AdminLogin /> }],
      },

      // 後台入口
      {
        element: (
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "subscriptions", element: <AdminSubscriptions /> },
          { path: "admins", element: <AdminInfos /> },
          { path: "users", element: <AdminUsers /> },
          // { path: "notifications", element: <AdminNotifications /> },
          // { path: "settings", element: <AdminSettings /> },
        ],
      },
    ],
  },
  //API測試頁
  // {
  //   path: "/test",
  //   element: <TestAuthPage />,
  // },

  // 404
  { path: "*", element: <NotFound /> },
]);
