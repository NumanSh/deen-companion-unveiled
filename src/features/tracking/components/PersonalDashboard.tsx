
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, Flame, Award, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardStats {
  currentStreak: number;
  totalDhikr: number;
  readingSessions: number;
  completedGoals: number;
  weeklyProgress: number;
  lastActivity: string;
}

const PersonalDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [greeting, setGreeting] = useState('');
  const [dailyGoals, setDailyGoals] = useState<any[]>([]);

  useEffect(() => {
    // Generate greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('good-morning'));
    else if (hour < 17) setGreeting(t('good-afternoon'));
    else setGreeting(t('good-evening'));

    const loadRealData = () => {
      // Load reading streak data
      const streakData = localStorage.getItem('readingStreakData');
      let currentStreak = 0;
      let totalVersesRead = 0;
      if (streakData) {
        const parsed = JSON.parse(streakData);
        currentStreak = parsed.currentStreak || 0;
        totalVersesRead = parsed.totalVersesRead || 0;
      }

      // Load daily tasks to calculate completed goals
      const today = new Date().toDateString();
      const dailyTasksData = localStorage.getItem(`dailyTasks_${today}`);
      let completedTasksCount = 0;
      let tasksForGoals: unknown[] = [];
      if (dailyTasksData) {
        const tasks = JSON.parse(dailyTasksData);
        completedTasksCount = tasks.filter((task: unknown) => task.completed).length;
        
        // Map daily tasks to goals format
        tasksForGoals = [
          { name: t('morning-prayers'), completed: tasks.find((t: unknown) => t.id === 'prayers')?.completed || false, icon: Calendar },
          { name: t('100-dhikr'), completed: tasks.find((t: unknown) => t.id === 'dhikr')?.completed || false, icon: Target },
          { name: t('15-min-reading'), completed: tasks.find((t: unknown) => t.id === 'quran')?.completed || false, icon: Clock },
          { name: t('evening-prayers'), completed: tasks.find((t: unknown) => t.id === 'reflection')?.completed || false, icon: Calendar },
        ];
      } else {
        // Default goals when no data exists
        tasksForGoals = [
          { name: t('morning-prayers'), completed: false, icon: Calendar },
          { name: t('100-dhikr'), completed: false, icon: Target },
          { name: t('15-min-reading'), completed: false, icon: Clock },
          { name: t('evening-prayers'), completed: false, icon: Calendar },
        ];
      }

      // Load dhikr counter data
      const dhikrData = localStorage.getItem('dhikr-count');
      let totalDhikr = 0;
      if (dhikrData) {
        const parsed = JSON.parse(dhikrData);
        totalDhikr = parsed.total || 0;
      }

      // Calculate reading sessions from streak data
      const readingSessions = currentStreak; // Each streak day represents a reading session

      // Calculate weekly progress
      const weeklyProgress = Math.min((completedTasksCount / 4) * 100, 100);

      // Determine last activity
      let lastActivity = t('read-surah-al-fatihah');
      if (dailyTasksData) {
        const tasks = JSON.parse(dailyTasksData);
        const lastCompleted = tasks.find((task: unknown) => task.completed);
        if (lastCompleted) {
          lastActivity = `Completed ${lastCompleted.title}`;
        }
      }

      const realStats = {
        currentStreak,
        totalDhikr,
        readingSessions,
        completedGoals: completedTasksCount,
        weeklyProgress,
        lastActivity
      };

      setStats(realStats);
      setDailyGoals(tasksForGoals);

      // Save updated stats
      localStorage.setItem('personal-dashboard-stats', JSON.stringify(realStats));
    };

    loadRealData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadRealData, 30000);
    return () => clearInterval(interval);
  }, [t]);

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
          {greeting}! 🌟
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('continue-spiritual-journey')}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
            <div className="text-xs text-gray-600">{t('day-streak')}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalDhikr}</div>
            <div className="text-xs text-gray-600">{t('total-dhikr')}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.readingSessions}</div>
            <div className="text-xs text-gray-600">{t('sessions')}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.completedGoals}</div>
            <div className="text-xs text-gray-600">{t('goals-met')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            {t('todays-goals')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dailyGoals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  goal.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={cn(
                  "flex-1",
                  goal.completed ? "text-green-700 line-through" : "text-gray-700 dark:text-gray-300"
                )}>
                  {goal.name}
                </span>
                <div className={cn(
                  "w-4 h-4 rounded-full border-2",
                  goal.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                )} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {t('weekly-progress')}
            </div>
            <span className="text-lg font-bold text-blue-600">{Math.round(stats.weeklyProgress)}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={stats.weeklyProgress} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {stats.weeklyProgress >= 75 ? t('great-progress-week') : 'Keep working towards your weekly goals!'}
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recent-activity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            {t('last-activity')} <span className="font-medium text-green-600">{stats.lastActivity}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{stats.completedGoals > 0 ? 'Today' : t('hours-ago')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDashboard;
