# AGENT.md — AI Agent 協作指南

> 本文件供 AI Agent（如 Claude Code、GitHub Copilot、Cursor 等）在進行 **Code Review** 和 **CI/CD** 任務時閱讀，以正確理解專案架構、規範與限制。

---

## 📌 專案概覽

| 項目 | 說明 |
|------|------|
| 專案名稱 | mofudays-react |
| 類型 | 全端電商平台（貓咪訂閱盒服務） |
| 前端框架 | React 19 + Vite 7 |
| 語言 | JavaScript (JSX)，無 TypeScript |
| 部署平台 | Vercel（前台），`base: "/"` |
| Mock API | json-server 0.17.4 + json-server-auth 2.1.0，`port 3001` |
| 環境變數 | `VITE_API_BASE`（指向 API Server 根路徑） |

---

## 🏗️ 架構說明

### 狀態管理（Redux Toolkit）

Store 位於 `src/store.js`，共有四個 slice：

| Slice | 路徑 | 職責 |
|-------|------|------|
| `userAuth` | `src/slices/userAuthSlice.js` | 前台會員登入、登出、Token 驗證 |
| `adminAuth` | `src/slices/adminAuthSlice.js` | 後台管理員登入 / 登出 |
| `cart` | `src/slices/cartSlice.js` | 前台購物車狀態 |
| `orders` | `src/slices/orderSlice.js` | 前台訂單列表 |

**Auth 機制重點：**
- Token 儲存在 `localStorage`（記住我）或 `sessionStorage`（預設）
- App 啟動時透過 `initUserAuth` thunk 驗證 Token 有效性
- `isInitialized` 旗標控制 ProtectedRoute 的渲染時機，避免閃屏

### API 層

| 模組 | 路徑 | 說明 |
|------|------|------|
| `userApi.js` | `src/api/userApi.js` | 會員 CRUD、購物車、訂單查詢 |
| `planApi.js` | `src/api/planApi.js` | 訂閱方案相關 |
| `subscriptionApi.js` | `src/api/subscriptionApi.js` | 訂閱記錄相關 |
| `http.js` | `src/services/http.js` | Axios 實例（可能含 interceptor） |

**受保護 API 慣例：**
- 使用 `600` 前綴（json-server-auth 規則）對應需要 JWT 驗證的路由，例如：`/600/users/:id`
- Auth Header 格式：`Authorization: Bearer <token>`

### 路由結構

- 前台路由：`src/app/routes.jsx`（`createBrowserRouter`，`basename: "/mofudays-react"`）
- 後台路由：`src/pages/BackEndLayout/adminRouterIndex.js`
- 路由保護：
  - 前台 → `src/components/RequireAuth.jsx`
  - 後台 → `src/components/RequireAdmin.jsx`

### 樣式規範

- Bootstrap 5 + SCSS
- SCSS 全域變數透過 `vite.config.js` 的 `additionalData` 注入，**不需要在元件內手動 import `_variables.scss`**
- 客製化變數定義於 `src/styles/_variables.scss`

---

## ✅ Code Review 檢查清單

### 🔐 安全性

- [ ] **敏感資料** 不得 hardcode（API URL、Token、密碼）
- [ ] 環境變數只使用 `VITE_` 前綴（Vite 的瀏覽器端限制）
- [ ] 受保護 API 呼叫必須帶 `Authorization` header
- [ ] 登出後確認 `localStorage` 和 `sessionStorage` 都有清除
- [ ] 管理員帳號不能透過前台登入流程登入（`userLogin` 中有 role 檢查）

### 🏛️ 架構規範

- [ ] **API 呼叫**應放在 `src/api/` 或 Redux thunk 中，不應直接在元件內呼叫 `axios`
- [ ] **副作用**（fetch data）應透過 Redux thunk 或 custom hook 管理
- [ ] **後台 custom hooks** 位於 `src/pages/BackEndLayout/hooks/`，命名以 `use` 開頭
- [ ] **後台工具函式** 位於 `src/pages/BackEndLayout/utils/`，不應含有 React 相關語法
- [ ] SCSS 樣式應與元件同名放在相同目錄（例如 `Home.jsx` / `Home.scss`）

### ⚛️ React 規範

- [ ] 元件名稱使用 PascalCase
- [ ] Custom hook 名稱以 `use` 開頭
- [ ] 避免在 render 中直接定義物件或陣列（會導致不必要的 re-render）
- [ ] `useEffect` 的 dependency array 必須完整
- [ ] 不應在子元件內直接操作 `localStorage` — 應透過 Redux 或傳入 prop 的方式處理

### 🎨 樣式規範

- [ ] 不應在元件內使用 inline style（除非動態數值無法用 className 表達）
- [ ] 客製化顏色、字體、間距應使用 `_variables.scss` 中定義的 SCSS 變數
- [ ] Bootstrap class 優先，只有在 Bootstrap 無法滿足時才寫客製 SCSS

### 📦 ESLint 規則

目前使用的規則（`eslint.config.js`）：
- `no-unused-vars`：錯誤等級，全大寫或底線開頭可例外（`varsIgnorePattern: "^[A-Z_]"`）
- `react-hooks/rules-of-hooks`：強制執行 Hook 規則
- `react-hooks/exhaustive-deps`：警告不完整的 deps

---

## 🔄 CI/CD 說明

### 目前狀態

> ⚠️ 本專案目前**尚未建立** `.github/workflows` CI/CD Pipeline，以下為建議的設定方向。

### 建議的 GitHub Actions Workflow

建議在 `.github/workflows/ci.yml` 加入以下流程：

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
        env:
          VITE_API_BASE: ${{ secrets.VITE_API_BASE }}
