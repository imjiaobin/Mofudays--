import { Outlet } from "react-router-dom";
import Header from "../app/layouts/components/Header/Header";
import Footer from "../app/layouts/components/Footer/Footer";

function FrontEndLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default FrontEndLayout;
