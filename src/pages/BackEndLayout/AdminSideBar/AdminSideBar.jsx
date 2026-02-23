import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout, selectAdminAuth } from "../../../slices/adminAuthSlice";
import avatarDefault from "../../../assets/images/header/avatar_defalut.png";
import logo from "../../../assets/images/header/maorihe_logo_defalut.svg";
import {
  LayoutDashboard,
  ClipboardList,
  Repeat,
  Users,
  Bell,
  Settings,
  LogOut,
  ShieldUser,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";

export default function AdminSideBar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAdminAuth);

  const adminName = user?.name ?? "";
  const adminEmail = user?.email ?? "";

  const linkClass = ({ isActive }) =>
    `ad-side__link ${isActive ? "is-active" : ""}`;

  const handleLogout = (e) => {
    e.preventDefault();
    if (!window.confirm("確認要登出嗎？")) return;

    dispatch(adminLogout());
    onCloseMobile?.();
    navigate("/admin/login", { replace: true });
  };

  const handleNavClick = () => {
    // 手機版點選後收起 drawer
    onCloseMobile?.();
  };

  return (
    <aside
      className={`ad-side ${collapsed ? "is-collapsed" : ""} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      aria-label="後台側邊欄"
    >
      <div className="ad-side__brand">
        {/* 桌機收合按鈕 */}
        <button
          type="button"
          className="ad-side__collapseBtn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "展開側邊欄" : "收合側邊欄"}
          title={collapsed ? "展開側邊欄" : "收合側邊欄"}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>

        <div className="ad-side__logo" title="毛日和">
          <img src={logo} alt="毛日和 Logo" />
        </div>

        {/* 手機版關閉按鈕 */}
        <button
          type="button"
          className="ad-side__mobileClose"
          onClick={onCloseMobile}
          aria-label="關閉側邊欄"
          title="關閉側邊欄"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="ad-side__nav">
        <NavLink
          className={linkClass}
          to="/admin/dashboard"
          title="數據總覽"
          onClick={handleNavClick}
        >
          <LayoutDashboard size={18} />
          <span className="ad-side__label">數據總覽</span>
        </NavLink>

        <NavLink
          className={linkClass}
          to="/admin/orders"
          title="訂單管理"
          onClick={handleNavClick}
        >
          <ClipboardList size={18} />
          <span className="ad-side__label">訂單管理</span>
        </NavLink>

        <NavLink
          className={linkClass}
          to="/admin/subscriptions"
          title="訂閱管理"
          onClick={handleNavClick}
        >
          <Repeat size={18} />
          <span className="ad-side__label">訂閱管理</span>
        </NavLink>

        <NavLink
          className={linkClass}
          to="/admin/users"
          title="會員管理"
          onClick={handleNavClick}
        >
          <Users size={18} />
          <span className="ad-side__label">會員管理</span>
        </NavLink>

        <NavLink
          className={linkClass}
          to="/admin/admins"
          title="管理員管理"
          onClick={handleNavClick}
        >
          <ShieldUser size={18} />
          <span className="ad-side__label">管理員管理</span>
        </NavLink>
      </nav>

      <div className="ad-side__bottom mb-5">
        <button className="ad-side__mini" type="button" title="通知中心">
          <Bell size={18} />
          <span className="ad-side__label">通知中心</span>
        </button>

        <button className="ad-side__mini" type="button" title="系統設定">
          <Settings size={18} />
          <span className="ad-side__label">系統設定</span>
        </button>

        <div className="ad-side__user" title={adminName || "管理員"}>
          <div className="ad-side__avatar">
            <img className="rounded" src={avatarDefault} alt="預設登入頭像" />
          </div>

          <div className="ad-side__userMeta lh-sm">
            <div className="fw-bold small text-truncate">{adminName}</div>
            <div className="small text-truncate">{adminEmail}</div>
          </div>
        </div>

        <button
          className="btn w-100 rounded-pill fw-bold ad-side__logoutBtn"
          type="button"
          onClick={handleLogout}
          title="登出"
        >
          <LogOut size={16} className="ad-side__logoutIcon mb-4 me-2" />
          <span className="ad-side__label">登出</span>
        </button>
      </div>
    </aside>
  );
}