
import React from 'react';
import { Home, Book, ScrollText, RotateCcw, Target, Compass, Heart, BarChart3, Bell } from 'lucide-react';

interface Tab {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'quran', label: 'Quran', icon: Book },
    { key: 'hadith', label: 'Hadith', icon: ScrollText },
    { key: 'duas', label: 'Duas', icon: Book },
    { key: 'adhkar', label: 'Adhkar', icon: Book },
    { key: 'dhikr', label: 'Dhikr', icon: RotateCcw },
    { key: 'habits', label: 'Habits', icon: Target },
    { key: 'discover', label: 'Discover', icon: Compass },
    { key: 'bookmarks', label: 'Saved', icon: Heart },
    { key: 'analytics', label: 'Progress', icon: BarChart3 },
    { key: 'reminders', label: 'Reminders', icon: Bell },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-3 h-3" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
