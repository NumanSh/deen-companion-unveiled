
import React from 'react';
import HabitTracker from '@/components/HabitTracker';
import IslamicPrayerTracker from '@/components/IslamicPrayerTracker';
import IslamicHabitVisualization from '@/components/IslamicHabitVisualization';
import IslamicAchievementSystem from '@/components/IslamicAchievementSystem';
import IslamicMilestoneTracker from '@/components/IslamicMilestoneTracker';
import DailyIslamicChallenges from '@/components/DailyIslamicChallenges';
import IslamicHabitBuilder from '@/components/IslamicHabitBuilder';
import IslamicGoalsTracker from '@/components/IslamicGoalsTracker';
import SpiritualHabitStreaks from '@/components/SpiritualHabitStreaks';
import FastingTracker from '@/components/FastingTracker';
import DailyVerseReflection from '@/components/DailyVerseReflection';
import PrayerTimeTracker from '@/components/PrayerTimeTracker';
import SpiritualMoodTracker from '@/components/SpiritualMoodTracker';
import SadaqahTracker from '@/components/SadaqahTracker';
import CommunityChallenge from '@/components/CommunityChallenge';
import SpiritualJournal from '@/components/SpiritualJournal';
import IslamicDreamJournal from '@/components/IslamicDreamJournal';
import NewUserWelcome from '@/components/NewUserWelcome';

const HabitsTab = () => {
  return (
    <div className="space-y-6">
      <NewUserWelcome />
      <HabitTracker />
      <IslamicPrayerTracker />
      <IslamicHabitVisualization />
      <IslamicAchievementSystem />
      <IslamicMilestoneTracker />
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
};

export default HabitsTab;
