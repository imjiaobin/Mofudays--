import { createHashRouter, Navigate, Outlet } from "react-router-dom";

// layouts（ 這些檔案都要記得import並放 <Outlet /> ）
import FrontLayout from "./layout/FrontEndLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminAuthLayout from "./layout/AdminAuthLayout";
// 2026/02/17 納森新增, 避免登入後台頁面後, 仍保留前台頁面之 header 和 footer

// FrontLayout
import Home from "./pages/FrontEndLayout/Home/Home";
import FAQ from "./pages/FrontEndLayout/FAQ/Faq";
import Blog from "./pages/FrontEndLayout/Blog/Blog";
import PetInfo from "./pages/FrontEndLayout/PetInfo/PetInfo";
import Plan from "./pages/FrontEndLayout/Plan/Plan";
import Cart from "./pages/FrontEndLayout/Cart/Cart";
import Checkout from "./pages/FrontEndLayout/Checkout/Checkout";
import Payment from "./pages/FrontEndLayout/Checkout/Payment";
import Finish from "./pages/FrontEndLayout/Finish/Finish";

//usercenter
import UserCenterLayout from "./pages/FrontEndLayout/UserCenter/UserCenterLayout";
import UserProfile from "./pages/FrontEndLayout/UserCenter/UserProfile";
import OrderLists from "./pages/FrontEndLayout/UserCenter/OrderLists";
import MemberExclusives from "./pages/FrontEndLayout/UserCenter/MemberExclusive";
import MemberEvent1 from "./pages/FrontEndLayout/UserCenter/MemberEvent1";
import MemberEvent2 from "./pages/FrontEndLayout/UserCenter/MemberEvent2";
import MemberEvent3 from "./pages/FrontEndLayout/UserCenter/MemberEvent3";

// Auth pages
import Login from "./pages/FrontEndLayout/Login/Login";
import Signup from "./pages/FrontEndLayout/Signup/Signup";

// import AdminDashboard from "./pages/BackEndLayout/AdminDashboard/AdminDashboard";
import {
  AdminLogin,
  AdminDashboard,
  AdminOrders,
  AdminSubscriptions,
  AdminInfos,
  AdminUsers,
  AdminPlans,
  AdminToys,
  AdminTreats,
  AdminHousehold,
} from "./pages/BackEndLayout/adminRouterIndex";

// 404
import NotFound from "./layout/NotFound";

//前台權限守衛
import RequireAuth from "./components/RequireAuth";

//後台管理員權限守衛
import RequireAdmin from "./components/RequireAdmin";

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
      // { path: "petinfo", element: <PetInfo /> },
      // { path: "plan", element: <Plan /> },
      // { path: "cart", element: <Cart /> },
      // { path: "checkout", element: <Checkout /> },
      // { path: "finish", element: <Finish /> },

      //加回前台權限守衛
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
        path: "payment",
        element: (
          <RequireAuth>
            <Payment />
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
        element: (
          <RequireAuth>
            <UserCenterLayout />
          </RequireAuth>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <UserProfile /> },
          { path: "orders", element: <OrderLists /> },
          { path: "events", element: <MemberExclusives /> },
        ],
      },

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
      {
        element: <AdminAuthLayout />,
        children: [{ path: "login", element: <AdminLogin /> }],
      },
      {
        element: (
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },

          // 訂單管理群組
          {
            path: "orders",
            element: <Outlet />,
            children: [
              { index: true, element: <AdminOrders /> },
              { path: "plans", element: <AdminPlans /> },
              { path: "subscriptions", element: <AdminSubscriptions /> },
            ],
          },

          // 會員管理群組
          {
            path: "users",
            element: <Outlet />,
            children: [{ index: true, element: <AdminUsers /> }],
          },

          // 管理員管理群組
          {
            path: "admins",
            element: <Outlet />,
            children: [{ index: true, element: <AdminInfos /> }],
          },

          // 庫存管理群組
          {
            path: "inventory",
            element: <Outlet />,
            children: [
              { index: true, element: <Navigate to="toys" replace /> },
              { path: "toys", element: <AdminToys /> },
              { path: "treats", element: <AdminTreats /> },
              { path: "household", element: <AdminHousehold /> },
            ],
          },
        ],
      },
    ],
  },
  // 404
  { path: "*", element: <NotFound /> },
]);
