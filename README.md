# 🐾 Mofudays — 毛孩日常

> 一個以貓咪訂閱盒為主題的電商平台，讓每一位毛孩主人都能輕鬆為愛貓打造專屬的日常驚喜。

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ 頁面

- 🏠 **首頁** — Hero Banner、服務介紹、訂閱流程、顧客評價輪播
- 📦 **訂閱方案** — 瀏覽並選擇適合毛孩的訂閱盒方案
- 🛒 **購物車 & 結帳** — 完整的購物流程，支援台灣縣市地址選擇
- 👤 **會員中心** — 查看訂單紀錄、參與主題活動、專屬會員頁面
- 🐱 **寵物資訊** — 飲食、健康、玩樂等寵物照護資訊
- 📝 **部落格 & FAQ** — 貓咪知識文章與常見問題解答
- 🔐 **會員系統** — 註冊、登入、JWT 身份驗證
- 🛠️ **後台管理系統** — 完整 CRUD，管理用戶、訂單、訂閱、庫存與方案

---

## 🛠️ 使用技術

|    | 技術 |
|------|------|
| ⚡ 框架 | React 19 + Vite 7 |
| 🗂️ 狀態管理 | Redux Toolkit + React-Redux |
| 🗺️ 路由 | React Router DOM v7 |
| 📋 表單 | React Hook Form |
| 🎨 樣式 | Bootstrap 5 + SCSS |
| 🖼️ 圖示 | Bootstrap Icons + Lucide React |
| 🎬 動畫 | AOS (Animate On Scroll) |
| 🎠 輪播 | Swiper |
| 🌐 HTTP | Axios |
| 🔔 通知 | React Toastify |
| 🗄️ Mock API | json-server + json-server-auth |
| 🚀 部署 | Vercel |

---

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 環境變數

專案已內建 `.env.development`，**不需要手動建立**，開發環境會自動指向本地 Mock API：

```
VITE_API_BASE=http://localhost:3001
```

### 3. 啟動 Mock API Server

```bash
npm run server
```

終端機出現以下訊息即代表成功 ✅

```
JSON Server + Auth is running on port 3001
```

> API 根路徑：`http://localhost:3001`　|　資料來源：`db.json`

### 4. 啟動前端開發伺服器

```bash
npm run dev
```

> ⚠️ **步驟 3 和步驟 4 需同時執行**，前端才能正常串接 API。

開啟瀏覽器前往 👉 `http://localhost:5173`

---

## 🔑 測試帳號

> 以下帳號資料來自 `db.json`，僅供本地開發使用。

### 前台會員

| 帳號 | 密碼 | 狀態 |
|------|------|------|
| `koko.lin@example.com` | `koko123` | ✅ 正常 |
| `hua.hsu@example.com` | `hua123` | ✅ 正常 |
| `afu.chen@example.com` | `afu123` | 🚫 已停用（suspended） |

### 後台管理員

| 帳號 | 密碼 | 狀態 |
|------|------|------|
| `test@mofudays.com` | `12345678` | ✅ 正常 |
| `editor@mofudays.com` | `editor_admin_123` | ✅ 正常 |

---

## 📜 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 🔥 啟動前端開發伺服器 |
| `npm run build` | 📦 打包生產版本 |
| `npm run preview` | 👀 預覽打包結果 |
| `npm run lint` | 🔍 執行 ESLint 檢查 |
| `npm run server` | 🗄️ 啟動 Mock API Server |
| `npm run deploy` | 🚀 打包並部署至 GitHub Pages |

---

## 📁 專案結構

