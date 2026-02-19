import { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout, selectAdminAuth } from "../../../slices/adminAuthSlice";
import avatarDefault from "../../../assets/images/header/avatar_defalut.png"
import logo from "../../../assets/images/header/maorihe_logo_defalut.svg"
import {
  LayoutDashboard,
  ClipboardList,
  Repeat,
  Users,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ShieldUser
  // Admin
} from "lucide-react";

export default function AdminSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAdminAuth);

  const adminName = user?.name ?? "";
  const adminEmail = user?.email ?? "";

  // 會員管理子選單（目前不會用到）
  // const [memberOpen, setMemberOpen] = useState(true);

  // sidebar link 用
  const linkClass = ({ isActive }) =>
    `ad-side__link ${isActive ? "is-active" : ""}`;

  const subLinkClass = ({ isActive }) =>
    `ad-side__subLink ${isActive ? "is-active" : ""}`;

  const handleLogout = (e) => {
    e.preventDefault();
    if (!window.confirm("確認要登出嗎？")) return;

    dispatch(adminLogout());
    navigate('/admin/login', { replace: true })    
  }

  return (
    <aside className="ad-side">
      <div className="ad-side__brand">
        <div className="ad-side__logo">
          <img src={logo} alt="毛日和 Logo" />
        </div>
        {/* <div className="fw-bolder">毛日和</div> */}
      </div>

      <nav className="ad-side__nav">

        <NavLink
          className={linkClass}
          to="/admin/dashboard"
        >
          <LayoutDashboard size={18} />
          <span>數據總覽</span>
        </NavLink>

        <NavLink
          className={linkClass}
          to="/admin/orders"
        >
          <ClipboardList size={18} />
          <span>訂單管理</span>
        </NavLink>

        <NavLink
          className={linkClass}
          to="/admin/subscriptions"
        >
          <Repeat size={18} />
          <span>訂閱管理</span>
        </NavLink>

        <NavLink 
          className={linkClass} 
          to="/admin/Users"
        >
          <Users size={18} />
          <span>會員管理</span>
          {/* <ChevronDown size={16} className="ms-auto opacity-75" /> */}
        </NavLink>

        <NavLink 
          className={linkClass} 
          to="/admin/admins"
        >
          <ShieldUser size={18} />
          <span>管理員管理</span>
          {/* <ChevronDown size={16} className="ms-auto opacity-75" /> */}
        </NavLink>

        
        {/* 後續子列表使用
        <NavLink
          className={subLinkClass}
          onClick={(e) => e.preventDefault()}
        >
          <ShieldUser size={16}/>
          管理員列表
        </NavLink> */}
      </nav>

      <div className="ad-side__bottom">
        <button className="ad-side__mini" type="button">
          <Bell size={18} />
          <span>通知中心</span>
        </button>
        <button className="ad-side__mini" type="button">
          <Settings size={18} />
          <span>系統設定</span>
        </button>

        <div className="ad-side__user">
          {/* <div className="ad-side__avatar" /> */}
          <div className="ad-side__avatar"><img className="rounded" src={avatarDefault} alt="預設登入頭像" /></div>
          <div className="lh-sm">
            <div className="fw-bold small">{adminName}</div>
            <div className="small">{adminEmail}</div>
          </div>
        </div>

        <button
          className="btn btn-outline-orange w-100 rounded-pill fw-bold"
          type="button"
          onClick={(e)=>{handleLogout(e)}}
        >
          <LogOut size={16} className="me-2" />
          登出
        </button>
      </div>
    </aside>
  );
}
