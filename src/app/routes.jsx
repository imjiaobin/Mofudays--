import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

// pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Member from "../pages/Member/Member";

export const router = createBrowserRouter(
  [
    // 主站：有 Header/Footer
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },

        // 需要登入才看得到的頁面（放在 ProtectedRoute 下面）
        {
          element: <ProtectedRoute />,
          children: [
            { path: "/member/:id", element: <Member /> },
            { path: "orders", element: <div>Orders page</div> },
            { path: "coupons", element: <div>Coupons page</div> },
            { path: "member/exclusive", element: <div>Exclusive page</div> },
          ],
        },
      ],
    },

    // Auth：登入 / 註冊
    {
      element: <AuthLayout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ],
  {
    basename: "/mofudays-react",
  },
);