```

### 環境變數管理

| 變數 | 用途 | 設定位置 |
|------|------|----------|
| `VITE_API_BASE` | API Server 根路徑 | 各環境檔 / GitHub Secrets |

- **本地開發**：`.env.development` 已存在，值為 `http://localhost:3001`，**不需要手動建立**
- **生產環境**：`.env.production` 已存在，指向 Render 部署的 API（`https://mofudays-l93k.onrender.com`）
- **GitHub Actions**：在 Repository → Settings → Secrets and variables 設定 `VITE_API_BASE`

### 部署流程

```
Push to main
  └─> GitHub Actions: lint + build 檢查
        └─> (pass) Vercel 自動偵測 push，觸發部署
              └─> Preview URL 供 review
                    └─> (確認) 合併至 main → Production 部署
```

---

## 🚫 禁止修改清單（Do Not Touch）

以下檔案或設定有特殊原因，**不應在未確認的情況下修改或「優化」**：

| 檔案 / 設定 | 原因 |
|-------------|------|
| `server.cjs`（副檔名） | `package.json` 有 `"type": "module"`，`.cjs` 強制 Node.js 用 CommonJS 解析，改成 `.js` 會直接炸掉 |
| `json-server` 版本（`0.17.4`） | `1.x` 版 API 不相容 `json-server-auth`，不可升級 |
| `vite.config.js` 中的 `__dirname` 重建方式 | ESM 環境沒有 `__dirname`，用 `fileURLToPath` 手動重建，這是刻意的，不是 bug |
| `.env.development` / `.env.production` | 環境變數檔已存在且正確設定，不需要新建 `.env.local` |
| `eslint.config.js` 中的 `varsIgnorePattern` | 全大寫變數（如常數）刻意允許未使用，不是漏網的 unused var |
| `basename: "/mofudays-react"` | 目前已切換 Vercel 部署，`base` 在 `vite.config.js` 改為 `"/"`，但 router 的 `basename` 仍保留原值，兩者作用不同，勿混淆 |

---

## ⚠️ 已知限制與注意事項

1. **json-server 版本鎖定**：必須使用 `0.17.4`，因為 `1.x` 的 API 不相容 `json-server-auth`
2. **server.cjs 強制 CommonJS**：`package.json` 有 `"type": "module"`，Mock API Server 因相容性問題須以 `.cjs` 副檔名撰寫
3. **`basename` 注意**：前台 router 的 `basename` 設定為 `"/mofudays-react"`，若切換部署環境需確認是否調整
4. **Vite 的 `__dirname` 不存在**：ESM 環境中需手動用 `fileURLToPath` + `path.dirname` 重建，`vite.config.js` 已處理
5. **無 TypeScript**：目前全專案為 JS/JSX，PR 中不應引入 `.ts` / `.tsx` 檔案
6. **db.json 資料不一致**：部分 user 的 `isActive: false` 但 `isLoggedIn: true`，這是測試資料的歷史殘留，不是 bug，勿據此修改邏輯

---

## 🧪 測試建議（尚未實作）

> 目前專案無測試檔案，以下為建議的優先測試項目：

### 優先順序

1. **Redux Slices（純函式，最易測試）**
   - `userAuthSlice` — `userLogin` / `userLogout` / `initUserAuth` 的 state 變化
   - `cartSlice` — 加入購物車、移除、數量更新

2. **工具函式（`src/pages/BackEndLayout/utils/`）**
   - `date.js`、`money.js`、`orderMeta.js` 等 pure function

3. **API 模組（需 mock axios）**
   - `userApi.js` 中的錯誤處理邏輯（401、DB mismatch 等）

### 建議工具

| 工具 | 用途 |
|------|------|
| Vitest | 單元測試（Vite 原生整合） |
| React Testing Library | 元件互動測試 |
| MSW (Mock Service Worker) | API mock（取代直接 mock axios） |

---

## ✏️ Commit 規範

此專案混用中文敘述與 Conventional Commits 前綴，兩種都可接受：

```
fix: 修正 AdminDashboard 登入後頁面未成功顯示
revert: 還原所有 CSS 高度相關改動
調整 global.scss 的 html, body 區塊
```

**原則：**
- 能用 `fix:` / `feat:` / `refactor:` / `revert:` 前綴的就加上
- 中文 commit message 可接受，不強制英文
- 不需要加 issue 編號（目前無 issue tracker 整合）

---

## 📋 已知技術債 / TODO

> 這些是**刻意保留**或**尚未完成**的項目，code review 時請先確認再提修改建議。

- [ ] **CI/CD Pipeline 尚未建立** — 無 `.github/workflows`，build / lint 目前靠手動
- [ ] **無任何測試** — 目前 0 個測試檔案，建議優先從 Redux slices 和 utils 開始補
- [ ] **部分前台路由為佔位符** — `routes.jsx` 中的 `orders`、`coupons`、`member/exclusive` 頁面內容尚未實作（`<div>xxx page</div>`）
- [ ] **`src/app/routes.jsx` 與 `src/layout/` 並存** — `src/layout/` 目錄內有舊版 layout 殘留，已被 `src/app/layouts/` 取代，尚未清除

---

## 🗂️ 快速索引

| 需要找的東西 | 去哪裡找 |
|-------------|---------|
| API 端點定義 | `src/api/*.js` |
| 全域狀態 | `src/slices/*.js` |
| 路由設定 | `src/app/routes.jsx`、`src/pages/BackEndLayout/adminRouterIndex.js` |
| SCSS 變數 | `src/styles/_variables.scss` |
| 後台邏輯工具 | `src/pages/BackEndLayout/utils/` |
| 後台 custom hooks | `src/pages/BackEndLayout/hooks/` |
| ESLint 規則 | `eslint.config.js` |
| Mock API Server | `server.cjs`、`db.json` |
| Vite 設定 | `vite.config.js` |
