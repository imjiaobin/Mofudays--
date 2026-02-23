import { configureStore } from "@reduxjs/toolkit";

// 後台管理系統
import adminAuthReducer from "./slices/adminAuthSlice";

export const store = configureStore({
    reducer: {
    adminAuth: adminAuthReducer, 
    // cart: cartReducer,
  },
})