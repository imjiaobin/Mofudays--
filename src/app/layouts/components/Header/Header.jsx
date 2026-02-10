import "./Header.scss";
import "./Header-logout.scss";
import { Menu, ShoppingCart, Newspaper, HeartPlus } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

//匯入圖片
import maoriheLogoDefalut from "../../../../assets/images/header/maorihe_logo_defalut.svg";

export default function Header() {
  return (
    <header className="container" id="top">
      <nav className="navbar navbar-expand-lg bg-body-white border navbar shadow-sm py-5 px-7">
        <div className="container-fluid d-flex justify-content-between">
          <a className="navbar-brand" href="/">
            <img
              src={maoriheLogoDefalut}
              alt="Mofudays"
              className="nav-logo"
              width={129}
              height={28}
            />
          </a>

          {/* 右邊（手機）：menu + cart */}
          <MobileTopActions />

          {/* 右邊（桌機）：nav + cart */}
          <DesktopMenu />
        </div>

        <NewsModal />
      </nav>

      <MobileOffcanvasMenu />
    </header>
  );
}

/* ------------------ Desktop menu ------------------ */

function DesktopMenu() {
  return (
    <div className="desktop-menu ms-auto align-items-center">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <NavNewsItem />
          <NavBlogItem />

          {/*這裡：原本 NavLoginItem() 改成 AuthMenu */}
          <AuthMenu variant="desktop" />

          <NavCartItem />
        </ul>
      </div>
    </div>
  );
}

/* ------------------ Mobile Offcanvas ------------------ */

function MobileOffcanvasMenu() {
  return (
    <div
      className="offcanvas offcanvas-top offcanvas-mobile-full d-md-none"
      tabIndex={-1}
      id="mobileMenu"
      aria-labelledby="mobileMenuLabel"
      data-bs-scroll="true"
    >
      <div className="offcanvas-body d-flex flex-column align-items-center justify-content-between px-4 py-4">
        <nav className="w-100" aria-label="Mobile main">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 mt-3 me-3 z-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />

          <ul className="list-mb list-unstyled mb-4">
            <li className="nav-item py-3 border-bottom text-center">
              <a
                className="nav-link active"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#newsModal"
                aria-current="page"
              >
                <i
                  data-lucide="newspaper"
                  className="align-bottom me-2 nav-icon"
                />
                最新消息
              </a>
            </li>

            <li className="nav-item text-center py-3">
              <a className="nav-link" href="blog.html">
                <i
                  data-lucide="heart-plus"
                  className="align-bottom me-2 nav-icon"
                />
                毛孩照護
              </a>
            </li>
          </ul>
        </nav>

        {/*這裡：原本固定顯示登入按鈕，改成 AuthMenu */}
        <div className="w-100 text-center my-2">
          <AuthMenu variant="mobile" />
        </div>
      </div>
    </div>
  );
}

/* ------------------ Mobile top actions ------------------ */

function MobileTopActions() {
  return (
    <div className="d-flex align-items-center gap-3 d-lg-none">
      <Link to="/cart" className="btn p-0 border-0" aria-label="Cart">
        <ShoppingCart className="nav-icon" />
      </Link>

      <button
        className="btn p-0 border-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileMenu"
        aria-controls="mobileMenu"
        aria-label="Open menu"
      >
        <Menu className="nav-menu-icon" />
      </button>
    </div>
  );
}

function NavNewsItem() {
  return (
    <li className="nav-item me-6">
      <a
        className="nav-link active"
        aria-current="page"
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#newsModal"
      >
        <Newspaper className="align-bottom me-2 nav-icon" />
        最新消息
      </a>
    </li>
  );
}

function NavBlogItem() {
  return (
    <li className="nav-item me-6">
      <a className="nav-link" href="/blog">
        <HeartPlus className="align-bottom me-2 nav-icon" />
        毛孩照護
      </a>
    </li>
  );
}

function NavCartItem() {
  return (
    <li className="nav-item d-none d-md-flex">
      <a className="nav-link cart-btn" href="/cart" aria-label="Cart">
        <ShoppingCart className="nav-icon" />
      </a>
    </li>
  );
}

/* ------------------ News Modal ------------------ */

