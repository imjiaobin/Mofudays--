import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { AuthProvider } from "./contexts/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css"; // 引入Bootstrap 樣式 by 納森
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 引入Bootstrap JS  by 納森
import App from "./App"; // 確保路徑是對的
import "./styles/global.scss"; // 這是最重要的地基
                               // 原本的 all.scss => 註解 by 納森


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
