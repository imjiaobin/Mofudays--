import { RouterProvider } from "react-router";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initUserAuth } from "./slices/userAuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUserAuth()); // App 啟動時驗證 token，取代 AuthContext 的 initAuth
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
