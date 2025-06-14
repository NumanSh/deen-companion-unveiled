
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Settings, Calendar, Book, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type TabItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

const tabs: TabItem[] = [
  {
    key: "quran",
    label: "Quran",
    icon: <Book size={20} />,
    href: "/books",
  },
  {
    key: "explore",
    label: "Explore", 
    icon: <Search size={20} />,
    href: "/books",
  },
  {
    key: "home",
    label: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    key: "duas",
    label: "Duas",
    icon: <Heart size={20} />,
    href: "/books",
  },
  {
    key: "notes",
    label: "Notes",
    icon: <Settings size={20} />,
    href: "/settings",
  },
];

const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.href;
          return (
            <button
              key={tab.key}
              className={cn(
                "flex flex-col items-center justify-center text-xs px-3 py-2 transition-colors duration-200",
                active
                  ? "text-teal-600 font-semibold"
                  : "text-gray-500 hover:text-teal-600"
              )}
              onClick={() => navigate(tab.href)}
              aria-label={tab.label}
              tabIndex={0}
              type="button"
            >
              <span className="mb-1">
                {tab.icon}
              </span>
              <span className="text-xs">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
