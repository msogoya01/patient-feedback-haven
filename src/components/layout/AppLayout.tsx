
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If not authenticated, don't show the app layout
  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div
        className={cn(
          "flex flex-col flex-1 overflow-hidden",
          sidebarOpen ? "md:ml-60" : "ml-0"
        )}
      >
        <AppHeader toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 bg-background dark:bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
