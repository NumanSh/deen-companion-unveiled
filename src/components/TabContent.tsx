
import React from 'react';
import PersonalDashboard from '@/components/PersonalDashboard';
import HabitTracker from '@/components/HabitTracker';
import ContentDiscovery from '@/components/ContentDiscovery';
import SurahGrid from '@/components/SurahGrid';
import HadithSection from '@/components/HadithSection';
import DuasSection from '@/components/DuasSection';
import MorningEveningAdhkar from '@/components/MorningEveningAdhkar';
import DhikrCounter from '@/components/DhikrCounter';
import BookmarkManager from '@/components/BookmarkManager';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import DailyReminders from '@/components/DailyReminders';

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
  switch (activeTab) {
    case 'dashboard':
      return <PersonalDashboard />;
    case 'habits':
      return <HabitTracker />;
    case 'discover':
      return <ContentDiscovery />;
    case 'quran':
      return (
        <SurahGrid
          onAddToBookmarks={onAddToBookmarks}
          onSurahRead={onSurahRead}
          readingSurahs={readingSurahs}
          isLoading={isLoading}
        />
      );
    case 'hadith':
      return <HadithSection />;
    case 'duas':
      return <DuasSection />;
    case 'adhkar':
      return <MorningEveningAdhkar />;
    case 'dhikr':
      return <DhikrCounter />;
    case 'bookmarks':
      return <BookmarkManager />;
    case 'analytics':
      return <ProgressAnalytics />;
    case 'reminders':
      return <DailyReminders />;
    default:
      return <PersonalDashboard />;
  }
};

export default TabContent;
