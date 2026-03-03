import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:3000";

// Async Thunks

/**
 * 取得購物車資料
 * 回傳：cart 物件 | null
 */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return rejectWithValue("尚未登入");

    const res = await fetch(`${API_BASE}/carts?userId=${userId}`);
    if (!res.ok) return rejectWithValue("取得購物車失敗");

    const data = await res.json();
    return data[0] ?? null;
  },
);

/**
 * 清空購物車（結帳後刪除整筆 cart）
 */
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const { cart } = getState();
    if (!cart.cartId) return rejectWithValue("購物車不存在");

    const res = await fetch(`${API_BASE}/carts/${cart.cartId}`, {
      method: "DELETE",
    });
    if (!res.ok) return rejectWithValue("清空購物車失敗");
  },
);

// Slice

const initialState = {
  cartId: null, // cart 的 id
  cart: null, // 完整的 cart 物件
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // 登出時清掉 store 中的購物車
    resetCart: () => initialState,
  },

  extraReducers: (builder) => {
    // fetchCart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartId = action.payload?.id ?? null;
        state.cart = action.payload ?? null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // clearCart
    builder
      .addCase(clearCart.fulfilled, (state) => {
        state.cartId = null;
        state.cart = null;
        state.status = "idle";
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors

/** 完整 cart 物件 */
export const selectCart = (state) => state.cart.cart;

/** 是否有購物車 */
export const selectCartHasItems = (state) => !!state.cart.cart;

/** 購物車狀態 */
export const selectCartStatus = (state) => state.cart.status;

/** 購物車錯誤 */
export const selectCartError = (state) => state.cart.error;
