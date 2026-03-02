import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsUserAuthed,
  selectUserIsInitialized,
} from "../slices/userAuthSlice";

export default function RequireAuth({ children }) {
  const isAuthed = useSelector(selectIsUserAuthed);
  const isInitialized = useSelector(selectUserIsInitialized);

  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          color: "#8d6e63",
        }}
      >
        <div className="spinner-border me-2" role="status"></div>
        身分驗證中...
      </div>
    );
  }

  return isAuthed ? children : <Navigate to="/login" replace />;
}
