// import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Root from "./Root";

const ProtectedRoutes = () => {
  // const { auth } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token") ?? "";
  return JSON.parse(token) ? (
    <Root />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
