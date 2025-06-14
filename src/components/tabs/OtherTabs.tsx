
import React from 'react';
import HadithSearchEngine from '@/components/HadithSearchEngine';
import AIHadithCompanion from '@/components/AIHadithCompanion';
import HadithSection from '@/components/HadithSection';
import IslamicScholarQuotes from '@/components/IslamicScholarQuotes';
import DuasSection from '@/components/DuasSection';
import DuaCollectionsManager from '@/components/DuaCollectionsManager';
import MorningEveningAdhkar from '@/components/MorningEveningAdhkar';
import DhikrCounter from '@/components/DhikrCounter';
import TasbihCounter from '@/components/TasbihCounter';
import AsmaUlHusna from '@/components/AsmaUlHusna';
import BookmarkManager from '@/components/BookmarkManager';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import IslamicHabitVisualization from '@/components/IslamicHabitVisualization';
import IslamicAchievementSystem from '@/components/IslamicAchievementSystem';
import IslamicMilestoneTracker from '@/components/IslamicMilestoneTracker';
import IslamicFinanceTracker from '@/components/IslamicFinanceTracker';
import IslamicGoalsTracker from '@/components/IslamicGoalsTracker';
import PrayerTimeTracker from '@/components/PrayerTimeTracker';
import SpiritualMoodTracker from '@/components/SpiritualMoodTracker';
import SadaqahTracker from '@/components/SadaqahTracker';
import DailyReminders from '@/components/DailyReminders';
import SmartSalahReminder from '@/components/SmartSalahReminder';
import SmartPrayerWeatherIntegration from '@/components/SmartPrayerWeatherIntegration';
import IslamicPrayerTimeAlerts from '@/components/IslamicPrayerTimeAlerts';
import IslamicCalendarEvents from '@/components/IslamicCalendarEvents';
import IslamicDateEventsTracker from '@/components/IslamicDateEventsTracker';

export const HadithTab = () => (
  <div className="space-y-6">
    <HadithSearchEngine />
    <AIHadithCompanion />
    <HadithSection />
    <IslamicScholarQuotes />
  </div>
);

export const DuasTab = () => (
  <div className="space-y-6">
    <DuasSection />
    <DuaCollectionsManager />
  </div>
);

export const AdhkarTab = () => <MorningEveningAdhkar />;

export const DhikrTab = () => (
  <div className="space-y-6">
    <DhikrCounter />
    <TasbihCounter />
    <AsmaUlHusna />
  </div>
);

export const BookmarksTab = () => <BookmarkManager />;

export const AnalyticsTab = () => (
  <div className="space-y-6">
    <ProgressAnalytics />
    <IslamicHabitVisualization />
    <IslamicAchievementSystem />
    <IslamicMilestoneTracker />
    <IslamicFinanceTracker />
    <IslamicGoalsTracker />
    <PrayerTimeTracker />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SpiritualMoodTracker />
      <SadaqahTracker />
    </div>
  </div>
);

export const RemindersTab = () => (
  <div className="space-y-6">
    <DailyReminders />
    <SmartSalahReminder />
    <SmartPrayerWeatherIntegration />
    <IslamicPrayerTimeAlerts />
    <IslamicCalendarEvents />
    <IslamicDateEventsTracker />
  </div>
);
