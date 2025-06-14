
import React from 'react';
import PersonalDashboard from '@/components/PersonalDashboard';
import IslamicQuoteWidget from '@/components/IslamicQuoteWidget';
import QuranicVerseOfDay from '@/components/QuranicVerseOfDay';
import SmartPrayerWeatherIntegration from '@/components/SmartPrayerWeatherIntegration';
import IslamicPrayerTracker from '@/components/IslamicPrayerTracker';
import PersonalizedContentEngine from '@/components/PersonalizedContentEngine';
import ReadingStreakCounter from '@/components/ReadingStreakCounter';
import DailyIslamicChallenges from '@/components/DailyIslamicChallenges';
import IslamicAchievementSystem from '@/components/IslamicAchievementSystem';
import IslamicMilestoneTracker from '@/components/IslamicMilestoneTracker';
import IslamicCalendarEvents from '@/components/IslamicCalendarEvents';
import DailyIslamicGoals from '@/components/DailyIslamicGoals';
import IslamicGoalsTracker from '@/components/IslamicGoalsTracker';
import PrayerTimeTracker from '@/components/PrayerTimeTracker';
import HijriDateConverter from '@/components/HijriDateConverter';
import IslamicEventCountdown from '@/components/IslamicEventCountdown';
import CommunityChallenge from '@/components/CommunityChallenge';
import SpiritualMoodTracker from '@/components/SpiritualMoodTracker';
import HijriCalendarWidget from '@/components/HijriCalendarWidget';
import SpiritualHabitStreaks from '@/components/SpiritualHabitStreaks';

const DashboardTab = () => {
  return (
    <div className="space-y-6">
      <PersonalDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IslamicQuoteWidget />
        <QuranicVerseOfDay />
      </div>
      <SmartPrayerWeatherIntegration />
      <IslamicPrayerTracker />
      <PersonalizedContentEngine />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadingStreakCounter />
        <DailyIslamicChallenges />
      </div>
      <IslamicAchievementSystem />
      <IslamicMilestoneTracker />
      <IslamicCalendarEvents />
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
};

export default DashboardTab;
