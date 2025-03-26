import React from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, User, ChevronDown, BookOpen, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="sticky top-0 border-b z-50 backdrop-blur-xl bg-white shadow-sm">
      {/* Top Section */}
      <div className="h-[50px] px-6 flex items-center justify-between">
        {/* Left: Logo & Menu Button */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="lg:hidden p-2">
            <Menu className="w-6 h-6" />
          </Button>
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>LMS System</span>
          </Link>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <Button variant="ghost" className="relative p-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-gray-700 font-medium">John Doe</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-48 shadow-lg rounded-md">
              <DropdownMenuItem className="flex items-center gap-2 p-2">
                <User className="w-4 h-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 p-2">
                <Settings className="w-4 h-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 p-2">
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
