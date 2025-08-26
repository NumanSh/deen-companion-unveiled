
import React, { useEffect } from 'react';
import DashboardTab from '@/components/tabs/DashboardTab';
import HabitsTab from '@/components/tabs/HabitsTab';
import DiscoverTab from '@/components/tabs/DiscoverTab';
import QuranTab from '@/components/tabs/QuranTab';
import { DuasSection } from '@/features/athkar';
import { SpiritualHabitStreaks } from '@/features/tracking';
import { OfflineQuranManager } from '@/features/quran';
import { SmartDailyRecommendations, SmartLearningPathSuggestions } from '@/features/learning';
import { PersonalizedPrayerNotifications } from '@/features/prayer';
// import { AdaptiveUIPreferences } from '@/shared';
import { VirtualMosqueFinder, EnhancedVirtualStudyCircle, VirtualIslamicStudyGroup, CommunityMentorshipSystem, CommunityPrayerTimeSync } from '@/features/community';
import { AdvancedCommunityLearningDashboard } from '@/features/learning';
import { AdvancedIslamicLocationServices } from '@/shared';
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
import { useQuranData } from '@/features/quran';

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
      return <QuranTab />;
    case 'islamic-library':
      return <div>Islamic Library (Component Moved)</div>;
    case 'offline-quran':
      return <OfflineQuranManager surahs={surahs} />;
    case 'ai-recommendations':
      return <SmartDailyRecommendations />;
    case 'hadith-checker':
      return <div>Hadith Checker (Component Moved)</div>;
    case 'smart-learning-path':
      return <SmartLearningPathSuggestions />;
    case 'adaptive-ui':
      return <div>Adaptive UI Preferences (Component Moved)</div>;
    case 'mosque-finder':
      return <VirtualMosqueFinder />;
    case 'study-circle':
      return <EnhancedVirtualStudyCircle />;
    case 'islamic-study-group':
      return <VirtualIslamicStudyGroup />;
    case 'community-analytics':
      return <div>Community Analytics (Component Moved)</div>;
    case 'mentorship-system':
      return <CommunityMentorshipSystem />;
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
    case 'community-prayer-sync':
      return <CommunityPrayerTimeSync />;
    case 'community-learning-dashboard':
      return <AdvancedCommunityLearningDashboard />;
    case 'advanced-location-services':
      return <AdvancedIslamicLocationServices />;
    case 'enhanced-community-features':
      return <div>Enhanced Community Features (Component Moved)</div>;
    default:
      return <DashboardTab />;
  }
};

export default TabContent;
