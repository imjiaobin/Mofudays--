// localStorage 找不到時都會自動去 sessionStorage 找，配合登入的"記住我"功能
const _originalGetItem = localStorage.getItem.bind(localStorage);
localStorage.getItem = (key) => {
  return _originalGetItem(key) ?? sessionStorage.getItem(key);
};

import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import App from "./App";
import "./styles/global.scss";
import { Provider } from "react-redux";
import { store } from "./store";

// AOS
import AOS from "aos";
// swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

window.bootstrap = bootstrap;

AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
