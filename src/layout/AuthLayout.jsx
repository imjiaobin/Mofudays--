import { Outlet } from "react-router-dom";
import Header from "../app/layouts/components/Header/Header";
import Footer from "../app/layouts/components/Footer/Footer";

export default function AuthLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
