
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
import SmartLearningPathSuggestions from '@/components/SmartLearningPathSuggestions';
import AdaptiveUIPreferences from '@/components/AdaptiveUIPreferences';
import VirtualMosqueFinder from '@/components/VirtualMosqueFinder';
import EnhancedVirtualStudyCircle from '@/components/EnhancedVirtualStudyCircle';
import VirtualIslamicStudyGroup from '@/components/VirtualIslamicStudyGroup';
import AdvancedCommunityAnalytics from '@/components/AdvancedCommunityAnalytics';
import CommunityMentorshipSystem from '@/components/CommunityMentorshipSystem';
import CommunityPrayerTimeSync from '@/components/CommunityPrayerTimeSync';
import AdvancedCommunityLearningDashboard from '@/components/AdvancedCommunityLearningDashboard';
import IslamicBookLibrary from '@/components/IslamicBookLibrary';
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
    case 'islamic-library':
      return <IslamicBookLibrary />;
    case 'offline-quran':
      return <OfflineQuranManager surahs={surahs} />;
    case 'ai-recommendations':
      return <SmartDailyRecommendations />;
    case 'hadith-checker':
      return <SmartHadithAuthenticityChecker />;
    case 'smart-learning-path':
      return <SmartLearningPathSuggestions />;
    case 'adaptive-ui':
      return <AdaptiveUIPreferences />;
    case 'mosque-finder':
      return <VirtualMosqueFinder />;
    case 'study-circle':
      return <EnhancedVirtualStudyCircle />;
    case 'islamic-study-group':
      return <VirtualIslamicStudyGroup />;
    case 'community-analytics':
      return <AdvancedCommunityAnalytics />;
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
    default:
      return <DashboardTab />;
  }
};

export default TabContent;
