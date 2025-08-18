"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserPlus,
  Settings,
  Menu,
  X,
  LogOut,
  BarChart3,
  FileText,
  School,
  Search,
} from "lucide-react";

const SideBarDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "ড্যাশবোর্ড",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "ছাত্র-ছাত্রী",
      href: "/dashboard/students",
      icon: GraduationCap,
      current: pathname === "/dashboard/students",
    },
    {
      name: "কর্মকর্তা-কর্মচারী",
      href: "/dashboard/staff",
      icon: Users,
      current: pathname === "/dashboard/staff",
    },
    {
      name: "ছাত্র-ছাত্রী যোগ করুন",
      href: "/dashboard/studentadd",
      icon: UserPlus,
      current: pathname === "/dshboard/studentadd",
    },
    {
      name: "কর্মকর্তা যোগ করুন",
      href: "/dashboard/Staffadd",
      icon: UserPlus,
      current: pathname === "/dashboard/Staffadd",
    },
    // {
    //   name: "শ্রেণি ব্যবস্থাপনা",
    //   href: "/dashboard/classes",
    //   icon: School,
    //   current: pathname === "/dashboard/classes",
    // },
    // {
    //   name: "পরীক্ষা ব্যবস্থাপনা",
    //   href: "/dashboard/exams",
    //   icon: BookOpen,
    //   current: pathname === "/dashboard/exams",
    // },

{
  name: "রেজাল্ট যোগ করুন",
  href: "/dashboard/resultadd",
  icon: BarChart3, // চাইলে অন্য আইকন দাও
  current: pathname === "/dashboard/resultadd", // ঠিক path দাও (d ছোট)
},
    {
      name: "নোটিশ",
      href: "/dashboard/notices",
      icon: FileText,
      current: pathname === "/Dashboard/notices",
    },
    {
      name: "সেটিংস",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-white shadow-lg border border-gray-200 hover:bg-gray-50"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? "-translate-x-56" : "translate-x-0"}
        ${isMobileOpen ? "translate-x-0" : "lg:translate-x-0 -translate-x-56"}
        lg:relative lg:translate-x-0
      `}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">পৈথারা</h1>
                  <p className="text-xs text-gray-500">উচ্চ বিদ্যালয়</p>
                </div>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          {!isCollapsed && (
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="অনুসন্ধান করুন..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${
                      item.current
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon
                    className={`
                    w-5 h-5 mr-3 flex-shrink-0
                    ${
                      item.current
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }
                  `}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-200">
            {/* Logout */}
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              {!isCollapsed && <span>লগআউট</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default SideBarDashboard;
