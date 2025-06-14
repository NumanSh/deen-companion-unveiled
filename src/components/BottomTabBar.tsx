
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Settings, Calendar, Book } from "lucide-react";
import { cn } from "@/lib/utils";

type TabItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

const tabs: TabItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <Home size={24} />,
    href: "/",
  },
  {
    key: "calendar",
    label: "Calendar",
    icon: <Calendar size={24} />,
    href: "/calendar",
  },
  {
    key: "books",
    label: "Books",
    icon: <Book size={24} />,
    href: "/books",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings size={24} />,
    href: "/settings",
  },
];

const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t-2 border-emerald-200 dark:border-emerald-800 shadow-2xl">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
      
      <div className="flex justify-around items-center h-16 max-w-md mx-auto relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 64">
            <defs>
              <pattern id="tab-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tab-pattern)"/>
          </svg>
        </div>

        {tabs.map(tab => {
          const active = location.pathname === tab.href;
          return (
            <button
              key={tab.key}
              className={cn(
                "relative flex flex-col items-center justify-center text-xs px-4 py-2 rounded-xl transition-all duration-300 group focus:outline-none transform",
                active
                  ? "text-emerald-600 dark:text-emerald-400 font-bold scale-110 bg-emerald-50 dark:bg-emerald-950/50"
                  : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-105"
              )}
              onClick={() => navigate(tab.href)}
              aria-label={tab.label}
              tabIndex={0}
              type="button"
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
              )}
              
              {/* Icon with decorative elements */}
              <div className="relative mb-1">
                <span
                  className={cn(
                    "block transition-all duration-300",
                    active 
                      ? "scale-110 text-emerald-600 dark:text-emerald-400" 
                      : "text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-105"
                  )}
                >
                  {tab.icon}
                </span>
                
                {/* Glow effect for active tab */}
                {active && (
                  <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 blur-sm animate-pulse"></div>
                )}
              </div>
              
              <span className={cn(
                "transition-all duration-300",
                active 
                  ? "font-bold text-emerald-700 dark:text-emerald-300" 
                  : "group-hover:font-semibold"
              )}>
                {tab.label}
              </span>

              {/* Background shine effect */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-blue-100/20 to-purple-100/20 dark:from-emerald-900/10 dark:via-blue-900/10 dark:to-purple-900/10 rounded-xl"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
