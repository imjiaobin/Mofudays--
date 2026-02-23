import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import AdminSideBar from "../pages/BackEndLayout/AdminSideBar/AdminSideBar";
import "../styles/AdminStyle/adminLayout.scss";

export default function AdminLayout() {
  const location = useLocation();

  // Sidebar收合
  const [isSideCollapsed, setIsSideCollapsed] = useState(() => {
    return localStorage.getItem("admin_sidebar_collapsed") === "1";
  });

  // 手機板 Sidebar 收合
  const [isMobileSideOpen, setIsMobileSideOpen] = useState(false);

  // 記住 sidebar 收合狀態（桌機）
  useEffect(() => {
    localStorage.setItem("admin_sidebar_collapsed", isSideCollapsed ? "1" : "0");
  }, [isSideCollapsed]);

  // 路由切換時，自動關閉手機 drawer
  useEffect(() => {
    setIsMobileSideOpen(false);
  }, [location.pathname]);

  // 手機 drawer 開啟時，鎖住 body 捲動（避免背景跟著滾）
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (isMobileSideOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow || "";
    }

    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isMobileSideOpen]);

  return (
    <div
      className={[
        "ad-dashboard",
        isSideCollapsed ? "is-side-collapsed" : "",
        isMobileSideOpen ? "is-mobile-side-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 手機版遮罩 */}
      <button
        type="button"
        className="ad-side__overlay"
        aria-label="關閉側邊欄"
        onClick={() => setIsMobileSideOpen(false)}
      />

      <AdminSideBar
        collapsed={isSideCollapsed}
        onToggleCollapse={() => setIsSideCollapsed((prev) => !prev)}
        mobileOpen={isMobileSideOpen}
        onCloseMobile={() => setIsMobileSideOpen(false)}
      />

      <main className="ad-main">
        {/* 手機版頂部工具列 */}
        <div className="ad-mobileTopbar">
          <button
            type="button"
            className="ad-mobileTopbar__menuBtn"
            onClick={() => setIsMobileSideOpen(true)}
            aria-label="開啟側邊欄"
            title="開啟側邊欄"
          >
            <Menu size={20} />
          </button>
          <div className="ad-mobileTopbar__title">毛日和後台系統</div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
