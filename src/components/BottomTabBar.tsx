
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
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border shadow-inner">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.href;
          return (
            <button
              key={tab.key}
              className={cn(
                "flex flex-col items-center justify-center text-xs px-4 py-2 rounded transition-colors group focus:outline-none",
                active
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => navigate(tab.href)}
              aria-label={tab.label}
              tabIndex={0}
              type="button"
            >
              <span
                className={cn(
                  "mb-1",
                  active ? "scale-110 text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
