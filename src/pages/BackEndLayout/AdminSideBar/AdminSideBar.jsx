import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { adminLogout, selectAdminAuth } from "../../../slices/adminAuthSlice";
import avatarDefault from "../../../assets/images/header/avatar_defalut.png";
import logo from "../../../assets/images/header/maorihe_logo_defalut.svg";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Contact,
  BrickWallShield,
  Bell,
  Settings,
  LogOut,
  ShieldUser,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  FolderKanban,
  Component,
  X,
  Repeat,
  Boxes,
  Package2,
  Bone,
  House,
} from "lucide-react";

export default function AdminSideBar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(selectAdminAuth);

  const adminName = user?.name ?? "";
  const adminEmail = user?.email ?? "";

  const linkClass = ({ isActive }) =>
    `ad-side__link ${isActive ? "is-active" : ""}`;

  const subLinkClass = ({ isActive }) =>
    `ad-side__sublink ${isActive ? "is-active" : ""}`;

  // 目前是否位於各群組底下頁面
  const isOrderGroupActive = location.pathname.startsWith("/admin/orders");
  const isUserGroupActive = location.pathname.startsWith("/admin/users");
  const isAdminGroupActive = location.pathname.startsWith("/admin/admins");
  const isInventoryGroupActive = location.pathname.startsWith("/admin/inventory");

  // 預設如果正在群組頁面內，就自動展開
  const [ordersOpen, setOrdersOpen] = useState(isOrderGroupActive);
  const [usersOpen, setUsersOpen] = useState(isUserGroupActive);
  const [adminsOpen, setAdminsOpen] = useState(isAdminGroupActive);
  const [inventoryOpen, setInventoryOpen] = useState(isInventoryGroupActive);

  // useEffect(() => {
  //   // if (isOrderGroupActive) setOrdersOpen(true);
  // }, [isOrderGroupActive]);

  // useEffect(() => {
  //   // if (isUserGroupActive) setUsersOpen(true);
  // }, [isUserGroupActive]);

  // useEffect(() => {
  //   // if (isAdminGroupActive) setAdminsOpen(true);
  // }, [isAdminGroupActive]);

  // useEffect(() => {
  //   // if (isInventoryGroupActive) setInventoryOpen(true);
  // }, [isInventoryGroupActive]);

  const handleLogout = (e) => {
    e.preventDefault();
    if (!window.confirm("確認要登出嗎？")) return;

    dispatch(adminLogout());
    onCloseMobile?.();
    navigate("/admin/login", { replace: true });
  };

  const handleNavClick = () => {
    onCloseMobile?.();
  };

  const handleToggleOrders = () => {
    if (collapsed) onToggleCollapse?.();
    setOrdersOpen((prev) => !prev);
  };

  const handleToggleUsers = () => {
    if (collapsed) onToggleCollapse?.();
    setUsersOpen((prev) => !prev);
  };

  const handleToggleAdmins = () => {
    if (collapsed) onToggleCollapse?.();
    setAdminsOpen((prev) => !prev);
  };

  const handleToggleInventory = () => {
    if (collapsed) onToggleCollapse?.();
    setInventoryOpen((prev) => !prev);
  };

  return (
    <aside
      className={`ad-side ${collapsed ? "is-collapsed" : ""} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      aria-label="後台側邊欄"
    >
      {/* logo + 收合按鈕 */}
      <div className="ad-side__brand">
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

      {/* sidebar內容 */}
      <nav className="ad-side__nav">
        {/* 數據總攬 */}
        <NavLink
          className={linkClass}
          to="/admin/dashboard"
          title="數據總覽"
          onClick={handleNavClick}
        >
          <LayoutDashboard size={18} />
          <span className="ad-side__label">數據總覽</span>
        </NavLink>

        {/* 管理員管理群組 */}
        <div
          className={`ad-side__group ${isAdminGroupActive ? "is-active" : ""} ${
            adminsOpen ? "is-open" : ""
          }`}
        >
          <button
            type="button"
            className="ad-side__groupBtn"
            onClick={handleToggleAdmins}
            aria-expanded={adminsOpen}
            aria-controls="ad-side-admin-group"
            title="管理員管理"
          >
            <BrickWallShield size={18} />
            <span className="ad-side__label">管理員管理</span>
            <ChevronDown size={16} className="ad-side__chev" />
          </button>

          <div className="ad-side__subNav" id="ad-side-admin-group">
            <NavLink
              className={subLinkClass}
              to="/admin/admins"
              title="管理員管理"
              onClick={handleNavClick}
            >
              <ShieldUser size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">管理員資料</span>
            </NavLink>
          </div>
        </div>

        {/* 會員管理群組 */}
        <div
          className={`ad-side__group ${isUserGroupActive ? "is-active" : ""} ${
            usersOpen ? "is-open" : ""
          }`}
        >
          <button
            type="button"
            className="ad-side__groupBtn"
            onClick={handleToggleUsers}
            aria-expanded={usersOpen}
            aria-controls="ad-side-user-group"
            title="會員管理"
          >
            <Users size={18} />
            <span className="ad-side__label">會員管理</span>
            <ChevronDown size={16} className="ad-side__chev" />
          </button>

          <div className="ad-side__subNav" id="ad-side-user-group">
            <NavLink
              className={subLinkClass}
              to="/admin/users"
              title="會員管理"
              onClick={handleNavClick}
            >
              <Contact size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">會員資料</span>
            </NavLink>
          </div>
        </div>

        {/* 訂單管理群組 */}
        <div
          className={`ad-side__group ${isOrderGroupActive ? "is-active" : ""} ${
            ordersOpen ? "is-open" : ""
          }`}
        >
          <button
            type="button"
            className="ad-side__groupBtn"
            onClick={handleToggleOrders}
            aria-expanded={ordersOpen}
            aria-controls="ad-side-order-group"
            title="訂單管理"
          >
            <FolderKanban size={18} />
            <span className="ad-side__label">訂單管理</span>
            <ChevronDown size={16} className="ad-side__chev" />
          </button>

          <div className="ad-side__subNav" id="ad-side-order-group">
            <NavLink
              className={subLinkClass}
              to="/admin/orders"
              title="訂單資料"
              onClick={handleNavClick}
            >
              <ClipboardList
                size={15}
                className="ad-side__subIcon"
                aria-hidden
              />
              <span className="ad-side__label">訂單資料</span>
            </NavLink>

            <NavLink
              className={subLinkClass}
              to="/admin/orders/subscriptions"
              title="訂閱資料"
              onClick={handleNavClick}
            >
              <Repeat size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">訂閱資料</span>
            </NavLink>

            <NavLink
              className={subLinkClass}
              to="/admin/orders/plans"
              title="訂閱方案管理"
              onClick={handleNavClick}
            >
              <Component size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">訂閱方案類型</span>
            </NavLink>
          </div>
        </div>

        {/* 庫存管理群組 */}
        <div
          className={`ad-side__group ${
            isInventoryGroupActive ? "is-active" : ""
          } ${inventoryOpen ? "is-open" : ""}`}
        >
          <button
            type="button"
            className="ad-side__groupBtn"
            onClick={handleToggleInventory}
            aria-expanded={inventoryOpen}
            aria-controls="ad-side-inventory-group"
            title="庫存管理"
          >
            <Boxes size={18} />
            <span className="ad-side__label">庫存管理</span>
            <ChevronDown size={16} className="ad-side__chev" />
          </button>

          <div className="ad-side__subNav" id="ad-side-inventory-group">
            <NavLink
              className={subLinkClass}
              to="/admin/inventory/toys"
              title="寵物玩具"
              onClick={handleNavClick}
            >
              <Package2 size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">寵物玩具</span>
            </NavLink>

            <NavLink
              className={subLinkClass}
              to="/admin/inventory/treats"
              title="寵物零食"
              onClick={handleNavClick}
            >
              <Bone size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">寵物零食</span>
            </NavLink>

            <NavLink
              className={subLinkClass}
              to="/admin/inventory/household"
              title="寵物生活小物"
              onClick={handleNavClick}
            >
              <House size={15} className="ad-side__subIcon" aria-hidden />
              <span className="ad-side__label">寵物生活小物</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* 底部 */}
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
          <LogOut size={16} className="ad-side__logoutIcon me-2" />
          <span className="ad-side__label">登出</span>
        </button>
      </div>
    </aside>
  );
}
