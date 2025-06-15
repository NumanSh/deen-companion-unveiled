
import React, { useEffect } from 'react';
import DashboardTab from '@/components/tabs/DashboardTab';
import HabitsTab from '@/components/tabs/HabitsTab';
import DiscoverTab from '@/components/tabs/DiscoverTab';
import QuranTab from '@/components/tabs/QuranTab';
import DuasSection from '@/components/DuasSection';
import SpiritualHabitStreaks from '@/components/SpiritualHabitStreaks';
import OfflineQuranManager from '@/components/OfflineQuranManager';
import SmartDailyRecommendations from '@/components/SmartDailyRecommendations';
import SmartHadithAuthenticityChecker from '@/components/SmartHadithAuthenticityChecker';
import PersonalizedPrayerNotifications from '@/components/PersonalizedPrayerNotifications';
import {
  HadithTab,
  AdhkarTab,
  DhikrTab,
  BookmarksTab,
  AnalyticsTab,
  RemindersTab,
  AchievementsTab,
  PersonalizedTab,
  CommunityTab
} from '@/components/tabs/OtherTabs';
import { useQuranData } from '@/hooks/useQuranData';

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
  const { surahs } = useQuranData();

  // Update stored tab selection when activeTab changes
  useEffect(() => {
    localStorage.setItem('selected-tab', activeTab);
  }, [activeTab]);

  switch (activeTab) {
    case 'dashboard':
      return <DashboardTab />;
    case 'habits':
      return <SpiritualHabitStreaks />;
    case 'discover':
      return <DiscoverTab />;
    case 'personalized':
      return <PersonalizedTab />;
    case 'community':
      return <CommunityTab />;
    case 'quran':
      return (
        <QuranTab
          onAddToBookmarks={onAddToBookmarks}
          onSurahRead={onSurahRead}
          readingSurahs={readingSurahs}
          isLoading={isLoading}
        />
      );
    case 'offline-quran':
      return <OfflineQuranManager surahs={surahs} />;
    case 'ai-recommendations':
      return <SmartDailyRecommendations />;
    case 'hadith-checker':
      return <SmartHadithAuthenticityChecker />;
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
    case 'achievements':
      return <AchievementsTab />;
    case 'reminders':
      return <RemindersTab />;
    case 'prayer-notifications':
      return <PersonalizedPrayerNotifications />;
    default:
      return <DashboardTab />;
  }
};

export default TabContent;
