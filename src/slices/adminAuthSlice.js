import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const TOKEN_KEY = "admin_token";
const PROFILE_KEY = "admin_profile";

// 工具 : 將 localstorage 取出來的資料 JSON 化
const readJSON = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

// State初始值
const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  user: readJSON(PROFILE_KEY),
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// 後台管理員登入 => 非同步放在 createAsyncThunk
export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    // console.log("payload:", email, password);
    try {
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();
      const res = await axios.post(`${API_BASE}/login`, { email:cleanEmail, password:cleanPassword });
      const { accessToken, user } = res.data;

      // 1. 非 admin 帳號無法登入
      if (user.role !== "admin") {
        return rejectWithValue("此帳號非管理員，無法登入後台，協助請洽分機:#456");
      }

      // 2. 判斷使用者帳號是否違停權
      if (
        user?.isActive === false ||
        user?.status === "suspended" ||
        user?.deletedAt
      ) {
        return rejectWithValue(
          "此帳號目前無法登入（停用/停權），請洽 IT部門，分機:#456",
        );
      }

      // 3. 將登入成功之 user 資訊存入 localStorage
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(user));

      return { token: accessToken, user };
    } catch (err) {
      const msg = err.response?.data;
      return rejectWithValue(typeof msg === "string" ? msg : "帳號或密碼錯誤");
    }
  },
);

// reducer 只放同步
export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogout(state) {
      // 清空 state 和 localStorage
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(PROFILE_KEY);
    },
    clearAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "登入失敗";
      });
  },
});

// 記得要 export reducer!!!!!!不要忘記了!!!!!!要用actions
export const { adminLogout, clearAdminError } = adminAuthSlice.actions;

export const selectAdminAuth = (state) => state.adminAuth;  // 使用者資料
export const selectIsAdminAuthed = (state) => Boolean(state.adminAuth.token); // 是否登入

export default adminAuthSlice.reducer; // !!! admin打的是 db.json 的 users !!!
