
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target, 
  Calendar,
  Flame,
  Star,
  Eye
} from 'lucide-react';

interface ReadingStats {
  dailyMinutes: Array<{ day: string; minutes: number }>;
  surahProgress: Array<{ name: string; progress: number; color: string }>;
  weeklyStreak: number;
  totalVerses: number;
  averageSessionTime: number;
  favoriteTime: string;
  consistency: number;
}

const SmartReadingAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [stats, setStats] = useState<ReadingStats>({
    dailyMinutes: [
      { day: 'Mon', minutes: 15 },
      { day: 'Tue', minutes: 23 },
      { day: 'Wed', minutes: 18 },
      { day: 'Thu', minutes: 32 },
      { day: 'Fri', minutes: 45 },
      { day: 'Sat', minutes: 28 },
      { day: 'Sun', minutes: 35 }
    ],
    surahProgress: [
      { name: 'Al-Fatiha', progress: 100, color: '#10b981' },
      { name: 'Al-Baqarah', progress: 45, color: '#3b82f6' },
      { name: 'Ali Imran', progress: 23, color: '#8b5cf6' },
      { name: 'An-Nisa', progress: 12, color: '#f59e0b' },
      { name: 'Al-Maidah', progress: 5, color: '#ef4444' }
    ],
    weeklyStreak: 6,
    totalVerses: 234,
    averageSessionTime: 18,
    favoriteTime: 'Morning',
    consistency: 85
  });

  const totalMinutesThisWeek = stats.dailyMinutes.reduce((sum, day) => sum + day.minutes, 0);
  const weeklyGoal = 120; // 2 hours per week
  const goalProgress = (totalMinutesThisWeek / weeklyGoal) * 100;

  const pieData = stats.surahProgress.map(surah => ({
    name: surah.name,
    value: surah.progress,
    color: surah.color
  }));

  const getInsightMessage = () => {
    if (stats.consistency >= 80) {
      return "Excellent consistency! You're building a strong habit.";
    } else if (stats.consistency >= 60) {
      return "Good progress! Try to read a little each day.";
    } else {
      return "Let's work on building a daily reading habit.";
    }
  };

  const getStreakColor = () => {
    if (stats.weeklyStreak >= 7) return 'text-green-600';
    if (stats.weeklyStreak >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Minutes</p>
                <p className="text-2xl font-bold text-blue-700">{totalMinutesThisWeek}</p>
                <p className="text-xs text-blue-500">This week</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Verses Read</p>
                <p className="text-2xl font-bold text-emerald-700">{stats.totalVerses}</p>
                <p className="text-xs text-emerald-500">All time</p>
              </div>
              <BookOpen className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-purple-600" />
            Weekly Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {totalMinutesThisWeek} / {weeklyGoal} minutes
              </span>
              <Badge 
                variant={goalProgress >= 100 ? "default" : "secondary"}
                className={goalProgress >= 100 ? "bg-green-500" : ""}
              >
                {Math.round(goalProgress)}%
              </Badge>
            </div>
            <Progress value={Math.min(goalProgress, 100)} className="h-3" />
            <p className="text-xs text-gray-500 text-center">
              {goalProgress >= 100 
                ? "🎉 Goal achieved! Excellent work!" 
                : `${weeklyGoal - totalMinutesThisWeek} minutes to go`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reading Streak */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className={`w-5 h-5 ${getStreakColor()}`} />
                <span className="text-sm font-medium text-gray-700">Reading Streak</span>
              </div>
              <p className={`text-2xl font-bold ${getStreakColor()}`}>
                {stats.weeklyStreak} days
              </p>
              <p className="text-xs text-gray-500">Keep it up!</p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${getStreakColor()}`}>
                {stats.consistency}%
              </div>
              <p className="text-xs text-gray-500">Consistency</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Reading Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart className="w-5 h-5 text-indigo-600" />
            Daily Reading Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.dailyMinutes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} min`, 'Reading Time']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="minutes" fill="#10b981" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Surah Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Surah Reading Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.surahProgress.map((surah, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{surah.name}</span>
                  <span className="text-sm text-gray-500">{surah.progress}%</span>
                </div>
                <Progress value={surah.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <h4 className="font-semibold text-purple-800 mb-1">Weekly Insight</h4>
              <p className="text-sm text-purple-700 mb-2">{getInsightMessage()}</p>
              <div className="flex items-center gap-4 text-xs text-purple-600">
                <span>Favorite time: {stats.favoriteTime}</span>
                <span>Avg session: {stats.averageSessionTime} min</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartReadingAnalytics;
