import { configureStore } from "@reduxjs/toolkit";

//前台管理系統
import userAuthReducer from "./slices/userAuthSlice";

// 後台管理系統
import adminAuthReducer from "./slices/adminAuthSlice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    // cart: cartReducer,
  },
});
