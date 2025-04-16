
import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSearch, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  toggleSidebar: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const { theme, toggleTheme, language, setLanguage } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-background dark:bg-sidebar border-b border-border dark:border-sidebar-border shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <FiMenu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Link to="/home" className="flex items-center">
            <span className="text-primary dark:text-primary font-bold text-xl">
              PATIENT FEEDBACK APP
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative rounded-md shadow-sm max-w-xs hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="block w-full rounded-md border-input bg-background py-1.5 pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-1"
          >
            {theme === "dark" ? (
              <FiSun className="h-5 w-5" />
            ) : (
              <FiMoon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-1">
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("fr")}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")}>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
