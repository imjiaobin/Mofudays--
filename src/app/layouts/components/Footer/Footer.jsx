import { useState, useEffect } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

//圖片載入
import footerLogo from "../../../../assets/images/footer/footer-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      {/* footer info */}
      <div className="footer-info">
        <div className="container">
          <div className="d-lg-flex text-center text-md-start align-items-center">
            <FooterLeft />
            <FooterRight />
          </div>
        </div>

        <BackToTop />
      </div>

      <Copyright />
    </footer>
  );
}

/* ------------------ Left ------------------ */

function FooterLeft() {
  return (
    <div className="container">
      <div className="col-12 col-lg-6 d-flex flex-column flex-md-row align-items-center gap-3">
        <div className="d-flex align-items-center gap-2 mb-0">
          <a href="index.html">
            <img src={footerLogo} alt="logo" className="footer-logo" />
          </a>
        </div>

        <div className="d-inline-flex flex-column align-items-center align-items-lg-start text-start gap-3 footer-contact">
          {/* Desktop contact */}
          <div>
            <a
              href="tel:0227341788"
              className="d-none d-lg-flex align-items-center footer-link mb-lg-4"
            >
              <IconMessageCircle className="me-4 ms-2" />
              02-27341788
            </a>

            <a
              href="mailto:service.maorihe@gmail.com"
              className="d-flex footer-link mb-4 d-none d-md-flex"
            >
              <IconMail className="me-4 ms-2" />
              <p>service.maorihe@gmail.com</p>
            </a>
          </div>

          <SocialLinks />

          {/* Mobile contact */}
          <div className="d-lg-none">
            <a
              href="tel:0227341788"
              className="d-flex align-items-center gap-2 footer-link mb-2"
            >
              <IconMessageCircle className="me-4 ms-2" />
              <span>02-27341788</span>
            </a>
            <a
              href="mailto:service.maorihe@gmail.com"
              className="d-flex align-items-center gap-2 footer-link mb-2"
            >
              <IconMail className="me-4 ms-2" />
              <span>service.maorihe@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="mb-lg-0 mb-32 d-flex gap-2">
      <a
        href="#"
        className="btn social-btn"
        aria-current="page"
        aria-label="Facebook"
      >
        <IconFacebook />
      </a>
      <a href="#" className="btn social-btn" aria-label="Instagram">
        <IconInstagram />
      </a>
      <a href="#" className="btn social-btn" aria-label="Contact">
        <IconAtSign />
      </a>
    </div>
  );
}

/* ------------------ Right ------------------ */

function FooterRight() {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-md-evenly gap-4 gap-lg-0">
        <FooterLinkList
          title="外部資源"
          items={[
            { label: "寵物殯葬", href: "#" },
            { label: "寵物醫療", href: "#" },
            { label: "寵物保險", href: "#" },
            { label: "浪浪援助", href: "#" },
          ]}
        />

        <FooterLinkList
          title="常見問題"
          items={[
            { label: "FAQ", to: "/faq" },
            { label: "物流配送", to: "/faq" },
            { label: "退換貨政策", to: "/faq" },
            { label: "細則與條款", to: "/faq" },
          ]}
        />
      </div>
    </div>
  );
}

function FooterLinkList({ title, items }) {
  return (
    <div className="col-4">
      <ul className="footer-list text-center">
        <li className="zen-maru-gothic-regular py-2 border-bottom mb-3">
          {title}
        </li>
        {items.map((it) => (
          <li className="py-2" key={it.label}>
            {/* 判斷：如果有 to 屬性就用 React Router 的 Link，否則用一般 a 標籤 */}
            {it.to ? (
              <Link to={it.to}>{it.label}</Link>
            ) : (
              <a href={it.href || "#"}>{it.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------ Back to top + Copyright ------------------ */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 捲超過 300px 才顯示按鈕
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="btn btn-totop rounded-circle"
      aria-label="Back to top"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
      <IconArrowBigUp />
    </button>
  );
}

function Copyright() {
  return (
    <div className="footer-copyright text-center">
      <p>© Copyright 2025 MAORIHE. All Rights Reserved</p>
    </div>
  );
}

/* ------------------ SVG Icons (把 stroke-* 改成 camelCase) ------------------ */

function IconMessageCircle({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-message-circle-icon lucide-message-circle ${className}`}
      aria-hidden="true"
    >
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
    </svg>
  );
}

function IconMail({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-mail-icon lucide-mail ${className}`}
      aria-hidden="true"
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-facebook-icon lucide-facebook"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-instagram-icon lucide-instagram"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconAtSign() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-at-sign-icon lucide-at-sign"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}

function IconArrowBigUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-big-up-icon lucide-arrow-big-up"
      aria-hidden="true"
    >
      <path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
    </svg>
  );
}