function NewsModal() {
  return (
    <div
      className="modal fade"
      id="newsModal"
      tabIndex={-1}
      aria-labelledby="newsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4">
          {/* Modal header */}
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />

            {/* 標題區域 */}
            <div>
              <h5 className="modal-title fw-bold" id="newsModalLabel">
                NEWS
              </h5>
              <p className="header-subtitle">汪汪來報：這個月的毛毛新鮮事！</p>
            </div>
          </div>

          <div className="modal-body">
            <div className="custom-accordion py-8">
              <div className="accordion" id="customAccordion">
                {/* 1 */}
                <NewsAccordionItem
                  headingId="headingOne"
                  collapseId="collapseOne"
                  tag="功能更新"
                  title="全新訂閱頁面上線啦！操作更順暢，推薦更精準"
                  date="2025 / 08 / 25"
                >
                  我們的訂閱頁面全面升級囉！
                  <br />
                  填寫毛孩資料後，系統會更聰明地推薦合適方案。
                  <br />
                  還搭流程更清晰，畫面更美觀好操作～
                  <br />
                  快來體驗新版訂閱流程，一起為毛孩挑出最棒的驚喜盒！
                </NewsAccordionItem>

                {/* 2 */}
                <NewsAccordionItem
                  headingId="headingTwo"
                  collapseId="collapseTwo"
                  tag="官方公告"
                  title="配送時間異動通知 因應颱風物流調整，敬請留意"
                  date="2025 / 08 / 02"
                >
                  受到颱風影響，部分地區配送時間可能延後 2～3 天。
                  <br />
                  我們會密切追蹤物流狀況，確保盒子安全送達。
                  <br />
                  造成不便敬請見諒，也感謝您的體諒與耐心等候。
                  <br />
                  若有急件或地址異動，歡迎隨時聯絡我們協助！
                </NewsAccordionItem>

                {/* 3 */}
                <NewsAccordionItem
                  headingId="headingThree"
                  collapseId="collapseThree"
                  tag="回饋 / 參與活動"
                  title="月月開箱投稿募集！曬毛孩照片登上首頁"
                  date="2025 / 08 / 01"
                >
                  喜歡開箱的毛孩快舉爪！
                  <br />
                  只要拍下毛孩開箱的療癒瞬間，上傳分享就有機會登上首頁～
                  <br />
                  每月我們都會選出幾位人氣毛星人，送出專屬小禮。
                  <br />
                  別忘了標記 @毛日和，讓更多人看到你家寶貝的魅力！
                </NewsAccordionItem>

                {/* 4 */}
                <NewsAccordionItem
                  headingId="headingFour"
                  collapseId="collapseFour"
                  tag="產品與品牌合作"
                  title="全品牌快閃市集毛日和首次實體活動即將開跑！"
                  date="2025 / 07 / 15"
                >
                  毛日和要走出螢幕，和你們面對面見面啦！
                  <br />
                  我們將參加本月的寵物主題快閃市集，帶來限定互動與小禮包。
                  <br />
                  現場還有快閃抽獎、限量福袋、毛孩拍照區等你來玩～
                  <br />
                  活動地點與時間將於下週公布，敬請期待！
                </NewsAccordionItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Accordion item helper ------------------ */

function NewsAccordionItem({
  headingId,
  collapseId,
  tag,
  title,
  date,
  children,
}) {
  return (
    <div className="accordion-item">
      <div className="accordion-header" id={headingId}>
        <div className="function-tag">{tag}</div>

        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="false"
          aria-controls={collapseId}
        >
          {title}
        </button>
      </div>

      <div
        id={collapseId}
        className="accordion-collapse collapse"
        aria-labelledby={headingId}
        data-bs-parent="#customAccordion"
      >
        <div className="accordion-body">
          <div className="content-text">{children}</div>
          <div className="date-tag">{date}</div>
        </div>
      </div>
    </div>
  );
}

/* =======================================================
   AuthMenu：登入前/後切換（Desktop + Mobile 共用）
   ======================================================= */

function AuthMenu({ variant = "desktop" }) {
  const { isAuthed, user, logout } = useAuth();

  // 未登入：顯示按鈕
  if (!isAuthed) {
    // desktop 是 <li>，mobile 在 offcanvas 裡也可以用 <li> 以保持樣式一致
    return (
      <li className={`nav-item ${variant === "desktop" ? "me-5" : ""}`}>
        <Link to="/login">
          <button className="btn login-btn rounded-pill" type="button">
            登入會員
          </button>
        </Link>
      </li>
    );
  }

  // 已登入：顯示姓名下拉
  // 如果是在 offcanvas 裡，點選 dropdown item 後最好順便把 offcanvas 關掉
  const handleLogout = () => {
    logout();
    closeOffcanvasIfAny();
  };

  const handleClickLink = () => {
    closeOffcanvasIfAny();
  };

  return (
    <li className={`nav-item dropdown ${variant === "desktop" ? "me-5" : ""}`}>
      <button
        className="btn login-btn rounded-pill dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="icon-user" aria-hidden="true" />
        <span>{user?.name || "會員"}</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="dropdown-item" href="/orders" onClick={handleClickLink}>
            訂單管理
          </a>
        </li>
        <li>
          <Link
            to="/member"
            className="dropdown-item"
            onClick={handleClickLink}
          >
            個人資料修改
          </Link>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="/member/exclusive"
            onClick={handleClickLink}
          >
            會員專屬活動
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="/coupons"
            onClick={handleClickLink}
          >
            我的折扣碼
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item text-danger"
            type="button"
            onClick={handleLogout}
          >
            登出
          </button>
        </li>
      </ul>
    </li>
  );
}

// 在 mobile offcanvas 點選選單後希望自動關閉
function closeOffcanvasIfAny() {
  const el = document.getElementById("mobileMenu");
  if (!el) return;
  // bootstrap offcanvas instance
  const instance = window.bootstrap?.Offcanvas?.getInstance(el);
  if (instance) instance.hide();
}
