import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const studentNavLinks = [
  { title: "Khóa học", href: "/courses" },
  { title: "Lớp học", href: "/classrooms" },
  { title: "Bài tập", href: "/assignments" },
  { title: "Lịch học", href: "/schedule" },
];

const teacherNavLinks = [
  { title: "Quản lý khóa học", href: "/manage-courses" },
  { title: "Quản lý lớp học", href: "/manage-classrooms" },
  { title: "Chấm bài", href: "/grading" },
  { title: "Thống kê", href: "/statistics" },
];

const Navbar = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role ?? "student"; // Mặc định là student nếu không có role

  const navigationLinks = useMemo(
    () => (role === "teacher" ? teacherNavLinks : studentNavLinks),
    [role]
  );

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
              <Link to="/dashboard">Tổng quan</Link>
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
