
import React, { useEffect } from 'react';
import DashboardTab from '@/components/tabs/DashboardTab';
import HabitsTab from '@/components/tabs/HabitsTab';
import DiscoverTab from '@/components/tabs/DiscoverTab';
import QuranTab from '@/components/tabs/QuranTab';
import DuasSection from '@/components/DuasSection';
import {
  HadithTab,
  AdhkarTab,
  DhikrTab,
  BookmarksTab,
  AnalyticsTab,
  RemindersTab
} from '@/components/tabs/OtherTabs';

interface TabContentProps {
  activeTab: string;
  onAddToBookmarks: (item: any, type: 'surah' | 'dua' | 'hadith') => void;
  onSurahRead: (surah: any) => void;
  readingSurahs: Set<number>;
  isLoading: boolean;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  onAddToBookmarks,
  onSurahRead,
  readingSurahs,
  isLoading
}) => {
  // Update stored tab selection when activeTab changes
  useEffect(() => {
    localStorage.setItem('selected-tab', activeTab);
  }, [activeTab]);

  switch (activeTab) {
    case 'dashboard':
      return <DashboardTab />;
    case 'habits':
      return <HabitsTab />;
    case 'discover':
      return <DiscoverTab />;
    case 'quran':
      return (
        <QuranTab
          onAddToBookmarks={onAddToBookmarks}
          onSurahRead={onSurahRead}
          readingSurahs={readingSurahs}
          isLoading={isLoading}
        />
      );
    case 'hadith':
      return <HadithTab />;
    case 'duas':
      return <DuasSection />;
    case 'adhkar':
      return <AdhkarTab />;
    case 'dhikr':
      return <DhikrTab />;
    case 'bookmarks':
      return <BookmarksTab />;
    case 'analytics':
      return <AnalyticsTab />;
    case 'reminders':
      return <RemindersTab />;
    default:
      return <DashboardTab />;
  }
};

export default TabContent;
