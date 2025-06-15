
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Settings, Calendar, Book, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

type TabItem = {
  key: string;
  labelKey: string;
  icon: React.ReactNode;
  href: string;
};

const tabs: TabItem[] = [
  {
    key: "quran",
    labelKey: "quran-tab",
    icon: <Book size={20} />,
    href: "/books",
  },
  {
    key: "explore",
    labelKey: "explore-tab", 
    icon: <Search size={20} />,
    href: "/books",
  },
  {
    key: "home",
    labelKey: "home-tab",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    key: "duas",
    labelKey: "duas-tab",
    icon: <Heart size={20} />,
    href: "/books",
  },
  {
    key: "notes",
    labelKey: "notes-tab",
    icon: <Settings size={20} />,
    href: "/settings",
  },
];

const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => {
          // Home tab is active when on root path, others match exact path
          const active = tab.key === 'home' 
            ? location.pathname === '/' 
            : location.pathname === tab.href;
          
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
              aria-label={t(tab.labelKey)}
              tabIndex={0}
              type="button"
            >
              <span className="mb-1">
                {tab.icon}
              </span>
              <span className="text-xs">
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
