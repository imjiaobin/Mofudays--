import { createHashRouter, Navigate } from "react-router-dom";

// layouts（ 這些檔案都要記得import並放 <Outlet /> ）
import FrontLayout from "./layout/FrontEndLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
// FrontLayout
<<<<<<< HEAD
import Home from "../pages/FrontEndLayout/Home/Home";
import FAQ from "../pages/FrontEndLayout/FAQ/FAQ";
import Blog from "../pages/FrontEndLayout/Blog/Blog";
import BlogPost from "../pages/FrontEndLayout/Blog/BlogPost";
import PetInfo from "../pages/FrontEndLayout/PetInfo/PetInfo.jsx";
import Plan from "../pages/FrontEndLayout/Plan/Plan";
import Checkout from "../pages/FrontEndLayout/Checkout/Checkout";
import Finish from "../pages/FrontEndLayout/Finish/Finish";
import UserCenter from "../pages/FrontEndLayout/UserCenter/UserCenter";
import OrderList from "../pages/FrontEndLayout/OrderList/OrderList";
import Event from "../pages/FrontEndLayout/Event/Event";
=======
import Home from "./pages/FrontEndLayout/Home/Home";
import FAQ from "./pages/FrontEndLayout/FAQ/FAQ";
import Blog from "./pages/FrontEndLayout/Blog/Blog";
import Plan from "./pages/FrontEndLayout/Plan/Plan";
import Checkout from "./pages/FrontEndLayout/Checkout/Checkout";
import Finish from "./pages/FrontEndLayout/Finish/Finish";
import UserCenter from "./pages/FrontEndLayout/UserCenter/UserCenter";
import PetInfo from "./pages/FrontEndLayout/PetInfo/PetInfo";

//usercenter
import UserProfile from "./pages/FrontEndLayout/UserCenter/UserProfile";
import OrderLists from "./pages/FrontEndLayout/UserCenter/OrderLists";
import MemberExclusives from "./pages/FrontEndLayout/UserCenter/MemberExclusive";
import MemberEvent1 from "./pages/FrontEndLayout/UserCenter/MemberEvent1";
import MemberEvent2 from "./pages/FrontEndLayout/UserCenter/MemberEvent2";
import MemberEvent3 from "./pages/FrontEndLayout/UserCenter/MemberEvent3";
>>>>>>> dev

// Auth pages（ 會員/後台共用同一個 Login 頁面 ）
import Login from "./pages/FrontEndLayout/Login/Login";
import Signup from "./pages/FrontEndLayout/Signup/Signup";

// Admin pages（先做 placeholder 也行）
// 先放 Dashboard 占位，後續再補其他後台頁
import AdminDashboard from "./pages/BackEndLayout/Dashboard/Dashboard";

// 404
import NotFound from "./layout/NotFound";

// auth hooks
import { useAuth } from "./features/auth/hooks";

// 前台會員權限：沒登入 => 去 /login
function RequireAuth({ children }) {
  const { isAuthed } = useAuth();

  // 如果沒登入，強制跳轉到登入頁，並記錄原本想去的頁面 (replace: true)
  return isAuthed ? children : <Navigate to="/login" replace />;
}

/** 後台管理員權限：沒登入或不是 admin -> 去 /admin/login */
function RequireAdmin({ children }) {
  const { isAuthed, user } = useAuth();
  const isAdmin = Boolean(user?.role === "admin");
  return isAuthed && isAdmin ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
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
<<<<<<< HEAD
      { path: "blog/:postId", element: <BlogPost /> },
      { path: "petinfo", element: <PetInfo /> },
=======
      // { path: "blog/:postId", element: <BlogPost /> },
>>>>>>> dev
      { path: "plan", element: <Plan /> },
      {
        path: "petinfo",
        element: (
          <RequireAuth>
            <PetInfo />
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
        element: (
          <RequireAuth>
            <UserCenter />
          </RequireAuth>
        ),
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
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      // { path: "products", element: <AdminProducts /> },
      // { path: "orders", element: <AdminOrders /> },
    ],
  },

  // 404
  { path: "*", element: <NotFound /> },
]);
