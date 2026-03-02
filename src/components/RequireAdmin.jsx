import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdminAuthed } from "../slices/adminAuthSlice";

export default function RequireAdmin({ children }) {
  const isAuthed = useSelector(selectIsAdminAuthed);
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
