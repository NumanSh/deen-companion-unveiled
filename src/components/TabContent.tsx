
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
import IslamicLearningPath from '@/components/IslamicLearningPath';
import SpiritualMoodTracker from '@/components/SpiritualMoodTracker';
import SadaqahTracker from '@/components/SadaqahTracker';
import AsmaUlHusna from '@/components/AsmaUlHusna';
import HijriCalendarWidget from '@/components/HijriCalendarWidget';
import IslamicKnowledgeQuiz from '@/components/IslamicKnowledgeQuiz';
import DuaCollectionsManager from '@/components/DuaCollectionsManager';
import SpiritualJournal from '@/components/SpiritualJournal';
import PrayerTimeTracker from '@/components/PrayerTimeTracker';
import IslamicStoriesHub from '@/components/IslamicStoriesHub';
import QuranicWordLearning from '@/components/QuranicWordLearning';
import IslamicDreamJournal from '@/components/IslamicDreamJournal';
import CharityImpactTracker from '@/components/CharityImpactTracker';
import IslamicHabitBuilder from '@/components/IslamicHabitBuilder';
import VirtualMosqueFinder from '@/components/VirtualMosqueFinder';
import SpiritualHabitStreaks from '@/components/SpiritualHabitStreaks';
import IslamicNameMeanings from '@/components/IslamicNameMeanings';
import FastingTracker from '@/components/FastingTracker';
import DailyIslamicChallenges from '@/components/DailyIslamicChallenges';
import QuranMemorizationTracker from '@/components/QuranMemorizationTracker';
import IslamicFinanceTracker from '@/components/IslamicFinanceTracker';
import IslamicWeatherWidget from '@/components/IslamicWeatherWidget';
import IslamicPrayerTimeAlerts from '@/components/IslamicPrayerTimeAlerts';
import QuranicVerseOfDay from '@/components/QuranicVerseOfDay';
import IslamicAudioLibrary from '@/components/IslamicAudioLibrary';
import IslamicGoalsTracker from '@/components/IslamicGoalsTracker';
import HijriDateConverter from '@/components/HijriDateConverter';

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
            <QuranicVerseOfDay />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IslamicWeatherWidget />
            <IslamicPrayerTimeAlerts />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadingStreakCounter />
            <DailyIslamicChallenges />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyIslamicGoals />
            <IslamicGoalsTracker />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PrayerTimeTracker />
            <HijriDateConverter />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicEventCountdown />
            <CommunityChallenge />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpiritualMoodTracker />
            <HijriCalendarWidget />
          </div>
          <SpiritualHabitStreaks />
        </div>
      );
    case 'habits':
      return (
        <div className="space-y-6">
          <HabitTracker />
          <DailyIslamicChallenges />
          <IslamicHabitBuilder />
          <IslamicGoalsTracker />
          <SpiritualHabitStreaks />
          <FastingTracker />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyVerseReflection />
            <PrayerTimeTracker />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpiritualMoodTracker />
            <SadaqahTracker />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CommunityChallenge />
            <SpiritualJournal />
          </div>
          <IslamicDreamJournal />
        </div>
      );
    case 'discover':
      return (
        <div className="space-y-6">
          <ContentDiscovery />
          <IslamicAudioLibrary />
          <IslamicNameMeanings />
          <QuranMemorizationTracker />
          <IslamicFinanceTracker />
          <HijriDateConverter />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QiblaCompass />
            <VirtualMosqueFinder />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicLearningPath />
            <IslamicKnowledgeQuiz />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AsmaUlHusna />
            <IslamicStoriesHub />
          </div>
          <IslamicEventCountdown />
        </div>
      );
    case 'quran':
      return (
        <div className="space-y-6">
          <QuranicVerseOfDay />
          <SurahGrid
            onAddToBookmarks={onAddToBookmarks}
            onSurahRead={onSurahRead}
            readingSurahs={readingSurahs}
            isLoading={isLoading}
          />
          <QuranMemorizationTracker />
          <QuranicWordLearning />
          <DailyVerseReflection />
          <AsmaUlHusna />
        </div>
      );
    case 'hadith':
      return <HadithSection />;
    case 'duas':
      return (
        <div className="space-y-6">
          <DuasSection />
          <DuaCollectionsManager />
        </div>
      );
    case 'adhkar':
      return <MorningEveningAdhkar />;
    case 'dhikr':
      return (
        <div className="space-y-6">
          <DhikrCounter />
          <TasbihCounter />
          <AsmaUlHusna />
        </div>
      );
    case 'bookmarks':
      return <BookmarkManager />;
    case 'analytics':
      return (
        <div className="space-y-6">
          <ProgressAnalytics />
          <IslamicFinanceTracker />
          <IslamicGoalsTracker />
          <PrayerTimeTracker />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpiritualMoodTracker />
            <SadaqahTracker />
          </div>
        </div>
      );
    case 'reminders':
      return (
        <div className="space-y-6">
          <DailyReminders />
          <IslamicPrayerTimeAlerts />
        </div>
      );
    default:
      return (
        <div className="space-y-6">
          <PersonalDashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IslamicQuoteWidget />
            <QuranicVerseOfDay />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IslamicWeatherWidget />
            <IslamicPrayerTimeAlerts />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadingStreakCounter />
            <DailyIslamicChallenges />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyIslamicGoals />
            <IslamicGoalsTracker />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicEventCountdown />
            <CommunityChallenge />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpiritualMoodTracker />
            <HijriCalendarWidget />
          </div>
        </div>
      );
  }
};

export default TabContent;
