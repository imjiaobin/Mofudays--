import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserOrders,
  cancelSubscriptions,
  getUserDogs,
  addToCart,
} from "../api/subscriptionApi";

// Async Thunks

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserOrders();
    } catch (err) {
      return rejectWithValue(err.message || "載入失敗");
    }
  },
);

export const cancelOrderSubscriptions = createAsyncThunk(
  "orders/cancelSubscriptions",
  async ({ orderId, subscriptionIds }, { rejectWithValue }) => {
    try {
      return await cancelSubscriptions(orderId, subscriptionIds);
    } catch (err) {
      return rejectWithValue(err.message || "取消失敗");
    }
  },
);

export const fetchUserDogs = createAsyncThunk(
  "orders/fetchUserDogs",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserDogs();
    } catch (err) {
      return rejectWithValue(err.message || "載入寵物資料失敗");
    }
  },
);

export const resubscribeToCart = createAsyncThunk(
  "orders/resubscribeToCart",
  async ({ order, dog }, { rejectWithValue }) => {
    try {
      const activeSubs = order.subscriptions.filter(
        (s) => s.subscriptionStatus !== "已取消",
      );
      await Promise.all(
        activeSubs.map((sub) => addToCart(sub, dog, order.month)),
      );
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "加入購物車失敗");
    }
  },
);

// Slice

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    dogs: [],
    status: "idle", // idle | loading | succeeded | failed
    dogsStatus: "idle",
    resubStatus: "idle",
    error: null,
  },
  reducers: {
    clearOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUserOrders
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // cancelOrderSubscriptions
    builder
      .addCase(cancelOrderSubscriptions.fulfilled, (state, action) => {
        const updated = action.payload;
        state.orders = state.orders.map((o) =>
          o.id === updated.id ? updated : o,
        );
      })
      .addCase(cancelOrderSubscriptions.rejected, (state, action) => {
        state.error = action.payload;
      });

    // fetchUserDogs
    builder
      .addCase(fetchUserDogs.pending, (state) => {
        state.dogsStatus = "loading";
      })
      .addCase(fetchUserDogs.fulfilled, (state, action) => {
        state.dogsStatus = "succeeded";
        state.dogs = action.payload;
      })
      .addCase(fetchUserDogs.rejected, (state, action) => {
        state.dogsStatus = "failed";
        state.error = action.payload;
      });

    // resubscribeToCart
    builder
      .addCase(resubscribeToCart.pending, (state) => {
        state.resubStatus = "loading";
      })
      .addCase(resubscribeToCart.fulfilled, (state) => {
        state.resubStatus = "succeeded";
      })
      .addCase(resubscribeToCart.rejected, (state, action) => {
        state.resubStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectDogs = (state) => state.orders.dogs;
export const selectOrderStatus = (state) => state.orders.status;
export const selectDogsStatus = (state) => state.orders.dogsStatus;
export const selectResubStatus = (state) => state.orders.resubStatus;
export const selectOrderError = (state) => state.orders.error;

export default orderSlice.reducer;
