
import React from 'react';
import { Home, Book, ScrollText, RotateCcw, Target, Compass, Heart, BarChart3, Bell, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Tab {
  key: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  
  const tabs: Tab[] = [
    { key: 'dashboard', labelKey: 'dashboard', icon: Home },
    { key: 'quran', labelKey: 'quran', icon: Book },
    { key: 'discover', labelKey: 'study-tools', icon: BookOpen },
    { key: 'hadith', labelKey: 'hadith', icon: ScrollText },
    { key: 'duas', labelKey: 'duas', icon: Book },
    { key: 'adhkar', labelKey: 'adhkar', icon: Book },
    { key: 'dhikr', labelKey: 'dhikr', icon: RotateCcw },
    { key: 'habits', labelKey: 'habits', icon: Target },
    { key: 'bookmarks', labelKey: 'saved', icon: Heart },
    { key: 'analytics', labelKey: 'progress', icon: BarChart3 },
    { key: 'reminders', labelKey: 'reminders', icon: Bell },
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
            {tab.key === 'discover' ? 'Study Tools' : t(tab.labelKey)}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
