import { Users } from "lucide-react";

export default function AdminTitle({ flash }) {
  return (
    <section className="admin-pages__title mb-5">
      <div className="admin-pages__titleCard">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">後台管理</li>
            <li className="breadcrumb-item" aria-current="page">
              使用者管理
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-start gap-3">
          <div className="admin-pages__titleIcon">
            <Users size={28} />
          </div>

          <div>
            <h1 className="admin-pages__titleText m-0">使用者管理</h1>
            <div className="admin-pages__titleSub mt-1">
              針對前台使用者帳號進行查詢、新增、修改與停用。
            </div>
          </div>
        </div>
      </div>

      {flash && (
        <div className={`alert alert-${flash.type} py-2 mt-3`} role="alert">
          {flash.message}
        </div>
      )}
    </section>
  );
}