```
src/
├── 📂 app/
│   ├── layouts/          # 主版型（Header、Footer、Announcement）
│   ├── routes.jsx        # 前台路由設定
│   ├── router.js         # 整合前後台路由
│   └── slices/           # Redux slices（userAuth 等）
├── 📂 api/               # Axios API 模組（user、plan、subscription）
├── 📂 services/          # 共用 endpoints / localStorage 工具
├── 📂 pages/
│   ├── 🌐 FrontEndLayout/
│   │   ├── Home/         # 首頁
│   │   ├── Plan/         # 訂閱方案
│   │   ├── Blog/         # 部落格
│   │   ├── Cart/         # 購物車
│   │   ├── Checkout/     # 結帳流程
│   │   ├── Finish/       # 訂單完成
│   │   ├── Faq/          # 常見問題
│   │   ├── PetInfo/      # 寵物資訊
│   │   ├── UserCenter/   # 會員中心
│   │   ├── Login/        # 登入
│   │   └── Signup/       # 註冊
│   └── 🛠️ BackEndLayout/
│       ├── AdminDashboard/     # 儀表板
│       ├── AdminUsers/         # 用戶管理
│       ├── AdminOrders/        # 訂單管理
│       ├── AdminSubscriptions/ # 訂閱管理
│       ├── AdminPlans/         # 方案管理
│       ├── AdminInventory/     # 庫存管理（玩具、零食、日用品）
│       └── AdminLogin/         # 後台登入
├── 📂 components/        # 共用元件（RequireAuth、RequireAdmin）
└── 📂 styles/            # 全域樣式 / SCSS 變數
```

---

## 🗺️ 路由說明

### 前台

| 路徑 | 頁面 | 權限 |
|------|------|------|
| `/` | 🏠 首頁 | 公開 |
| `/login` | 🔑 登入 | 公開 |
| `/signup` | 📝 註冊 | 公開 |
| `/plan` | 📦 訂閱方案 | 公開 |
| `/blog` | 📰 部落格 | 公開 |
| `/faq` | ❓ 常見問題 | 公開 |
| `/cart` | 🛒 購物車 | 🔒 需登入 |
| `/checkout` | 💳 結帳 | 🔒 需登入 |
| `/member/:id` | 👤 會員中心 | 🔒 需登入 |
| `/orders` | 📋 訂單紀錄 | 🔒 需登入 |

### 後台（`/admin`）

| 路徑 | 頁面 | 權限 |
|------|------|------|
| `/admin/login` | 🔑 管理員登入 | 公開 |
| `/admin/dashboard` | 📊 儀表板 | 🛡️ 需管理員 |
| `/admin/users` | 👥 用戶管理 | 🛡️ 需管理員 |
| `/admin/orders` | 📋 訂單管理 | 🛡️ 需管理員 |
| `/admin/subscriptions` | 🔄 訂閱管理 | 🛡️ 需管理員 |
| `/admin/plans` | 📦 方案管理 | 🛡️ 需管理員 |
| `/admin/inventory/toys` | 🧸 玩具庫存 | 🛡️ 需管理員 |
| `/admin/inventory/treats` | 🍖 零食庫存 | 🛡️ 需管理員 |
| `/admin/inventory/household` | 🏠 日用品庫存 | 🛡️ 需管理員 |

---

## 🔧 常見問題排解

**Q：`npm run server` 啟動後，前端還是無法取得資料？**
> 確認兩個終端機視窗都在執行（`npm run server` + `npm run dev`），且 port 3001 沒有被其他程式佔用。

**Q：登入後一直跳回登入頁？**
> 清除瀏覽器的 `localStorage` 和 `sessionStorage`，重新整理後再登入。

**Q：`db.json` 資料跑掉了怎麼辦？**
> 用 git 還原：`git checkout db.json`

**Q：build 失敗，出現 SCSS 變數找不到的錯誤？**
> 不要在元件內手動 `@import` SCSS 變數，變數已由 `vite.config.js` 全域注入。

---

## 📝 注意事項

- **Mock API Server** 使用 `json-server 0.17.4`，因 ES Module 相容性問題，server 進入點以 `.cjs` 格式撰寫。
- **SCSS 全域變數** 透過 `vite.config.js` 的 `additionalData` 自動注入，無需在每個元件手動 import。
- **路由保護** 前台由 `<RequireAuth>` 元件處理，後台由 `<RequireAdmin>` 元件處理。
- **生產環境 API** 部署於 Render（`https://mofudays-l93k.onrender.com`），已設定於 `.env.production`。

---

<p align="center">Made with ❤️ for cats and their humans 🐱</p>
