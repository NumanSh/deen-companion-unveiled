
import React from 'react';
import { Home, Book, ScrollText, RotateCcw, Target, Compass, Heart, BarChart3, Bell, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Tab {
  key: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'primary' | 'secondary';
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const tabs: Tab[] = [
    { key: 'dashboard', labelKey: 'dashboard', icon: Home, category: 'primary' },
    { key: 'quran', labelKey: 'quran', icon: Book, category: 'primary' },
    { key: 'discover', labelKey: 'study-tools', icon: BookOpen, category: 'primary' },
    { key: 'hadith', labelKey: 'hadith', icon: ScrollText, category: 'primary' },
    { key: 'duas', labelKey: 'duas', icon: Book, category: 'primary' },
    { key: 'dhikr', labelKey: 'dhikr', icon: RotateCcw, category: 'secondary' },
    { key: 'habits', labelKey: 'habits', icon: Target, category: 'secondary' },
    { key: 'bookmarks', labelKey: 'saved', icon: Heart, category: 'secondary' },
    { key: 'analytics', labelKey: 'progress', icon: BarChart3, category: 'secondary' },
  ];

  const handleTabClick = (tabKey: string) => {
    if (activeTab !== tabKey) {
      // Instant feedback for tab switching
      const selectedTab = tabs.find(tab => tab.key === tabKey);
      toast({
        title: `Switching to ${selectedTab?.key === 'discover' ? 'Study Tools' : t(selectedTab?.labelKey || '')}`,
        description: "Loading content...",
        duration: 800,
      });
      
      // Slight delay for better UX
      setTimeout(() => {
        onTabChange(tabKey);
      }, 100);
    }
  };

  const primaryTabs = tabs.filter(tab => tab.category === 'primary');
  const secondaryTabs = tabs.filter(tab => tab.category === 'secondary');

  return (
    <div className="space-y-3 p-2">
      {/* Primary Tabs - More prominent */}
      <div className="flex flex-wrap justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-xl">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const displayLabel = tab.key === 'discover' ? 'Study Tools' : t(tab.labelKey);
          
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] active:scale-95 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 hover:scale-102'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">{displayLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Tabs - More compact */}
      <div className="flex flex-wrap justify-center gap-1 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
        {secondaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 min-h-[36px] active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
