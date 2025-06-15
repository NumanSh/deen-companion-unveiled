
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'quran', label: 'Holy Quran', icon: BookOpen },
    { id: 'hadith', label: 'Hadith Collection', icon: Users },
    { id: 'duas', label: 'Duas & Supplications', icon: Calendar },
    { id: 'athkar', label: 'Daily Athkar', icon: Settings }
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-2 text-sm"
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
