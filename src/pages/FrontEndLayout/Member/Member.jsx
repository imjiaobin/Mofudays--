// import { useRef, useState } from "react";
// import "./Member.scss";
// import axios from "axios";
// import * as bootstrap from "bootstrap";

//圖片載入
// import shippingCart from "../../assets/images/member/member_shipping_cart.png";
// import aboutBg from "../../../assets/images/member/about-bg.png";
// import memberWaitingDog from "../../../assets/images/member/member_waiting_dog.png";

export default function Member() {
  return <></>;
  // const formRef = useRef(null);
  // const [wasValidated, setWasValidated] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formElement = formRef.current;
  //   if (!formElement) return;

  //   const ok = formElement.checkValidity();
  //   setWasValidated(true);
  //   if (!ok) return;

  //   // 表單合法後：送 API
  // };

  // return (
  //   <div className="member-center container">
  //     <div className="member-data">
  //       <form
  //         ref={formRef}
  //         className={`needs-validation ${wasValidated ? "was-validated" : ""}`}
  //         noValidate
  //         onSubmit={handleSubmit}
  //       >
  //         <div className="mb-40">
  //           <h2 className="h h2 text-primary-500 mt-16 mb-32">
  //             <span className="bi bi-person me-2" />
  //             會員資料
  //           </h2>

  //           {/* 姓名 */}
  //           <div className="mb-56 ps-8 position-relative">
  //             <label htmlFor="user-name" className="form-label p1">
  //               姓名
  //             </label>
  //             <div className="input-group">
  //               <input
  //                 type="text"
  //                 className="form-control pe-5"
  //                 id="user-name"
  //                 placeholder="請輸入姓名"
  //                 maxLength={20}
  //                 required
  //               />
  //               <i className="icon icon-user-round-pen position-absolute top-50 end-0 translate-middle-y me-3" />
  //             </div>
  //             <div className="valid-tooltip">正確!</div>
  //             <div className="invalid-tooltip">姓名不得為空或是超過20個字!</div>
  //           </div>

  //           {/* 暱稱 */}
  //           <div className="mb-56 ps-8 position-relative">
  //             <label htmlFor="user-nick-name" className="form-label p1">
  //               暱稱
  //             </label>
  //             <div className="input-group">
  //               <input
  //                 type="text"
  //                 className="form-control pe-5"
  //                 id="user-nick-name"
  //                 placeholder="請輸入暱稱"
  //               />
  //               <i className="icon icon-file-user position-absolute top-50 end-0 translate-middle-y me-3" />
  //             </div>
  //           </div>

  //           {/* 生日 */}
  //           <div className="mb-56 ps-8 position-relative">
  //             <label htmlFor="birthday" className="form-label p1">
  //               生日
  //             </label>
  //             <div className="input-group">
  //               <input
  //                 type="text"
  //                 className="form-control"
  //                 id="birthday"
  //                 placeholder="請輸入生日, 例如: 1991/10/09"
  //                 required
  //               />
  //               <i className="icon icon-cake position-absolute top-50 end-0 translate-middle-y me-3" />
  //             </div>
  //             <div className="valid-tooltip">正確!</div>
  //             <div className="invalid-tooltip">
  //               請輸入正確年月日! 例如: 1991/10/09
  //             </div>
  //           </div>

  //           {/* Email */}
  //           <div className="mb-56 ps-8 position-relative">
  //             <label htmlFor="email" className="form-label p1">
  //               Email
  //             </label>
  //             <div className="input-group">
  //               <input
  //                 type="email"
  //                 className="form-control"
  //                 id="email"
  //                 name="email"
  //                 placeholder="請輸入電子信箱"
  //                 autoComplete="email"
  //                 inputMode="email"
  //                 required
  //               />
  //               <div className="icon icon-mail position-absolute top-50 end-0 translate-middle-y me-3" />
  //             </div>
  //             <div className="valid-tooltip">正確!</div>
  //             <div className="invalid-tooltip">請輸入正確電子信箱!</div>
  //           </div>

  //           {/* 手機 */}
  //           <div className="mb-56 ps-8 position-relative">
  //             <label htmlFor="mobile" className="form-label p1">
  //               手機號碼
  //             </label>
  //             <div className="input-group">
  //               <input
  //                 type="text"
  //                 className="form-control"
  //                 id="mobile"
  //                 placeholder="請輸入手機號碼"
  //                 maxLength={10}
  //                 required
  //               />
  //               <i className="icon icon-smartphone position-absolute top-50 end-0 translate-middle-y me-3" />
  //             </div>
  //             <div className="valid-tooltip">正確!</div>
  //             <div className="invalid-tooltip">請輸入手機號碼!</div>
  //           </div>

  //           {/* 住家地址（select + zip + address） */}
  //           <div className="mb-56 ps-8">
  //             <label className="form-label p1">住家地址</label>
  //             <div className="row g-3 g-lg-4">
  //               <div className="col-md-3 position-relative">
  //                 <select
  //                   className="form-select"
  //                   id="city"
  //                   required
  //                   defaultValue=""
  //                 >
  //                   <option disabled value="">
  //                     縣/市
  //                   </option>
  //                   <option>台北市</option>
  //                   <option>台中市</option>
  //                   <option>高雄市</option>
  //                 </select>
  //                 <div className="invalid-tooltip">縣/市</div>
  //               </div>

  //               <div className="col-md-3 position-relative">
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   id="zip"
  //                   placeholder="郵遞區號"
  //                   required
  //                 />
  //                 <div className="invalid-tooltip">郵遞區號</div>
  //               </div>

  //               <div className="col-md-6 position-relative">
  //                 <div className="input-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     id="address-detail"
  //                     placeholder="地址"
  //                     required
  //                   />
  //                   <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3" />
  //                 </div>
  //                 <div className="invalid-tooltip">地址</div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="shipping-info mb-4 position-relative">
  //           <h2 className="h h2 text-primary-500 mb-32">
  //             <span className="bi bi-person me-2" />
  //             送貨資料
  //           </h2>

  //           <img
  //             src={shippingCart}
  //             alt="行進中的貨車圖"
  //             className="position-absolute img-shipping-cart img-shake top-0 end-0 z-2"
  //           />
  //           <img
  //             src={aboutBg}
  //             alt="黃色底框"
  //             className="position-absolute img-shipping-cart img-shake top-0 end-0 z-1"
  //           />
  //           <img
  //             src={memberWaitingDog}
  //             alt="等待中的小狗狗"
  //             className="position-absolute img-waiting-dog transform-x img-shake top-1 end-1 z-1"
  //           />

  //           <div className="mb-3 ps-8">
  //             <label htmlFor="shipping-address" className="form-label p1">
  //               送達地址
  //             </label>
  //             <div id="shipping-address" className="row g-3 g-lg-4">
  //               <div className="col-md-3 position-relative">
  //                 <select className="form-select" id="shipping-city" required>
  //                   <option selected disabled value="">
  //                     縣/市
  //                   </option>
  //                   <option>台北市</option>
  //                   <option>台中市</option>
  //                   <option>高雄市</option>
  //                 </select>
  //                 <div className="invalid-tooltip">請選擇縣/市!</div>
  //               </div>

  //               <div className="col-md-3 position-relative">
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   id="shipping-zip"
  //                   placeholder="郵遞區號"
  //                   required
  //                 />
  //                 <div className="invalid-tooltip">請輸入郵遞區號!</div>
  //               </div>

  //               <div className="col-md-6 position-relative">
  //                 <div className="input-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     id="shipping-addr"
  //                     placeholder="地址"
  //                     required
  //                   />
  //                   <div className="icon icon-map-pin-house position-absolute top-50 end-0 translate-middle-y me-3 "></div>
  //                 </div>
  //                 <div className="invalid-tooltip">請輸入送達地址!</div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="d-flex justify-content-center mt-80">
  //           <button
  //             type="submit"
  //             className="btn btn-save rounded-pill align-bottom"
  //           >
  //             存檔
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
}
