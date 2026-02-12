import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // 引入Bootstrap JS  by 納森 
import App from "./App"; // 確保路徑是對的
import "./styles/global.scss"; // 這是最重要的地基
                               // 原本的 all.scss => 註解 by 納森
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
