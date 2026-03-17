import "./Header.scss";
import "./Header-logout.scss";
import { useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Newspaper, HeartPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsUserAuthed,
  selectUser,
  userLogout,
} from "../../../../slices/userAuthSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import maoriheLogoDefalut from "../../../../assets/images/header/maorihe_logo_defalut.svg";
import avatarDefalut from "../../../../assets/images/header/avatar_defalut.png";
import { toast } from "react-toastify";
import { fetchCart } from "../../../../slices/cartSlice";

// 購物車跳轉邏輯 hook
function useCartNavigate() {
  const navigate = useNavigate();
  const isAuthed = useSelector(selectIsUserAuthed);
  const dispatch = useDispatch();

  const handleCartClick = async () => {
    if (!isAuthed) {
      toast.warn("尚未登入，請先登入會員！");
      navigate("/login");
      return;
    }

    try {
      const action = await dispatch(fetchCart());
      const result = action.payload;
      if (result) {
        navigate("/cart");
      } else {
        toast.info("您的購物車目前沒有商品，將為您跳轉至訂閱流程！");
        navigate("/petinfo");
      }
    } catch {
      toast.error("查詢購物車時發生錯誤，請稍後再試。");
    }
  };

  return handleCartClick;
}

export default function Header() {
  return (
    <header className="container" id="top">
      <nav className="navbar navbar-expand-lg bg-body-white border navbar shadow-sm py-5 px-7">
        <div className="container-fluid d-flex justify-content-between">
          {/* <a className="navbar-brand" href="/"> */}
          {/* vivian修改 */}
          <Link className="navbar-brand" to="/">
            <img
              src={maoriheLogoDefalut}
              alt="Mofudays"
              className="nav-logo"
              width={129}
              height={28}
            />{" "}
          </Link>
          {/* </a> */}
          {/* 右邊（手機）：menu + cart */}
          <MobileTopActions />
          <DesktopMenu />
        </div>
        <NewsModal />
      </nav>
      <MobileOffcanvasMenu />
    </header>
  );
}

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
          <AuthMenu variant="desktop" />
          <NavCartItem />
        </ul>
      </div>
    </div>
  );
}

