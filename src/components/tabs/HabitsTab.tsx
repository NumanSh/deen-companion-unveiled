
import React from 'react';
import HabitTracker from '@/components/HabitTracker';
import CommunityChallenge from '@/components/CommunityChallenge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Target, BookOpen } from 'lucide-react';

const HabitsTab = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            Islamic Habits Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track your spiritual progress and build lasting Islamic habits.</p>
        </CardContent>
      </Card>

      {/* Main Habit Tracker */}
      <HabitTracker />

      {/* Community Challenge */}
      <CommunityChallenge />

      {/* Prayer Tracking Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Prayer Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Prayer tracking features coming soon...</p>
        </CardContent>
      </Card>

      {/* Reading Progress Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Reading Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track your Quran and Islamic book reading progress.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitsTab;
