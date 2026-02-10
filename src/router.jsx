import { createHashRouter, Navigate } from "react-router-dom";

// layouts（ 這些檔案都要記得import並放 <Outlet /> ）
<<<<<<< HEAD
import FrontLayout from "./layouts/FrontLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// FrontLayout
import Home from "../pages/FrontEndLayout/Home/Home";
import FAQ from "../pages/FrontEndLayout/FAQ/FAQ";
import Blog from "../pages/FrontEndLayout/Blog/Blog";
import BlogPost from "../pages/FrontEndLayout/Blog/BlogPost";
import Plan from "../pages/FrontEndLayout/Plan/Plan";
import Checkout from "../pages/FrontEndLayout/Checkout/Checkout";
import Finish from "../pages/FrontEndLayout/Finish/Finish";
import UserCenter from "../pages/FrontEndLayout/UserCenter/UserCenter";
import OrderList from "../pages/FrontEndLayout/OrderList/OrderList";
import Event from "../pages/FrontEndLayout/Event/Event";

// Auth pages（ 會員/後台共用同一個 Login 頁面 ）
import Login from "../pages/FrontEndLayout/Login/Login";
import Signup from "../pages/FrontEndLayout/Signup/Signup";

// Admin pages（先做 placeholder 也行）
// 先放 Dashboard 占位，後續再補其他後台頁
import AdminDashboard from "../pages/BackEndLayout/Dashboard/Dashboard";

// 404
import NotFound from "../pages/NotFound";

// auth hooks
import { useAuth } from "../features/auth/hooks";

// 前台會員權限：沒登入 => 去 /login 
=======
import FrontLayout from "./layout/FrontEndLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

// FrontLayout
import Home from "./pages/FrontEndLayout/Home/Home";
import FAQ from "./pages/FrontEndLayout/FAQ/FAQ";
import Blog from "./pages/FrontEndLayout/Blog/Blog";
import Plan from "./pages/FrontEndLayout/Plan/Plan";
import Checkout from "./pages/FrontEndLayout/Checkout/Checkout";
import Finish from "./pages/FrontEndLayout/Finish/Finish";
import UserCenter from "./pages/FrontEndLayout/UserCenter/UserCenter";
import OrderList from "./pages/FrontEndLayout/OrderList/OrderList";
// import Event from "./pages/Event/Event";

// Auth pages（ 會員/後台共用同一個 Login 頁面 ）
import Login from "./pages/FrontEndLayout/Login/Login";
import Signup from "./pages/FrontEndLayout/Signup/Signup";

// Admin pages（先做 placeholder 也行）
// 先放 Dashboard 占位，後續再補其他後台頁
import AdminDashboard from "./pages/BackEndLayout/Dashboard/Dashboard";

// 404
import NotFound from "./layout/NotFound";

// auth hooks
// import { useAuth } from "../features/auth/hooks";

// 前台會員權限：沒登入 => 去 /login
>>>>>>> feature/james
function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
}

/** 後台管理員權限：沒登入或不是 admin -> 去 /admin/login */
function RequireAdmin({ children }) {
  const { isAuthed, user } = useAuth();
  const isAdmin = Boolean(user?.role === "admin");
<<<<<<< HEAD
  return isAuthed && isAdmin ? children : <Navigate to="/admin/login" replace />;
=======
  return isAuthed && isAdmin ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
>>>>>>> feature/james
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
=======
>>>>>>> feature/james
      { path: "plan", element: <Plan /> },

      // 需要登入
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
        path: "member",
        element: (
          <RequireAuth>
            <UserCenter />
          </RequireAuth>
        ),
        children: [
          { index: true, element: <Navigate to="orders" replace /> },
          { path: "orders", element: <OrderList /> },
          { path: "activities", element: <Event /> },
        ],
      },
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
<<<<<<< HEAD
]);
=======
]);
>>>>>>> feature/james