function MobileOffcanvasMenu() {
  const dispatch = useDispatch();
  const isAuthed = useSelector(selectIsUserAuthed);
  const user = useSelector(selectUser);
  const storedName = localStorage.getItem("userName");
  const displayName = user?.name || storedName || "會員";

  const handleClickLink = () => closeOffcanvasIfAny();
  const handleLogout = () => {
    dispatch(userLogout());
    closeOffcanvasIfAny();
  };

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
                <Newspaper className="align-bottom me-2 nav-icon" />
                最新消息
              </a>
            </li>
            <li className="nav-item text-center py-3">
              <a className="nav-link" href="/blog">
                <HeartPlus className="align-bottom me-2 nav-icon" />
                毛孩照護
              </a>
            </li>
          </ul>
        </nav>

        <div className="w-100 text-center my-2">
          {isAuthed ? (
            <>
              <div className="d-flex align-items-center justify-content-center gap-2 py-2 mb-2">
                <img
                  src={avatarDefalut}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: 44, height: 44, objectFit: "cover" }}
                />
                <div className="fw-medium">{displayName}</div>
              </div>
              <ul className="list-unstyled mx-auto" style={{ maxWidth: 320 }}>
                <li className="py-3">
                  <Link
                    className="nav-link"
                    to="/usercenter/orders"
                    onClick={handleClickLink}
                  >
                    訂單管理
                  </Link>
                </li>
                <li className="py-3 border-top">
                  <Link
                    className="nav-link"
                    to="/usercenter/profile"
                    onClick={handleClickLink}
                  >
                    個人資料管理
                  </Link>
                </li>
                <li className="py-3 border-top">
                  <Link
                    className="nav-link"
                    to="/usercenter/events"
                    onClick={handleClickLink}
                  >
                    會員專屬活動
                  </Link>
                </li>
                <li className="py-3 border-top">
                  <Link
                    className="nav-link"
                    to="/coupons"
                    onClick={handleClickLink}
                  >
                    我的折扣碼
                  </Link>
                </li>
                <li className="py-3 border-top">
                  <button
                    className="nav-link text-danger bg-transparent border-0 w-100"
                    onClick={handleLogout}
                  >
                    登出
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <Link to="/login" onClick={handleClickLink}>
              <button className="btn login-btn rounded-pill" type="button">
                登入會員
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileTopActions() {
  const handleCartClick = useCartNavigate();
  return (
    <div className="d-flex align-items-center gap-3 d-lg-none">
      <button
        className="btn p-0 border-0 d-md-none"
        onClick={handleCartClick}
        aria-label="Cart"
      >
        <ShoppingCart className="nav-icon" />
      </button>
      <button
        className="btn p-0 border-0 d-md-none"
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
  const handleCartClick = useCartNavigate();
  return (
    <li className="nav-item d-none d-md-flex">
      <button
        className="nav-link cart-btn border-2"
        onClick={handleCartClick}
        aria-label="Cart"
      >
        <ShoppingCart className="nav-icon" />
      </button>
    </li>
  );
}

function AuthMenu({ variant = "desktop" }) {
  const isAuthed = useSelector(selectIsUserAuthed);
  const user = useSelector(selectUser);

  if (!isAuthed) {
    return (
      <li className="nav-item me-5">
        <Link to="/login">
          <button className="btn login-btn rounded-pill" type="button">
            登入會員
          </button>
        </Link>
      </li>
    );
  }

  return <LoggedInMenu variant={variant} user={user} />;
}

function LoggedInMenu({ variant, user }) {
  const storedName = localStorage.getItem("userName"); // 看你 localStorage 存的 key 名稱
  const displayName = user?.name || storedName || "會員";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-dropdown")) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div className="text-center">
          <p className="mb-3">確定要登出嗎？</p>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-sm btn-secondary" onClick={closeToast}>
              取消
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                dispatch(userLogout());
                setOpen(false);
                closeOffcanvasIfAny();
                closeToast();
                navigate("/");
              }}
            >
              確認登出
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      },
    );
  };

  const handleClickLink = () => {
    setOpen(false);
    closeOffcanvasIfAny();
  };

  return (
    <li
      className={`nav-item custom-dropdown position-relative ${variant === "desktop" ? "me-5" : ""}`}
    >
      <button
        className="nav-link border-0 bg-transparent d-flex align-items-center gap-2"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={avatarDefalut}
          alt="avatar"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span className="fw-bold">{displayName} 您好</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          className={`list-unstyled dropdown-menu shadow border-0 rounded-3 show ${variant === "mobile" ? "position-static w-100 text-center" : "dropdown-menu-end"}`}
          style={
            variant === "desktop"
              ? { position: "absolute", right: 0, top: "100%" }
              : {}
          }
        >
          <li>
            <Link
              className="dropdown-item text-center py-2 border-bottom"
              to="/usercenter/orders"
              onClick={handleClickLink}
            >
              訂單管理
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item text-center py-2 border-bottom"
              to="/usercenter/profile"
              onClick={handleClickLink}
            >
              個人資料修改
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item text-center py-2 border-bottom"
              to="/usercenter/events"
              onClick={handleClickLink}
            >
              會員專屬活動
            </Link>
          </li>
          {/* <li>
            <Link
              className="dropdown-item text-center py-2 border-bottom"
              to="/coupons"
              onClick={handleClickLink}
            >
              我的折扣碼
            </Link>
          </li> */}
          {/* <li>
            <hr className="dropdown-divider" />
          </li> */}
          <li>
            <button
              className="dropdown-item text-primary text-center py-3 fw-bold"
              type="button"
              onClick={handleLogout}
            >
              登出系統
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}

function closeOffcanvasIfAny() {
  const el = document.getElementById("mobileMenu");
  if (!el) return;
  const bootstrap = window.bootstrap;
  if (bootstrap) {
    const instance = bootstrap.Offcanvas.getInstance(el);
    if (instance) instance.hide();
  }
}

function NewsModal() {
  return (
    <div
      className="modal fade"
      id="newsModal"
      tabIndex={-1}
      aria-labelledby="newsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content rounded-4">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
            <div>
              <h5 className="modal-title fw-bold" id="newsModalLabel">
                NEWS
              </h5>
              <p className="header-subtitle">汪汪來報：這個月的毛毛新鮮事！</p>
            </div>
          </div>
          <div className="modal-body">
            <div className="custom-accordion">
              <div className="accordion" id="customAccordion">
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
                <NewsAccordionItem
                  headingId="headingThree"
                  collapseId="collapseThree"
                  tag="參與活動"
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
                <NewsAccordionItem
                  headingId="headingFour"
                  collapseId="collapseFour"
                  tag="品牌合作"
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
      {/* accordion-header 改回 div，但拿掉 id（id 放在這層沒作用，Bootstrap 用 aria-labelledby 對應 collapse） */}
      <div className="accordion-header d-flex align-items-center">
        <span className="function-tag">{tag}</span>
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
