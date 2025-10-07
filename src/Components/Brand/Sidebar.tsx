"use client";

import {
  Users,
  Settings,
  NotebookPen,
  ChartLine,
  LayoutDashboard,
  Package,
  Megaphone,
} from "lucide-react";
import React from "react";
import Link from "next/link";

const sidebarItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/brand" },
  //   { name: "Posts", icon: NotebookPen, href: "tor/posts" },
  { name: "Analytics", icon: ChartLine, href: "/brand/analytics" },
  { name: "Compaigns", icon: Megaphone, href: "/brand/campaigns" },
  { name: "Marketplace", icon: Package, href: "/brand/marketplace" },
  { name: "Settings", icon: Settings, href: "/brand/settings" },
];

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`bg-white shadow-lg h-screen transition-all duration-300 overflow-hidden ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <nav className="mt-6 flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="whitespace-nowrap transition-all duration-300 ml-2">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
