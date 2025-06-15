
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
  badge?: number;
};

const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Get saved bookmarks count for badge
  const getBookmarksCount = (): number => {
    try {
      const saved = localStorage.getItem('islamic-app-bookmarks');
      return saved ? JSON.parse(saved).length : 0;
    } catch {
      return 0;
    }
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
      badge: getBookmarksCount()
    },
    {
      key: "settings",
      labelKey: "settings-tab",
      icon: <Settings size={20} />,
      href: "/settings",
    },
  ];

  const handleTabClick = (tab: TabItem) => {
    // Navigate to the appropriate route with tab state
    if (tab.href === "/books") {
      // Store the selected tab in localStorage for Books page
      localStorage.setItem('selected-tab', tab.key);
    }
    navigate(tab.href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => {
          // Determine if tab is active based on current route and stored tab
          const isActive = (() => {
            if (tab.key === 'home') {
              return location.pathname === '/';
            } else if (tab.href === '/books') {
              const selectedTab = localStorage.getItem('selected-tab');
              return location.pathname === '/books' && 
                     (selectedTab === tab.key || (selectedTab === null && tab.key === 'quran'));
            } else {
              return location.pathname === tab.href;
            }
          })();
          
          return (
            <button
              key={tab.key}
              className={cn(
                "flex flex-col items-center justify-center text-xs px-3 py-2 transition-all duration-200 relative",
                isActive
                  ? "text-teal-600 font-semibold transform scale-105"
                  : "text-gray-500 hover:text-teal-600"
              )}
              onClick={() => handleTabClick(tab)}
              aria-label={t(tab.labelKey)}
              tabIndex={0}
              type="button"
            >
              <span className="mb-1 relative">
                {tab.icon}
                {/* Badge for notifications/counts */}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-600 rounded-full"></span>
                )}
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
