import { configureStore } from "@reduxjs/toolkit";

//前台管理系統
import userAuthReducer from "./slices/userAuthSlice";

// 後台管理系統
import adminAuthReducer from "./slices/adminAuthSlice";

//前台會員訂單列表
import orderReducer from "./slices/orderSlice";

//前台購物車
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});
