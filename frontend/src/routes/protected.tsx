import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import Forbidden from "@/pages/errors/forbidden";

interface ProtectedRouteProps extends PropsWithChildren {
  allowedRoles: string[]; // Danh sách role được phép truy cập
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { _ia, _ui } = useAuthStore(); // Lấy thông tin user từ store
  const isAuthenticated = _ia;
  const role = _ui?.role; // Role của user

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (!role || !allowedRoles.includes(role)) {
  //   return <Forbidden />; // Hiển thị trang không có quyền truy cập
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
