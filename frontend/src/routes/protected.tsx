import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/stores/auth-store";
import Forbidden from "@/pages/errors/forbidden";

interface ProtectedRouteProps extends PropsWithChildren {
  allowedRoles?: string[];
}

const ProtectedRoute = ({
  allowedRoles = [],
  children,
}: ProtectedRouteProps) => {
  const { _ia, _p } = useAuthStore(useShallow((state) => state)); // Lấy dữ liệu từ store
  const isAuthenticated = _ia; // Kiểm tra đăng nhập
  const permissions = _p || []; // Lấy danh sách quyền, mặc định là []

  console.log("Authen: ", isAuthenticated, "Permissions: ", permissions);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

  // Kiểm tra xem user có ít nhất 1 quyền phù hợp không
  const hasPermission = allowedRoles.some((role) => permissions.includes(role));

//   if (!hasPermission) {
//     return <Forbidden />; // Hiển thị trang không có quyền truy cập
//   }

  return <>{children}</>;
};

export default ProtectedRoute;
