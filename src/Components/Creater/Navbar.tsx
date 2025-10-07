"use client";

import {
  User,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  UserCircle,
  Gavel,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

const Navbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("User logged out");
    // Add logout logic here (e.g., clear token, redirect)
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleMyBids = () => {
    router.push("/creator/mybids");
  };

  return (
    <header className="h-16 bg-dashboard-navbar border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button */}
        <div
          className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <PanelLeftClose className="h-4 w-4 text-gray-600" />
          ) : (
            <PanelLeftOpen className="h-4 w-4 text-gray-600" />
          )}
        </div>

        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--custom-blue)" }}
        >
          Bloocube
        </h1>
      </div>

      {/* Profile Dropdown */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-gray-300 hover:ring-purple-500 transition">
              <AvatarImage src="/user-photo.jpg" alt="Profile Photo" />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44 bg-white shadow-lg rounded-xl border"
          >
            <DropdownMenuLabel className="text-gray-700 text-center font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer hover:text-purple-600"
              onClick={handleProfile}
            >
              <UserCircle className="h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer hover:text-purple-600"
              onClick={handleMyBids}
            >
              <Gavel className="h-4 w-4" />
              My Bids
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
