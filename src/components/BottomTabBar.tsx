
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      path: '/home',
      isActive: location.pathname === '/home'
    },
    { 
      id: 'books', 
      label: 'Books', 
      icon: BookOpen, 
      path: '/books',
      isActive: location.pathname === '/books'
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: Calendar, 
      path: '/calendar',
      isActive: location.pathname === '/calendar'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings',
      isActive: location.pathname === '/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                tab.isActive 
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabBar;
