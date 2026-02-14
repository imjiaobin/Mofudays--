import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css"; // 引入Bootstrap 樣式 by 納森
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 引入Bootstrap JS  by 納森
import App from "./App"; // 確保路徑是對的
import { BrowserRouter } from "react-router-dom";
import "./styles/global.scss"; // 這是最重要的地基
// 原本的 all.scss => 註解 by 納森

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
>>>>>>> dev
  </React.StrictMode>,
);
