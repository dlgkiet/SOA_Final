import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  ChevronDown,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "./navbar";
import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/react/shallow";
import { logout } from "@/api/auth";
import { toast } from "sonner";

export default function Header() {
  const navigate = useNavigate();
  const { _ui, resetUserInformation, setIsAuthenticated } = useAuthStore(
    useShallow((state) => state)
  );

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      document.cookie =
        "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Xóa cookie thủ công
      resetUserInformation();
      setIsAuthenticated(false);
      navigate("/login");
      toast.success("Đăng xuất thành công!");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-xl shadow-sm border-b border-gray-200">
      {/* Top Section */}
      <div className="h-[50px] px-6 flex items-center justify-between">
        {/* Left: Logo & Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-800"
          >
            <BookOpen className="w-6 h-6 text-blue-500" />
            <span>LMS System</span>
          </Link>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <Button variant="ghost" className="relative p-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {/* Badge content */}
            </span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-gray-700 font-medium">
                  {_ui?.name || "Người dùng"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-48 shadow-lg rounded-md bg-white">
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100">
                <Settings className="w-4 h-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Navbar />
    </header>
  );
}
