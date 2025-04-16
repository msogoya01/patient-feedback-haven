
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { FiHome, FiTarget, FiClock, FiBell, FiSettings, FiMenu, FiX } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Home",
      path: "/home",
      icon: <FiHome className="mr-3 h-5 w-5" />,
    },
    {
      title: "Objective",
      path: "/objective",
      icon: <FiTarget className="mr-3 h-5 w-5" />,
    },
    {
      title: "History",
      path: "/history",
      icon: <FiClock className="mr-3 h-5 w-5" />,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: <FiBell className="mr-3 h-5 w-5" />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FiSettings className="mr-3 h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "sidebar-container bg-sidebar text-sidebar-foreground shadow-lg",
        isOpen ? "" : "sidebar-collapsed"
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto bg-sidebar dark:bg-sidebar border-r border-sidebar-border">
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <h2 className="text-xl font-semibold text-sidebar-foreground">
            Patient Feedback
          </h2>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-sidebar-accent focus:outline-none"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <div className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
