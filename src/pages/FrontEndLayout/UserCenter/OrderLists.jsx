import { useMemo, useState } from "react";

import petToy from "../../../assets/images/userCenter/pet-toy.png";
import petSnack from "../../../assets/images/userCenter/pet_snack.png";

export const MOCK_ORDERS = [
  {
    id: "00003",
    purchasedAt: "2025/08/10",
    name: "新手爸媽安心組",
    unitPrice: 699,
    qty: 3,
    total: 2097,
    latestShipAt: null,
    status: "待結帳",
    payStatus: "UNPAID", // UNPAID | PAID
  },
  {
    id: "00002",
    purchasedAt: "2025/08/09",
    name: "青春汪能量補給包",
    unitPrice: 699,
    qty: 2,
    total: 1398,
    latestShipAt: "2025/08/12",
    status: "運送中",
    payStatus: "PAID",
  },
  {
    id: "00001",
    purchasedAt: "2025/08/03",
    name: "牛氣補補能量盒",
    unitPrice: 1699,
    qty: 1,
    total: 1699,
    latestShipAt: "2025/08/06",
    status: "已取貨(2025/08/05)",
    payStatus: "PAID",
  },
  // ✅ 多塞幾筆，方便你看 pagination（可調整）
  {
    id: "00004",
    purchasedAt: "2025/08/12",
    name: "狗狗健康小補給",
    unitPrice: 399,
    qty: 1,
    total: 399,
    latestShipAt: "2025/08/15",
    status: "處理中",
    payStatus: "PAID",
  },
  {
    id: "00005",
    purchasedAt: "2025/08/13",
    name: "汪汪咬咬玩具組",
    unitPrice: 499,
    qty: 2,
    total: 998,
    latestShipAt: "2025/08/16",
    status: "待結帳",
    payStatus: "UNPAID",
  },
  {
    id: "00006",
    purchasedAt: "2025/08/14",
    name: "清爽夏日零食包",
    unitPrice: 299,
    qty: 3,
    total: 897,
    latestShipAt: null,
    status: "待結帳",
    payStatus: "UNPAID",
  },
  {
    id: "00007",
    purchasedAt: "2025/08/15",
    name: "毛孩保健罐頭組",
    unitPrice: 799,
    qty: 1,
    total: 799,
    latestShipAt: "2025/08/18",
    status: "運送中",
    payStatus: "PAID",
  },
];

const PAGE_SIZE = 3;

export default function OrderList() {
  // all | unpaid | paid
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (active === "unpaid")
      return MOCK_ORDERS.filter((o) => o.payStatus === "UNPAID");
    if (active === "paid")
      return MOCK_ORDERS.filter((o) => o.payStatus === "PAID");
    return MOCK_ORDERS;
  }, [active]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  }, [filtered.length]);

  const pageOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // 切 tab 時把 page reset（避免切到一個不存在的頁）
  const handleTab = (next) => {
    setActive(next);
    setPage(1);
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handlePrev = (e) => {
    e.preventDefault();
    if (!canPrev) return;
    setPage((p) => p - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!canNext) return;
    setPage((p) => p + 1);
  };

  const handlePage = (e, p) => {
    e.preventDefault();
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="member-orderlist mt-16">
      {/* 內層 tabs：我們改成 React 控制（不靠 data-bs-toggle） */}
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link p1 fw-500 ${active === "all" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={active === "all"}
            onClick={() => handleTab("all")}
          >
            總覽
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className={`nav-link p1 fw-500 ${active === "unpaid" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={active === "unpaid"}
            onClick={() => handleTab("unpaid")}
          >
            未結帳
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className={`nav-link p1 fw-500 ${active === "paid" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={active === "paid"}
            onClick={() => handleTab("paid")}
          >
            已結帳
          </button>
        </li>
      </ul>

      {/* table */}
      <div className="orderlist-table-wrap">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">購買時間</th>
              <th scope="col">名稱/編號</th>
              <th scope="col">單價</th>
              <th scope="col">數量</th>
              <th scope="col">總金額</th>
              <th scope="col">預計最晚出貨日</th>
              <th scope="col">訂單狀態</th>
            </tr>
          </thead>

          <tbody>
            {pageOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  目前沒有符合條件的訂單
                </td>
              </tr>
            ) : (
              pageOrders.map((o) => (
                <tr key={o.id}>
                  <td scope="row">{o.purchasedAt}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`之後會做訂單詳情頁：#${o.id}`);
                      }}
                    >
                      {o.name}
                      <br />
                      <span className="order-number">訂單編號 #{o.id}</span>
                    </a>
                  </td>
                  <td>${money(o.unitPrice)}</td>
                  <td>{o.qty}</td>
                  <td>${money(o.total)}</td>
                  <td>{o.latestShipAt ?? "-"}</td>
                  <td>{o.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 裝飾圖 */}
      <div className="d-flex justify-content-end mt-48">
        <img
          src={petToy}
          alt="寵物玩具圖, 包含狗骨頭和兩個球"
          className="img-pet-toy img-shake"
        />
        <img
          src={petSnack}
          alt="寵物點心包"
          className="img-pet-snack img-shake"
        />
      </div>

      {/* pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-bottom mt-16 mb-32">
          <li className={`page-item ${!canPrev ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={handlePrev}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {Array.from({ length: totalPages }, (_, idx) => {
            const p = idx + 1;
            return (
              <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => handlePage(e, p)}
                >
                  {p}
                </a>
              </li>
            );
          })}

          <li className={`page-item ${!canNext ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={handleNext}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function money(n) {
  const num = Number(n) || 0;
  return num.toLocaleString("zh-Hant");
}
