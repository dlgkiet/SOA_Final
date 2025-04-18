import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/auth-store";

const navLinks = {
  student: [
    { title: "Khóa học", href: "/student/courses" },
    { title: "Bài kiểm tra", href: "/assignments" },
  ],
  teacher: [{ title: "Quản lý khóa học", href: "/teacher/courses" }],
  admin: [
    { title: "Quản lý người dùng", href: "/manage-users" },
    { title: "Cấu hình hệ thống", href: "/settings" },
    { title: "Báo cáo thống kê", href: "/reports" },
    { title: "Nhật ký hoạt động", href: "/logs" },
  ],
};

const Navbar = () => {
  const { _ui } = useAuthStore();
  const role = (_ui?.role as "student" | "teacher" | "admin") || "student";

  const navigationLinks = navLinks[role] || [];

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md pb-0">
      <div className="inline-flex w-full items-end justify-start">
        <div className="flex px-6">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              asChild
              className="hover:bg-transparent pl-0 hover:font-semibold focus-visible:!ring-0 focus-visible:!ring-transparent"
            >
              <Link to="/">Trang chủ</Link>
            </Button>

            {navigationLinks.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                asChild
                className="hover:bg-transparent hover:font-semibold outline-none"
              >
                <Link to={item.href}>{item.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
};

export default Navbar;
