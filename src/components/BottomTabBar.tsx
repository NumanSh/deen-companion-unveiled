
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calendar, Clock, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const tabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      path: '/home',
      color: 'text-emerald-600',
      description: 'Dashboard & Overview'
    },
    { 
      id: 'books', 
      label: 'Library', 
      icon: BookOpen, 
      path: '/books',
      color: 'text-blue-600',
      description: 'Quran, Hadith & Duas'
    },
    { 
      id: 'prayer', 
      label: 'Prayer', 
      icon: Clock, 
      path: '/prayer-times',
      color: 'text-purple-600',
      description: 'Times & Tracking'
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: Calendar, 
      path: '/calendar',
      color: 'text-orange-600',
      description: 'Islamic Dates & Events'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings',
      color: 'text-gray-600',
      description: 'Preferences & Profile'
    },
  ];

  const handleTabClick = (tab: any) => {
    // Instant feedback principle - immediate confirmation
    if (location.pathname !== tab.path) {
      toast({
        title: `Switching to ${tab.label}`,
        description: tab.description,
        duration: 1000,
      });
      
      // Navigate with slight delay for better perceived performance
      setTimeout(() => {
        navigate(tab.path);
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 z-50">
      {/* Enhanced tab bar with better touch targets */}
      <div className="flex justify-around items-center py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[64px] min-h-[64px] active:scale-95 ${
                isActive
                  ? `${tab.color} bg-gray-50 dark:bg-gray-800/50 shadow-sm`
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                <Icon className="w-6 h-6 mb-1" />
              </div>
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? 'font-semibold' : ''
              }`}>
                {tab.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className={`absolute bottom-1 w-1 h-1 rounded-full ${tab.color.replace('text-', 'bg-')} animate-pulse`} />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Subtle gradient for visual hierarchy */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20" />
    </div>
  );
};

export default BottomTabBar;
