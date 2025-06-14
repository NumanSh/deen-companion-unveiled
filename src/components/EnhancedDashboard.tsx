
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award,
  Heart,
  Star,
  Flame,
  CheckCircle
} from 'lucide-react';
import DailyProgress from './DailyProgress';
import ReadingStreakCounter from './ReadingStreakCounter';

const EnhancedDashboard = () => {
  const [realStats, setRealStats] = useState({
    versesReadToday: 0,
    prayerStreak: 0,
    weeklyGoal: 0,
    totalPoints: 0
  });

  const [recentAchievements, setRecentAchievements] = useState<any[]>([]);

  useEffect(() => {
    const loadRealData = () => {
      // Load reading streak data
      const streakData = localStorage.getItem('readingStreakData');
      let currentStreak = 0;
      let versesToday = 0;
      if (streakData) {
        const parsed = JSON.parse(streakData);
        currentStreak = parsed.currentStreak || 0;
        versesToday = parsed.versesReadToday || 0;
      }

      // Load daily tasks data
      const today = new Date().toDateString();
      const dailyTasksData = localStorage.getItem(`dailyTasks_${today}`);
      let completedTasks = 0;
      let totalDailyPoints = 0;
      if (dailyTasksData) {
        const tasks = JSON.parse(dailyTasksData);
        completedTasks = tasks.filter((task: any) => task.completed).length;
        totalDailyPoints = tasks.filter((task: any) => task.completed).reduce((sum: number, task: any) => sum + task.points, 0);
      }

      // Load prayer data
      const prayerHistory = localStorage.getItem('prayer-history');
      let prayerStreakDays = 0;
      if (prayerHistory) {
        const history = JSON.parse(prayerHistory);
        // Count consecutive days with all 5 prayers completed
        for (let i = history.length - 1; i >= 0; i--) {
          const dayPrayers = Object.values(history[i].prayers);
          if (dayPrayers.every(prayer => prayer === true)) {
            prayerStreakDays++;
          } else {
            break;
          }
        }
      }

      // Calculate weekly goal progress (based on daily tasks completion)
      const weeklyGoalProgress = Math.min((completedTasks / 4) * 100, 100);

      // Load total lifetime points
      const lifetimeStats = localStorage.getItem('lifetime-stats');
      let totalLifetimePoints = totalDailyPoints;
      if (lifetimeStats) {
        const stats = JSON.parse(lifetimeStats);
        totalLifetimePoints = (stats.totalPoints || 0) + totalDailyPoints;
      } else {
        // Initialize lifetime stats
        localStorage.setItem('lifetime-stats', JSON.stringify({ totalPoints: totalDailyPoints }));
      }

      setRealStats({
        versesReadToday: versesToday,
        prayerStreak: prayerStreakDays,
        weeklyGoal: weeklyGoalProgress,
        totalPoints: totalLifetimePoints
      });

      // Generate real achievements based on actual progress
      const achievements = [];
      if (currentStreak >= 7) {
        achievements.push({
          title: 'Reading Streak Master',
          description: `Completed ${currentStreak} consecutive days of reading`,
          icon: CheckCircle,
          earned: '1 day ago',
          points: currentStreak >= 30 ? 100 : currentStreak >= 14 ? 50 : 25
        });
      }
      if (prayerStreakDays >= 5) {
        achievements.push({
          title: 'Prayer Consistency',
          description: `Completed all prayers for ${prayerStreakDays} consecutive days`,
          icon: Star,
          earned: '2 days ago',
          points: prayerStreakDays >= 30 ? 150 : 75
        });
      }
      if (completedTasks >= 3) {
        achievements.push({
          title: 'Daily Goals Champion',
          description: 'Completed most daily spiritual goals',
          icon: Flame,
          earned: 'Today',
          points: 30
        });
      }

      setRecentAchievements(achievements.slice(0, 3));
    };

    loadRealData();
    
    // Refresh data every 30 seconds to stay in sync
    const interval = setInterval(loadRealData, 30000);
    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    {
      title: 'Verses Read Today',
      value: realStats.versesReadToday.toString(),
      change: realStats.versesReadToday > 0 ? 'Keep reading!' : 'Start reading today',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Prayer Streak',
      value: realStats.prayerStreak > 0 ? `${realStats.prayerStreak} days` : 'Start today',
      change: realStats.prayerStreak > 0 ? 'Alhamdulillah!' : 'Begin your journey',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Weekly Goal',
      value: `${Math.round(realStats.weeklyGoal)}%`,
      change: realStats.weeklyGoal >= 75 ? 'Excellent progress!' : 'Keep going!',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Points',
      value: realStats.totalPoints.toString(),
      change: realStats.totalPoints > 0 ? 'Well earned!' : 'Start earning',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                As-salamu alaykum! 🌙
              </h2>
              <p className="text-emerald-600 dark:text-emerald-400 mt-1">
                Continue your spiritual journey today
              </p>
            </div>
            <div className="text-4xl animate-pulse">☪️</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.bgColor} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Progress Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyProgress />
        <ReadingStreakCounter />
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentAchievements.length > 0 ? recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <achievement.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    +{achievement.points} pts
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Earned {achievement.earned}
                </p>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Complete your daily goals to unlock achievements!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Read Quran</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-xs">Dhikr</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Prayer Times</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Target className="w-5 h-5" />
              <span className="text-xs">Set Goals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboard;
