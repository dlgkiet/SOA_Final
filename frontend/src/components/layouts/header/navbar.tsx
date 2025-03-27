import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/auth-store";

const navLinks = {
  student: [
    { title: "Khóa học", href: "/courses" },
    { title: "Lớp học", href: "/classrooms" },
    { title: "Bài tập", href: "/assignments" },
    { title: "Lịch học", href: "/schedule" },
  ],
  teacher: [
    { title: "Quản lý khóa học", href: "/teacher/courses" },
    { title: "Chấm bài", href: "/grading" },
    { title: "Thống kê", href: "/statistics" },
  ],
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
  console.log(role);

  const navigationLinks = navLinks[role] || [];

  console.log("Role:", role);
  console.log("Navigation Links:", navigationLinks);

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
