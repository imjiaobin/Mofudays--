import { ReceiptText } from "lucide-react";

export default function OrderTitle({ flash }) {
  return (
    <section className="admin-pages__title mb-5">
      <div className="admin-pages__titleCard">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">後台管理</li>
            <li className="breadcrumb-item" aria-current="page">
              訂單管理
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-start gap-3">
          <div className="admin-pages__titleIcon">
            <ReceiptText size={28} />
          </div>

          <div>
            <h1 className="admin-pages__titleText m-0">訂單管理</h1>
            <div className="admin-pages__titleSub mt-1">
              針對訂單進行查詢、編輯、檢視明細與刪除。
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