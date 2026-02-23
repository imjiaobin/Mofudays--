import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../slices/adminAuthSlice";

import "../../../styles/AdminStyle/adminLogin.scss";
import logo from "../../../assets/images/header/maorihe_logo_defalut.svg";
import { useDispatch } from "react-redux";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPwd, setShowPwd] = useState(false); // 是否顯示密碼

  const onSubmit = async (data) => {
    try {
      await dispatch(adminLogin(data)).unwrap(); // unwrap: 失敗會 throw
      navigate("/admin/dashboard", { replace: true });
    } catch (msg) {
      // msg 就是 rejectWithValue 的字串
      setError("root", { message: msg || "登入失敗" });
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-card__top">
          <div className="brand">
            <div className="d-flex align-items-center gap-2">
              <img className="w-50 mb-1" src={logo} alt="毛日和-logo" />
              <h2 className="brand__name">後台管理系統</h2>
            </div>
          </div>
        </div>

        <div className="login-card__body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                管理員帳號
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="name@mofudays.com"
                {...register("email", {
                  required: "請輸入您的管理員帳號",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Email 格式不正確",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
              <div className="help">若還沒有帳號，請洽人資，分機:#123</div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                密碼
              </label>
              <input
                type={showPwd ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "請輸入您的密碼",
                  minLength: { value: 6, message: "密碼至少 6 碼" },
                })}
              />
              {errors.password && (
                <div className="text-primary">{errors.password.message}</div>
              )}
            </div>

            <div className="meta-row">
              <div className="form-check m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPwd"
                  checked={showPwd}
                  onChange={(e) => setShowPwd(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="showPwd">
                  顯示密碼
                </label>
              </div>

              <a href="#help" onClick={(e) => e.preventDefault()}>
                忘記密碼？
              </a>
            </div>

            <button
              className="btn btn-ad-login rounded w-100 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "登入中..." : "登入"}
            </button>

            {errors.root && (
              <div className="alert alert-danger py-2 mb-2" role="alert">
                {errors.root.message}
              </div>
            )}

          </form>
        </div>

        <div className="divider" />
        <div className="footer-note">
          建議使用公司網路或 VPN 登入，以確保權限驗證順利。
        </div>
      </div>
    </div>
  );
}
