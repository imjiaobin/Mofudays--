import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserProfile } from "../api/userApi";

const API_BASE = import.meta.env.VITE_API_BASE;
const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";
const USER_ROLE_KEY = "userRole";

// 工具：從 localStorage 或 sessionStorage 讀取
const readStorage = (key) =>
  localStorage.getItem(key) || sessionStorage.getItem(key) || null;

// 工具：清除兩邊的 storage
const clearAuthStorage = () => {
  [TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY, USER_ROLE_KEY].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

// State 初始值
const initialState = {
  token: readStorage(TOKEN_KEY),
  user: null, // user profile 需要非同步取得，不從 localStorage 初始化
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  isInitialized: false, // 取代 AuthContext 的 isLoading，用來表示「是否完成初始驗證」
};

// ── Async Thunks ────────────────────────────────────────────────

// 1. App 啟動時的 token 驗證（取代 AuthContext 的 useEffect initAuth）
export const initUserAuth = createAsyncThunk(
  "userAuth/init",
  async (_, { rejectWithValue }) => {
    const currentToken = readStorage(TOKEN_KEY);
    if (!currentToken) return rejectWithValue("no_token");

    try {
      const userData = await getUserProfile();
      if (!userData) {
        clearAuthStorage();
        return rejectWithValue("invalid_profile");
      }
      return { token: currentToken, user: userData };
    } catch (err) {
      clearAuthStorage();
      return rejectWithValue(err?.response?.data || "驗證失敗");
    }
  },
);

// 2. 前台會員登入
export const userLogin = createAsyncThunk(
  "userAuth/login",
  async ({ email, password, rememberMe = false }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        email: email.trim(),
        password: password.trim(),
      });
      const { accessToken, user } = res.data;

      // 只允許 role === "user" 登入前台
      if (user.role === "admin") {
        return rejectWithValue("管理員帳號請由後台登入");
      }

      // 停用帳號檢查
      if (
        user?.isActive === false ||
        user?.status === "suspended" ||
        user?.deletedAt
      ) {
        return rejectWithValue("此帳號已停用，請聯繫客服");
      }

      // 依照 rememberMe 決定存到哪裡
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, accessToken);
      storage.setItem(USER_ID_KEY, String(user.id));
      storage.setItem(USER_NAME_KEY, user.name || "");
      storage.setItem(USER_ROLE_KEY, user.role || "user");

      return { token: accessToken, user };
    } catch (err) {
      const msg = err.response?.data;
      return rejectWithValue(typeof msg === "string" ? msg : "帳號或密碼錯誤");
    }
  },
);

// 3. 登出（同步更新後端 isLoggedIn 狀態）
export const userLogout = createAsyncThunk(
  "userAuth/logout",
  async (_, { getState }) => {
    const { token, user } = getState().userAuth;
    const userId = user?.id || readStorage(USER_ID_KEY);

    if (userId && token) {
      try {
        await axios.patch(
          `${API_BASE}/users/${userId}`,
          { isLoggedIn: false, updatedAt: new Date().toISOString() },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.error("登出狀態同步失敗：", err);
        // 不 rejectWithValue，讓登出繼續進行
      }
    }

    clearAuthStorage();
    return null;
  },
);

// ── Slice ───────────────────────────────────────────────────────

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    // 讓外部可以手動清除錯誤訊息（例如關閉 toast 後）
    clearUserError(state) {
      state.error = null;
    },
    // 讓外部可以更新 user 資料（例如修改個人資料後）
    updateUserProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // ── initUserAuth ──
    builder
      .addCase(initUserAuth.pending, (state) => {
        state.status = "loading";
        state.isInitialized = false;
      })
      .addCase(initUserAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(initUserAuth.rejected, (state) => {
        // no_token 也算正常流程，不寫入 error
        state.status = "idle";
        state.token = null;
        state.user = null;
        state.isInitialized = true;
      });

    // ── userLogin ──
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "登入失敗";
      });

    // ── userLogout ──
    builder.addCase(userLogout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.isInitialized = true;
    });
  },
});

export const { clearUserError, updateUserProfile } = userAuthSlice.actions;

// ── Selectors ───────────────────────────────────────────────────
export const selectUserAuth = (state) => state.userAuth;
export const selectIsUserAuthed = (state) =>
  Boolean(state.userAuth.token && state.userAuth.user);
export const selectUser = (state) => state.userAuth.user;
export const selectUserToken = (state) => state.userAuth.token;
export const selectUserIsInitialized = (state) => state.userAuth.isInitialized;
export const selectUserStatus = (state) => state.userAuth.status;
export const selectUserError = (state) => state.userAuth.error;

export default userAuthSlice.reducer;
