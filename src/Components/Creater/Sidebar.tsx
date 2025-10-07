'use client';

import {
  Home,
  FileText,
  BarChart3,
  Users,
  Settings,
  User,
  Store,
} from 'lucide-react';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Logout from '../Logout';
import { authUtils } from '@/lib/auth';

const sidebarItems = [
  { name: 'Overview', icon: Home, href: '/creator' },
  { name: 'Posts', icon: FileText, href: '/creator/posts' },
  { name: 'Analytics', icon: BarChart3, href: '/creator/analytics' },
  { name: 'Marketplace', icon: Store, href: '/creator/marketplace' },
  { name: 'Competitors', icon: Users, href: '/creator/competitors' },
  { name: 'Settings', icon: Settings, href: '/creator/settings' },
];

// Memoized sidebar item component
const SidebarItem = React.memo(({ 
  item, 
  isActive, 
  onItemClick 
}: { 
  item: typeof sidebarItems[0]; 
  isActive: boolean; 
  onItemClick: (href: string) => void;
}) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onItemClick(item.href);
  }, [onItemClick, item.href]);

  return (
    <button
      className={`group flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 cursor-pointer transition-all duration-300 ease-in-out rounded-lg mx-1.5 transform hover:scale-[1.01] hover:shadow-md text-left ${
        isActive
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-md border border-blue-200/50 scale-[1.01]'
          : 'hover:shadow'
      }`}
      onClick={handleClick}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2.5 transition-all duration-300 ease-in-out ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow scale-105' 
          : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 group-hover:scale-105'
      }`}>
        <item.icon className={`w-4 h-4 transition-all duration-300 ${
          isActive ? 'text-white scale-105' : 'text-gray-600 group-hover:text-blue-600 group-hover:scale-105'
        }`} />
      </div>
      <span className="font-semibold text-sm transition-all duration-300 group-hover:translate-x-1 whitespace-nowrap">{item.name}</span>
    </button>
  );
});

SidebarItem.displayName = 'SidebarItem';

// Memoized user info component
const UserInfo = React.memo(({ user }: { user: Record<string, unknown> | null }) => {
  if (!user) return null;

  return (
    <div className="p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
            {(user.name as string) || (user.email as string) || 'User'}
          </p>
          <p className="text-[11px] text-gray-500 capitalize font-medium leading-tight">
            {(user.role as string) || 'Creator'}
          </p>
        </div>
      </div>
    </div>
  );
});

UserInfo.displayName = 'UserInfo';

const Sidebar = React.memo(() => {
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get user information on component mount
    const userData = authUtils.getUser();
    setUser(userData);
  }, []);

  const handleItemClick = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  // Helper function to determine if a sidebar item is active
  const isItemActive = useCallback((item: typeof sidebarItems[0]) => {
    // Normalize pathname by removing trailing slashes and query params
    const normalizedPathname = pathname.replace(/\/$/, '').split('?')[0];
    const normalizedHref = item.href.replace(/\/$/, '');
    
    // Special case for Overview - only active on exact match
    if (normalizedHref === '/creator') {
      return normalizedPathname === '/creator';
    }
    
    // For all other routes, check if pathname starts with the href
    return normalizedPathname.startsWith(normalizedHref);
  }, [pathname]);

  // Memoized sidebar items
  const sidebarItemsList = useMemo(() => 
    sidebarItems.map((item) => (
      <SidebarItem
        key={item.name}
        item={item}
        isActive={isItemActive(item)}
        onItemClick={handleItemClick}
      />
    )), [isItemActive, handleItemClick]);

  return (
    <div className="fixed left-0 top-0 w-56 h-screen bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-200/50 flex flex-col z-50">
      {/* Enhanced Logo Section */}
      <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <Image
              src="/logo.png"
              alt="Bloocube Logo"
              fill
              className="object-contain p-1"
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced Navigation */}
      <nav className="mt-4 flex-1 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="space-y-1.5">
          {sidebarItemsList}
        </div>
      </nav>
      
      {/* Enhanced User info and logout section */}
      <div className="p-3 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
        <UserInfo user={user} />
        <div className="mt-3">
          <Logout className="w-full justify-center flex bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105" />
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
