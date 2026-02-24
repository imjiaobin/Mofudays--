import { Outlet, useLocation } from "react-router-dom";
import Header from "../app/layouts/components/Header/Header";
import Footer from "../app/layouts/components/Footer/Footer";

import { useLayoutEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function FrontEndLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default FrontEndLayout;
