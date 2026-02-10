// import React from "react";

// function App() {
//   return (
//     <div className="container py-5">
//       {/* 1. 測試 Bootstrap 字體與顏色 */}
//       <div className="p-5 mb-4 bg-light rounded-3 border">
//         <div className="container-fluid py-5 text-center">
//           <h1 className="display-5 fw-bold text-primary">毛日和系統測試</h1>
//           <p className="fs-4">
//             如果這行字是 Zen Maru Gothic 字體，代表 Google Fonts 成功。
//             <br />
//             如果標題是你的品牌顏色，代表 _variables.scss 成功。
//           </p>

//           {/* 2. 測試你的 _button.scss */}
//           <div className="d-flex justify-content-center gap-3 mt-4">
//             <button className="btn btn-primary btn-lg">主要按鈕</button>
//             <button className="btn btn-outline-secondary btn-lg">
//               次要按鈕
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 3. 測試 Bootstrap Grid 系統 */}
//       <div className="row g-4">
//         <div className="col-md-4">
//           <div className="card h-100 shadow-sm">
//             <div className="card-body text-center">
//               <h5 className="card-title">Grid 測試 1</h5>
//               <p className="card-text text-muted">左側區塊</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card h-100 shadow-sm border-primary">
//             <div className="card-body text-center">
//               <h5 className="card-title">Grid 測試 2</h5>
//               <p className="card-text text-muted">中間區塊</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card h-100 shadow-sm">
//             <div className="card-body text-center">
//               <h5 className="card-title">Grid 測試 3</h5>
//               <p className="card-text text-muted">右側區塊</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// function App() {

import React from "react";
import Header from "./app/layouts/components/Header/Header";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Member from "./pages/Member/Member";

import Footer from "./app/layouts/components/Footer/Footer";

// router 2026/2/2 by 納森
// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
// function App(){
//     return (
//         <>
//             <RouterProvider router={router}/>
//         </>
//     )
// }

function App() {
  return (
    <>
      <Header />
      <Signup />
      <Login />
      <Member />
      <Footer />
    </>
  );
}

export default App;
