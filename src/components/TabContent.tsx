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
import PrayerNotifications from '@/components/PrayerNotifications';
import IslamicQuoteWidget from '@/components/IslamicQuoteWidget';
import ReadingStreakCounter from '@/components/ReadingStreakCounter';
import DailyIslamicGoals from '@/components/DailyIslamicGoals';
import TasbihCounter from '@/components/TasbihCounter';
import DailyVerseReflection from '@/components/DailyVerseReflection';
import QiblaCompass from '@/components/QiblaCompass';
import IslamicEventCountdown from '@/components/IslamicEventCountdown';
import CommunityChallenge from '@/components/CommunityChallenge';

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
      return (
        <div className="space-y-6">
          <PersonalDashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IslamicQuoteWidget />
            <ReadingStreakCounter />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyIslamicGoals />
            <PrayerNotifications />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicEventCountdown />
            <CommunityChallenge />
          </div>
        </div>
      );
    case 'habits':
      return (
        <div className="space-y-6">
          <HabitTracker />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyVerseReflection />
            <CommunityChallenge />
          </div>
        </div>
      );
    case 'discover':
      return (
        <div className="space-y-6">
          <ContentDiscovery />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QiblaCompass />
            <IslamicEventCountdown />
          </div>
        </div>
      );
    case 'quran':
      return (
        <div className="space-y-6">
          <SurahGrid
            onAddToBookmarks={onAddToBookmarks}
            onSurahRead={onSurahRead}
            readingSurahs={readingSurahs}
            isLoading={isLoading}
          />
          <DailyVerseReflection />
        </div>
      );
    case 'hadith':
      return <HadithSection />;
    case 'duas':
      return <DuasSection />;
    case 'adhkar':
      return <MorningEveningAdhkar />;
    case 'dhikr':
      return (
        <div className="space-y-6">
          <DhikrCounter />
          <TasbihCounter />
        </div>
      );
    case 'bookmarks':
      return <BookmarkManager />;
    case 'analytics':
      return <ProgressAnalytics />;
    case 'reminders':
      return <DailyReminders />;
    default:
      return (
        <div className="space-y-6">
          <PersonalDashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IslamicQuoteWidget />
            <ReadingStreakCounter />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyIslamicGoals />
            <PrayerNotifications />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicEventCountdown />
            <CommunityChallenge />
          </div>
        </div>
      );
  }
};

export default TabContent;
