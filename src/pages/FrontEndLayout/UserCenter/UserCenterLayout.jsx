import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./userCenter.scss";

export default function UserCenterLayout() {
  useEffect(() => {
    document.title = "毛日和-會員中心";
  }, []);

  return (
    <main className="member-center position-relative mb-80">
      <div className="container-xl">
        <div className="row">
          <div className="col-12">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
